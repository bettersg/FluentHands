import PropTypes from 'prop-types'
import styles from './cam.module.css'
import { useCallback, useRef, useState, useEffect } from 'react'
import Webcam from 'react-webcam'
import { FaLightbulb } from "react-icons/fa"; 
import axios from 'axios';
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import hand_landmarker_task from "../models/hand_landmarker.task";

export default function Cam({ capturing, setCapturing, setDetectedLetter, correct, hint, hintButtonHandler, useML=true }) {
    // Timer and interval states
    const [intervalId, setIntervalId] = useState(null);
    const [showWebcam, setShowWebcam] = useState(true); // New state to control webcam visibility
    const canvasRef = useRef(null); // Reference for the new canvas

    // Webcam reference and video constraints
    const webcamRef = useRef();
    const frameBufferRef = useRef([]); // Buffer to store frames
    const [onnxSession, setOnnxSession] = useState(null); // Store ONNX model session

    useEffect(() => {
        const loadOnnxModel = async () => {
            try {
                const response = await fetch('/models/hand_keypoints_classifier.onnx');
                if (!response.ok) {
                    throw new Error('Failed to load ONNX model');
                }
                const modelArrayBuffer = await response.arrayBuffer();
                const session = await ort.InferenceSession.create(modelArrayBuffer, {executionProviders: ['cpu']}); 
                setOnnxSession(session);
                console.log("ONNX model loaded.");
            } catch (error) {
                console.error("Error loading ONNX model:", error);
            }
        };
        loadOnnxModel();
    }, []);

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
                numHands: 2,
                runningMode: "video"
            }
        );

        console.log("Hand Landmarker model loaded");

        const classifyLandmarks = async (landmarks) => {
            try {
                const inputTensor = new ort.Tensor("float32", new Float32Array(landmarks), [1, 42]);
                const outputs = await onnxSession.run({ input: inputTensor });
                const predictions = outputs.output.data; 
                console.log("ONNX Prediction:", predictions);
            } catch (error) {
                console.error("Error running ONNX inference:", error);
            }
        };

        const interval = setInterval(async () => {
            if (stream.active && video.readyState >= 2) {
                const detections = handLandmarker.detectForVideo(video, performance.now());
                console.log("Detections:", detections);

                if (detections.landmarks.length > 0) {
                    const flattenedLandmarks = detections.landmarks[0].flat(); // Extract first hand landmarks

                    if (flattenedLandmarks.length === 42 && onnxSession) {
                        classifyLandmarks(flattenedLandmarks);
                    } else {
                        console.warn("Skipping frame: Landmarks are not complete.");
                    }

                    // Draw landmarks on the canvas
                    const canvas = canvasRef.current;
                    const ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before drawing

                    detections.landmarks.forEach((landmark) => {
                        landmark.forEach((point) => {
                            const [x, y] = [point[0] * canvas.width, point[1] * canvas.height]; // Scale to canvas
                            ctx.beginPath();
                            ctx.arc(x, y, 5, 0, 2 * Math.PI); // Draw circle at each point
                            ctx.fillStyle = "red";
                            ctx.fill();
                        });
                    });
                }
            }
        }, 100); // Update every 100ms

        setIntervalId(interval);
        setShowWebcam(false); // Hide the webcam when starting capture
    }, [webcamRef]);

    const sendFrames = async (frames) => {
        const formData = new FormData();
        frames.forEach((blob, i) => {
            formData.append("files", blob, `frame_${i}.jpg`);
        });

        try {
            const response = await axios.post("https://tfosr-ml.onrender.com/predict", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Server Response:", response.data);
            const modelResponse = response.data;
            var majorityLetter = modelResponse["majority_letter"];

            if (majorityLetter === null) {
                return null;
            } else { 
                setDetectedLetter(majorityLetter);
                return null;
            }
        } catch (error) {
            console.error("Error sending batch:", error.response?.data || error.message);
        }
    };

    const handleStopCapture = useCallback(() => {
        setCapturing(false);
        clearInterval(intervalId);
        setIntervalId(null);
    }, [webcamRef, setCapturing]);

    return (
        <div className={styles.cam} style={{ borderColor: correct ? `var(--color-${correct == "correct" ? "correct": "wrong"})` : 'white' }}>
            {!showWebcam && <canvas ref={canvasRef} width={640} height={480} style={{ borderRadius: "20px", display: 'block', margin: '0 auto' }} />}
            {showWebcam && <Webcam videoConstraints={videoConstraints} ref={webcamRef} onUserMedia={handleWebcamMount} style={{borderRadius: "20px", display: 'block', margin: '0 auto' }}/>}
            <div className={styles.feedbackContainer}>
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
