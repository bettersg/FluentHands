import PropTypes from 'prop-types'
import styles from './cam.module.css'
import { useCallback, useRef, useState, useEffect } from 'react'
import Webcam from 'react-webcam'
import { FaLightbulb } from "react-icons/fa"; 
import axios from 'axios';
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import hand_landmarker_task from "../models/hand_landmarker.task";
import hand_keypoints_classifier from "../models/batched_1741261051.onnx"
import { InferenceSession, Tensor } from "onnxruntime-web";

// Directly copying from your working code
const ASCII_UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ML_THRESHOLDS = {
  "A": 10, "B": 15, "C": 20, "D": 0, "E": 5, "F": 10, "G": 15, "H": 10,
  "I": 0, "J": 10, "K": 10, "L": 5, "M": 5, "N": 5, "O": 0, "P": 10, "Q": 15, 
  "R": 0, "S": 0, "T": 5, "U": 0, "V": 5, "W": 10, "X": 10, "Y": 5, "Z": 10
};

export default function Cam({ capturing, setCapturing = () => {}, setDetectedLetter = () => {}, correct, hint = '', hintButtonHandler = () => {}, useML=true }) {
    // Timer and interval states
    const [intervalId, setIntervalId] = useState(null);
    const [imageSrc, setImageSrc] = useState(null); // State to hold the image source
    const [letter, setLetter] = useState(null);
    
    // Normalized function that EXACTLY matches the Python implementation
    function normalizeHandLandmarks(landmarks) {
        // Find min/max values exactly as in Python
        let minX = Math.min(...landmarks.map(lm => lm.x));
        let maxX = Math.max(...landmarks.map(lm => lm.x));
        let minY = Math.min(...landmarks.map(lm => lm.y));
        let maxY = Math.max(...landmarks.map(lm => lm.y));
        
        // Calculate width and height
        let width = maxX - minX;
        let height = maxY - minY;
        
        // Prevent division by zero
        if (width === 0) width = 1;
        if (height === 0) height = 1;
        
        // Normalize landmarks using min-max scaling to 0-1 range
        // This EXACTLY matches the Python implementation
        return landmarks.map(landmark => ({
            x: (landmark.x - minX) / width,
            y: (landmark.y - minY) / height
        }));
    }
    
    async function runKeypointClassifier(onnxSession, keypoints) {
        console.log("Input keypoints length:", keypoints.length);
        
        try {
            // Create input tensor
            let inputData = new Float32Array(keypoints);
            const inputTensor = new Tensor("float32", inputData, [1, 42]);
            const inputName = onnxSession.inputNames[0];
            const feeds = { [inputName]: inputTensor };
            
            console.log("Running ONNX model inference...");
            const output = await onnxSession.run(feeds);
            
            // Process output
            const confidences = Array.from(output.output.data);
            console.log("Confidence scores:", confidences);
            
            // Get the max index (matches Python ASCII_UPPERCASE indexing)
            const maxIndex = confidences.indexOf(Math.max(...confidences));
            const maxConfidence = confidences[maxIndex];
            console.log("Max confidence:", maxConfidence, "at index:", maxIndex);
            
            // Convert to letter (using ASCII_UPPERCASE to match Python)
            const detectedLetter = ASCII_UPPERCASE[maxIndex];
            console.log("Predicted letter:", detectedLetter);
            
            // Apply threshold specific to the letter
            const threshold = ML_THRESHOLDS[detectedLetter] / 100; // Convert threshold to match JS values
            console.log(`Threshold for ${detectedLetter}: ${threshold}`);
            
            if (maxConfidence < threshold) {
                console.log(`Confidence ${maxConfidence.toFixed(4)} below threshold ${threshold} - prediction unreliable`);
                return { letter: "-", confidence: maxConfidence, index: maxIndex };
            } else {
                console.log(`Confidence ${maxConfidence.toFixed(4)} above threshold ${threshold} - prediction reliable`);
                return { letter: detectedLetter, confidence: maxConfidence, index: maxIndex };
            }
        } catch (error) {
            console.error("Error running model inference:", error);
            return null;
        }
    }

    // Webcam reference and video constraints
    const webcamRef = useRef();
    const frameBufferRef = useRef([]); // Buffer to store frames

    const videoConstraints = {
        facingMode: 'user',
        width: 640,
        height: 480
    };

    const handleWebcamMount = () => {
        handleStartCapture();
    }

    const handleStartCapture = useCallback(async () => {
        const video = webcamRef.current.video;
        const stream = webcamRef.current.stream;

        // Load model
        let handLandmarker;
        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
        );
        handLandmarker = await HandLandmarker.createFromOptions(
            vision, {
                baseOptions: { modelAssetPath: hand_landmarker_task },
                numHands: 1,
                runningMode: "video"
            }
        );
        const session = await InferenceSession.create(hand_keypoints_classifier, {
            executionProviders: ["webgl"], 
        });

        console.log("Hand Landmarker model loaded");
        const HAND_CONNECTIONS = [
            [0, 1], [1, 2], [2, 3], [3, 4],  // Thumb
            [0, 5], [5, 6], [6, 7], [7, 8],  // Index
            [0, 9], [9, 10], [10, 11], [11, 12],  // Middle
            [0, 13], [13, 14], [14, 15], [15, 16],  // Ring
            [0, 17], [17, 18], [18, 19], [19, 20]  // Pinky
        ];

        const interval = setInterval(async () => {
            console.log("Capturing:", capturing);
            if (capturing == false) return;
            if (stream.active && video.readyState >= 2) {
                // Always capture the current frame from the video stream
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Detect landmarks
                const detections = handLandmarker.detectForVideo(video, performance.now());

                if (detections.landmarks.length > 0) {
                    // Get the raw landmarks
                    const rawLandmarks = detections.landmarks[0];
                    
                    // Apply the Python-matching normalization approach
                    const normalizedLandmarks = normalizeHandLandmarks(rawLandmarks);
                    
                    // Convert to flat array of alternating x,y coordinates
                    // This is EXACTLY how the working code does it
                    const keypoints = [];
                    normalizedLandmarks.forEach(point => {
                        keypoints.push(point.x);
                        keypoints.push(point.y);
                    });
                    
                    console.log("Normalized Keypoints:", keypoints);
                    
                    // Check if we have exactly 42 values (21 points x 2 coordinates)
                    if (keypoints.length === 42) {
                        // Use the refactored classification logic
                        const result = await runKeypointClassifier(session, keypoints);
                        
                        if (result) {
                            console.log("Final prediction:", result.letter, "with confidence:", result.confidence);
                            
                            // Only update if we have a valid prediction
                            if (result.letter !== "-") {
                                setLetter(result.letter);
                                setDetectedLetter(result.letter);
                            }
                        }
                    } else {
                        console.error("Wrong number of keypoints:", keypoints.length);
                    }
                    
                    // Visual debugging: Draw landmarks and connections
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    
                    // Draw the raw landmarks (orange)
                    rawLandmarks.forEach(point => {
                        const [x, y] = [point.x * canvas.width, point.y * canvas.height];
                        ctx.beginPath();
                        ctx.arc(x, y, 5, 0, 2 * Math.PI);
                        ctx.fillStyle = "orange";
                        ctx.fill();
                    });
                    
                    // Draw the connections between landmarks
                    HAND_CONNECTIONS.forEach(([startIdx, endIdx]) => {
                        const start = rawLandmarks[startIdx];
                        const end = rawLandmarks[endIdx];
                        if (start && end) {
                            const [x1, y1] = [start.x * canvas.width, start.y * canvas.height];
                            const [x2, y2] = [end.x * canvas.width, end.y * canvas.height];
                            ctx.beginPath();
                            ctx.moveTo(x1, y1);
                            ctx.lineTo(x2, y2);
                            ctx.strokeStyle = "lime";
                            ctx.lineWidth = 2;
                            ctx.stroke();
                        }
                    });
                    
                    // Add text showing the detected letter
                    if (letter) {
                        ctx.font = "48px Arial";
                        ctx.fillStyle = "white";
                        ctx.strokeStyle = "black";
                        ctx.lineWidth = 2;
                        ctx.strokeText(`Detected: ${letter}`, 20, 50);
                        ctx.fillText(`Detected: ${letter}`, 20, 50);
                    }
                }

                // Update the image source with the canvas data
                setImageSrc(canvas.toDataURL("image/jpeg"));
            }
        }, 100); // Update every 100ms

        setIntervalId(interval);
    }, [webcamRef]);

    const handleStopCapture = useCallback(() => {
        setCapturing(false);
        clearInterval(intervalId);
        setIntervalId(null);
    }, [webcamRef, setCapturing]);

    return (
        <div className={styles.cam} style={{ borderColor: correct ? `var(--color-${correct == "correct" ? "correct": "wrong"})` : 'white' }}>

            <Webcam
                videoConstraints={videoConstraints}
                ref={webcamRef}
                onUserMedia={handleWebcamMount}
                style={{
                borderRadius: "20px",
                position: "relative",
                top: 0,
                left: 0,
                zIndex: -1,
                width: "0%",
                height: "0%"
                }}
            />

            <div className={styles.feedbackContainer}>
            {imageSrc && capturing && (
                    <img
                        src={imageSrc}
                        alt="Landmarks"
                        style={{
                            borderRadius: "20px",
                            objectFit: "cover",
                            zIndex: 1000,
                            position: "relative",
                            top: 0,
                            left: 0
                        }}
                        />
                    )}
                {correct && <div
                    className={styles.feedback}
                    style={{
                        borderColor: correct ? `var(--color-${correct == "correct" ? "correct": "wrong"})` : 'black' }}
                >
                    {correct == "correct" ? 'Awesome, you got it!' : 'Not quite!'}
                </div>}
                {hint && hint == 'button' && <button className={styles.hintBtn} onClick={hintButtonHandler}>
                    <FaLightbulb />Hint!</button>
                }
            </div>
        </div>
    );
}

Cam.propTypes = {
    capturing: PropTypes.bool.isRequired,
    setCapturing: PropTypes.func,
    setDetectedLetter: PropTypes.func,
    correct: PropTypes.string,
    hint: PropTypes.string,
    hintButtonHandler: PropTypes.func,
    useML: PropTypes.bool,
};
