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

    const [done, setDone] = useState(() => {
        const storedDone = localStorage.getItem('fluentHands');
        return storedDone ? JSON.parse(storedDone) : {};
      });

    // Check if all letter is true
    const checkAllDone = () => {
        return Object.values(done).every(value => value === true);
    };


    const evaluateCallback = (correct) => {
        if (correct) {
            setShowNextButton(true); // Show next button when answer is correct
            setShowTryAgainButton(false); // Hide Try Again button
            setShowSkipButton(false); // Hide Skip button
            // Update current letter state
            const updatedDone = { ...done, [letter]: true };
            setDone(updatedDone); 
            localStorage.setItem('fluentHands', JSON.stringify(updatedDone)); 
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