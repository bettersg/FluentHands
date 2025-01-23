import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Cam from '../cam';
import { useParams } from "react-router-dom";
import styles from './lessonContent.module.css';
import EnableCam from '../enableCam';
import { useNavigate } from "react-router";

export default function LessonContent({ setMode }) {
    const { letter } = useParams(); 
    const [showDialogue, setShowDialogue] = useState(false);
    const [capturing, setCapturing] = useState(true);
    const [feedback, setFeedback] = useState(null); 
    const [feedbackMsg, setFeedbackMsg] = useState(''); 

    const [showNextButton, setShowNextButton] = useState(false);
    const [showTryAgainButton, setShowTryAgainButton] = useState(false);
    const [showSkipButton, setShowSkipButton] = useState(false);

    const navigate = useNavigate();

    // Enable cam with sessionStorage
    useEffect(() => {
        const hasSeenPopup = sessionStorage.getItem('enableCamPromptShown');
        if (!hasSeenPopup) {
            setShowDialogue(true); 
        }

        const handleBeforeUnload = () => {
            sessionStorage.removeItem('enableCamPromptShown');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const handleEnable = () => {
        sessionStorage.setItem('enableCamPromptShown', 'true');
        setShowDialogue(false);
        console.log("Camera permissions enabled");
    };

    const handleDeny = () => {
        sessionStorage.setItem('enableCamPromptShown', 'true');
        setShowDialogue(false);
        console.log("Camera permissions denied");
    };

    const evaluateCallback = (correct) => {
        const message = correct ? 'Awesome!' : 'Oops... try again!';
        setFeedback(correct ? 'correct' : 'wrong');
        setFeedbackMsg(message);

        if (correct) {
            setShowNextButton(true); // Show next button when answer is correct
            setShowTryAgainButton(false); // Hide Try Again button
            setShowSkipButton(false); // Hide Skip button

        } else {
            setShowNextButton(false); // Hide Next button
            setShowTryAgainButton(true); // Show Try Again button
            setShowSkipButton(true); // Show Skip button
        }

        setTimeout(() => {
            setFeedback(null);
            setFeedbackMsg('');
        }, 5000);  
    };

    const nextPage = (currentLetter) => {
        const nextCharAscii = currentLetter.charCodeAt(0) + 1;
        if (nextCharAscii <= 90) {
            const nextChar = String.fromCharCode(nextCharAscii);
            navigate(`/lessons/${nextChar}`)
        }
    }

    // ! NOT WORKING YET
    // const markAsDone = (letter) => {
    //     const letterIndex = done.findIndex(item => item.letter === letter);
    //     console.log('Letter index in done array:', letterIndex);
    //     if (letterIndex !== -1) {
    //         setDone((prevDone) =>
    //             prevDone.map((item, index) =>
    //                 index === letterIndex ? { ...item, value: true } : item
    //             )
    //         );
    //     }
    // };


    return (
        <div className={styles.container}>
            {!showDialogue && (
                <>
                    <h1 className={styles.header}>Sign '{letter}'</h1>
                    <Cam 
                        capturing={capturing} 
                        setCapturing={setCapturing} 
                        evaluateCallback={evaluateCallback} 
                        feedback={feedback}
                        feedbackMsg={feedbackMsg}
                        withHint={false}
                    />
                    <div className={styles.buttonContainer}>
                        {showNextButton && (
                            <button className={styles.nextBtn} onClick={() => nextPage(letter)}>Next</button>
                        )}
                        {showTryAgainButton && (
                            <button className={styles.tryAgainBtn} onClick={() => alert("Try Again!")}>Try Again</button>
                        )}
                        {showSkipButton && (
                            <button className={styles.skipBtn} onClick={() => nextPage(letter)}>Skip</button>
                        )}
                    </div>
                </>
            
            )}
    
            {showDialogue && (
                <div className={styles.lessonDialogue}>
                    <EnableCam 
                        desc="To proceed, please enable camera permissions."
                        enableHandler={handleEnable}
                        denyHandler={handleDeny}
                    />
                </div>
            )}
        </div>
    );
}

LessonContent.propTypes = {
    setMode: PropTypes.func.isRequired
};
