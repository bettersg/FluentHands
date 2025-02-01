import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Cam from '../cam';
import { useParams } from "react-router-dom";
import styles from './lessonContent.module.css';
import { useNavigate } from "react-router";
import Header from "../header"

export default function LessonContent({ setMode }) {
    const { letter } = useParams(); 
    const [capturing, setCapturing] = useState(true);

    const [showNextButton, setShowNextButton] = useState(false);
    const [showTryAgainButton, setShowTryAgainButton] = useState(false);
    const [showSkipButton, setShowSkipButton] = useState(false);

    const navigate = useNavigate();

    const evaluateCallback = (correct) => {
        if (correct) {
            setShowNextButton(true); // Show next button when answer is correct
            setShowTryAgainButton(false); // Hide Try Again button
            setShowSkipButton(false); // Hide Skip button

        } else {
            setShowNextButton(false); // Hide Next button
            setShowTryAgainButton(true); // Show Try Again button
            setShowSkipButton(true); // Show Skip button
        }
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
        <>
            <Header/>
            <div className={styles.container}>
                <h1 className={styles.header}>Sign &apos;{letter}&apos;</h1>
                <Cam 
                    capturing={capturing} 
                    setCapturing={setCapturing} 
                    evaluateCallback={evaluateCallback} 
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
            </div>
        </>
    );
}

LessonContent.propTypes = {
    setMode: PropTypes.func.isRequired
};
