import PropTypes from 'prop-types'
import styles from './cam.module.css'
import { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { FaLightbulb } from "react-icons/fa"; 

export default function Cam({capturing, setCapturing, evaluateCallback, withHint=true}) {
    // feedback states: null, correct, wrong, hint
    const [feedback, setFeedback] = useState(null)
    const [feedbackMsg, setFeedbackMsg] = useState('')
    const [showHint, setShowHint] = useState(false)

    // setTimeout and setInterval management
    const [timeoutId, setTimeoutId] = useState(null)
    const [hintTimeoutId, setHintTimeoutId] = useState(null)
    const [intervalId, setIntervalId] = useState(null)

    const webcamRef = useRef()
    const videoConstraints = {
        facingMode: 'user',
        // width: { min: 1024, ideal: 1280, max: 1920 },
        // height: { min: 576, ideal: 720, max: 1080 },
        width: 640,
        height: 480
    }

    // Placeholder function for CV model API
    const evaluate = (detectedLetter) => {
        const correct = evaluateCallback(detectedLetter);
        sendFeedback(correct);
        if (withHint) {
            if (correct) {
                clearHintTimer()
                setShowHint(false)
            } else {
                startHintTimer(); 
            }
        }
    }

    const sendFeedback = (correct) => {
        setFeedback(correct ? 'correct' : 'wrong')
        setFeedbackMsg(correct ? 'Awesome!': 'Oops...  try again!')
        clearTimeout(timeoutId)

        let timeout = setTimeout(() => {
            setFeedback(null)
            setFeedbackMsg('')
        }, 5000)
        setTimeoutId(timeout)
    }

    const startHintTimer = () => {
        if (!hintTimeoutId) {
            let timeout = setTimeout(() => {
                setShowHint(true)
                setFeedback('hint')
                console.log('Hint button should now be visible.')
            }, 5000)
            setHintTimeoutId(timeout)
        }
    }

    const clearHintTimer = () => {
        clearTimeout(hintTimeoutId)
        setHintTimeoutId(null)
    }

    const handleHintClick = () => {
        setShowHint(false)
        setFeedback(null)
        alert('This is a hint!')
    }

    const handleWebcamMount = () => {
        if (withHint) {
            startHintTimer()
        }
        handleStartCapture()
    }

    const handleStartCapture = useCallback(() => {
        const video = webcamRef.current.video
        const stream = webcamRef.current.stream
        const interval = setInterval(() => {
            if (stream.active) {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob)
                    console.log(url)
                });
            }
        }, 100)
        setIntervalId(interval)
    }, [webcamRef])

    const handleStopCapture = useCallback(() => {
        setCapturing(false);
        clearInterval(intervalId)
        setIntervalId(null)
    }, [webcamRef, setCapturing]);

    return (
        <div className={styles.cam} style={{borderColor: feedback ? `var(--color-${feedback})`: 'black'}}>
            {capturing && <Webcam videoConstraints={videoConstraints} ref={webcamRef} onUserMedia={handleWebcamMount}/>}
            <div className={styles.feedbackContainer}>
                {feedbackMsg && <div className={styles.feedback} style={{borderColor: feedback ? `var(--color-${feedback})` : 'black'}}>{feedbackMsg}</div>}
                <div className={styles.btnContainer}>
                    <button className='button' onClick={() => evaluate(true)}>Correct sign</button>
                    <button className='button' onClick={() => evaluate(false)}>Wrong sign</button>
                </div>
                {showHint && <button className={styles.hintBtn} onClick={handleHintClick}>
                    <FaLightbulb/>Hint!</button>
                }
            </div>
        </div>
    )
}

Cam.propTypes = {
    capturing: PropTypes.bool.isRequired,
    setCapturing: PropTypes.func.isRequired,
    evaluateCallback: PropTypes.func.isRequired,
    withHint: PropTypes.bool
}