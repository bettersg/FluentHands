import PropTypes from 'prop-types'
import styles from './cam.module.css'
import { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { FaLightbulb } from "react-icons/fa"; 
import axios from 'axios';

export default function Cam({ capturing, setCapturing, setDetectedLetter, correct, hint, hintButtonHandler, useML=true }) {
    // Timer and interval states
    const [intervalId, setIntervalId] = useState(null);

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
    
        const interval = setInterval(async () => {
            if (stream.active && video.readyState >= 2) {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
    
                const width = video.videoWidth;
                const height = video.videoHeight;
    
                if (width > 0 && height > 0) {
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(video, 0, 0, width, height);
    
                    if (useML) {
                        const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg"));
                        if (blob) {
                            frameBufferRef.current.push(blob);
    
                            if (frameBufferRef.current.length === 5) {
                                const keypoints = await sendFrames(frameBufferRef.current);
                                frameBufferRef.current = []; // Reset buffer after sending
                                console.log("Keypoints:", keypoints);
                                // array of x,y coordinates

                                // // visualise on canvas
                                // if (keypoints) {
                                //     keypoints.forEach((point) => {
                                //         const [x, y] = [point.x * canvas.width, point.y * canvas.height]; // Scale to canvas
                                //         ctx.beginPath();
                                //         ctx.arc(x, y, 5, 0, 2 * Math.PI); // Draw circle at each point
                                //         ctx.fillStyle = "red";
                                //         ctx.fill();
                                //     });
                                // }

                            }
                        }
                    }
                } else {
                    console.warn("Skipping frame: Video dimensions are still 0.");
                }
            }
        }, 200); // Capture a frame every 200ms, so 5 frames per second will be sent
    
        setIntervalId(interval);
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
            
            // load response object
            const modelResponse = response.data;
            var majorityLetter = modelResponse["majority_letter"];

            // if letter is O then correct else wrong
            if (majorityLetter === null) {
                return null;
            } else { 
                setDetectedLetter(majorityLetter);
                // return modelResponse["normalized_coords"] // do later
                return null
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
            {capturing && <Webcam videoConstraints={videoConstraints} ref={webcamRef} onUserMedia={handleWebcamMount} style={{borderRadius: "20px" }}/>}
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
