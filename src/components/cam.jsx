import PropTypes from 'prop-types'
import styles from './cam.module.css'
import { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { FaLightbulb } from "react-icons/fa"; 

export default function Cam({evaluateCallback, capturing, setCapturing}) {
    const [camColor, setCamColor] = useState('black')
    const [feedbackMsg, setFeedbackMsg] = useState('')
    // const [camEnabled, setCamEnabled] = useState(false)
    const [showHint, setShowHint] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null)
    const [hintTimeoutId, setHintTimeoutId] = useState(null)
    
    const videoConstraints = {
        facingMode: 'user',
        width: { min: 1024, ideal: 1280, max: 1920 },
        height: { min: 576, ideal: 720, max: 1080 }
    }

    const webcamRef = useRef()
    const mediaRecorderRef = useRef();
    const [dataChunks, setDataChunks] = useState([]);

    const evaluate = (correct) => {
        evaluateCallback(correct)
        sendFeedback(correct)
        if (correct) {
            setShowHint(false)
        } else {
            startHintTimer(); 
        }
    }

    const sendFeedback = (correct) => {
        setCamColor(correct ? 'green' : 'red')
        setFeedbackMsg(correct ? 'Awesome!': 'Oops...  try again!')
        clearTimeout(timeoutId)

        let timeout = setTimeout(() => {
            setCamColor('black')
            setFeedbackMsg('')
        }, 5000)
        setTimeoutId(timeout)
    }

    const startHintTimer = () => {
        if (!hintTimeoutId) {
            let timeout = setTimeout(() => {
                setShowHint(true)
                setHintTimeoutId(null)
                console.log('Hint button should now be visible.')
            }, 5000)
            setHintTimeoutId(timeout)
        }
    }

    const handleHintClick = () => {
        setShowHint(false)
        alert('This is a hint!')
    }

    const handleStartCapture = useCallback(() => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm"
        });
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorderRef.current.start();
        }, [webcamRef, setCapturing, mediaRecorderRef]);

        const handleDataAvailable = useCallback(
        ({ data }) => {
            if (data.size > 0) {
                setDataChunks((prev) => prev.concat(data));
            }
        },
            [setDataChunks]
        );

    const handleStopCapture = useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);

    const handleEvaluate = useCallback(() => {
    if (dataChunks.length) {
        const blob = new Blob(dataChunks, {
            type: "video/webm"
        });
        const stream = blob.stream()
        console.log(stream)
    //   for await (const chunk of stream) {

    //   }
    //   const url = URL.createObjectURL(blob);
    //   const a = document.createElement("a");
    //   document.body.appendChild(a);
    //   a.style = "display: none";
    //   a.href = url;
    //   a.download = "react-webcam-stream-capture.webm";
    //   a.click();
    //   window.URL.revokeObjectURL(url);
        setDataChunks([]);
    }
    }, [dataChunks]);
    
    

    return (
    <div className={styles.cam} style={{borderColor: camColor}}>
        {/* <video muted width="1024" height='576' ref={videoRef}></video> */}
        {capturing && <Webcam style={{zIndex: 0}}videoConstraints={videoConstraints} ref={webcamRef} onUserMedia={startHintTimer}/>}

        {<div className={styles.feedbackContainer}>
            <div className={styles.feedback} style={{borderColor: camColor}}>{feedbackMsg}</div>
            <div className={styles.btnContainer}>
                <button className='button' onClick={() => evaluate(true)}>Correct sign</button>
                <button className='button' onClick={() => evaluate(false)}>Wrong sign</button>
            </div>
            {showHint && ( <button className={styles.hintBtn} onClick={handleHintClick}>
                <FaLightbulb/> Hint! </button>
            )}
        </div>}
    </div>
    )
}

Cam.propTypes = {
    evaluateCallback: PropTypes.func.isRequired,
    capturing: PropTypes.bool.isRequired,
    setCapturing: PropTypes.func.isRequired
}