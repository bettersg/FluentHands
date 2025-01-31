import PropTypes from 'prop-types'
import styles from './cam.module.css'
import { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { FaLightbulb } from "react-icons/fa"; 
import axios from 'axios';

export default function Cam({ capturing, setCapturing, evaluateCallback, withHint = true }) {
    // Feedback states: null, correct, wrong, hint
    const [feedback, setFeedback] = useState(null);
    const [feedbackMsg, setFeedbackMsg] = useState('');
    const [showHint, setShowHint] = useState(false);

    // Timer and interval states
    const [timeoutId, setTimeoutId] = useState(null);
    const [hintTimeoutId, setHintTimeoutId] = useState(null);
    const [intervalId, setIntervalId] = useState(null);

    // Webcam reference and video constraints
    const webcamRef = useRef();
    const frameBufferRef = useRef([]); // Buffer to store frames

    const videoConstraints = {
        facingMode: 'user',
        width: 640,
        height: 480
    };

    // Placeholder function for CV model API
    const evaluate = (correct) => {
        evaluateCallback(correct);
        sendFeedback(correct);
        if (withHint) {
            if (correct) {
                clearHintTimer();
                setShowHint(false);
            } else {
                startHintTimer();
            }
        }
    };

    const sendFeedback = (correct) => {
        setFeedback(correct ? 'correct' : 'wrong');
        setFeedbackMsg(correct ? 'Awesome, hold it there!' : 'Keep Trying!');
        clearTimeout(timeoutId);

        let timeout = setTimeout(() => {
            setFeedback(null);
            setFeedbackMsg('');
        }, 5000);
        setTimeoutId(timeout);
    };

    const startHintTimer = () => {
        if (!hintTimeoutId) {
            let timeout = setTimeout(() => {
                setShowHint(true);
                setFeedback('hint');
                console.log('Hint button should now be visible.');
            }, 5000);
            setHintTimeoutId(timeout);
        }
    };

    const clearHintTimer = () => {
        clearTimeout(hintTimeoutId);
        setHintTimeoutId(null);
    };

    const handleHintClick = () => {
        setShowHint(false);
        setFeedback(null);
        alert('This is a hint!');
    };

    const handleWebcamMount = () => {
        if (withHint) {
            startHintTimer();
        }
        handleStartCapture();
    };

    const handleStartCapture = useCallback(() => {
        const video = webcamRef.current.video;
        const stream = webcamRef.current.stream;

        const interval = setInterval(() => {
            if (stream.active && video.readyState >= 2) {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                const width = video.videoWidth;
                const height = video.videoHeight;

                if (width > 0 && height > 0) {
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(video, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        if (blob) {
                            frameBufferRef.current.push(blob);

                            if (frameBufferRef.current.length === 5) {
                                sendFrames(frameBufferRef.current);
                                frameBufferRef.current = []; // Reset buffer after sending
                            }
                        }
                    }, "image/jpeg");
                } else {
                    console.warn("Skipping frame: Video dimensions are still 0.");
                }
            }
        }, 100); // Capture a frame every 100ms

        setIntervalId(interval);
    }, [webcamRef]);

    const sendFrames = async (frames) => {
        const formData = new FormData();

        frames.forEach((blob, i) => {
            formData.append("files", blob, `frame_${i}.jpg`);
        });

        try {
            const response = await axios.post("http://0.0.0.0:8000/predict", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Server Response:", response.data);
            // load respnse object

            const modelResponse = response.data;
            console.log(modelResponse["majority_letter"]);

            // if letter is O then correct else wrong
            if (modelResponse["majority_letter"] === "O") {
                evaluate(true);
            } else {
                evaluate(false);
            }

            // TODO: Evaluate the response dynamically instead of hardcoding


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
        <div className={styles.cam} style={{ borderColor: feedback ? `var(--color-${feedback})` : 'black' }}>
            {capturing && <Webcam videoConstraints={videoConstraints} ref={webcamRef} onUserMedia={handleWebcamMount} />}
            <div className={styles.feedbackContainer}>
                {feedbackMsg && <div className={styles.feedback} style={{ borderColor: feedback ? `var(--color-${feedback})` : 'black' }}>{feedbackMsg}</div>}
                {/* <div className={styles.btnContainer}>
                    <button className='button' onClick={() => evaluate(true)}>Correct sign</button>
                    <button className='button' onClick={() => evaluate(false)}>Wrong sign</button>
                </div> */}
                {showHint && <button className={styles.hintBtn} onClick={handleHintClick}>
                    <FaLightbulb />Hint!</button>
                }
            </div>
        </div>
    );
}

Cam.propTypes = {
    capturing: PropTypes.bool.isRequired,
    setCapturing: PropTypes.func.isRequired,
    evaluateCallback: PropTypes.func.isRequired,
    withHint: PropTypes.bool
};
