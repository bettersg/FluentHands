import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Cam from '../cam';
import { useParams, useNavigate } from "react-router";
import styles from './lessonContent.module.css';
import Header from "../header"

const defaultDone = {
    'A': false,
    'B': false,
    'C': false,
    'D': false,
    'E': false,
    'F': false,
    'G': false,
    'H': false,
    'I': false,
    'J': false,
    'K': false,
    'L': false,
    'M': false,
    'N': false,
    'O': false,
    'P': false,
    'Q': false,
    'R': false,
    'S': false,
    'T': false,
    'U': false,
    'V': false,
    'W': false,
    'X': false,
    'Y': false,
    'Z': false,
}

export default function LessonContent({ mode, setMode }) {
    
    const navigate = useNavigate();
    const { letter } = useParams(); 
    const [capturing, setCapturing] = useState(true);
    const [detectedLetter, setDetectedLetter] = useState('')
    const [correct, setCorrect] = useState(null)
    const lettersWithoutCam = ['J', 'Z']

    const [showNextButton, setShowNextButton] = useState(false);
    // const [showTryAgainButton, setShowTryAgainButton] = useState(false);
    const [showSkipButton, setShowSkipButton] = useState(false);

    const [done, setDone] = useState(() => {
        const storedDone = localStorage.getItem('fluentHands');
        return storedDone ? JSON.parse(storedDone) : defaultDone;
      });

    // Check if all letter is true
    const checkAllDone = () => {
        return Object.values(done).every(value => value === true);
    };

    useEffect(() => {
        if (mode != 'lesson') {
            navigate('/lessons')
        }
        if (checkAllDone()) {
            console.log("All letters completed! Navigating to result...");
            localStorage.setItem('hasCompletedAllLessons', 'true');
        }
        if (correct == null && capturing) {
            handleSignDetected(detectedLetter)
        }
    }, [done, setMode, detectedLetter]);

    const handleSignDetected = (detectedLetter) => {
        console.log('Detected letter:', detectedLetter, 'Required letter:', letter)
        if (detectedLetter == letter) {
            setCorrect('correct')
            setShowNextButton(true); // Show next button when answer is correct
            // setShowTryAgainButton(false); // Hide Try Again button
            setShowSkipButton(false); // Hide Skip button
            // Update current letter state
            const updatedDone = { ...done, [letter]: true };
            setDone(updatedDone); 
            localStorage.setItem('fluentHands', JSON.stringify(updatedDone));
            
        } else {
            setShowNextButton(false); // Hide Next button
            // setShowTryAgainButton(true); // Show Try Again button
            setShowSkipButton(true); // Show Skip button
        }
    };

    const markDoneAndNextPage = (currentLetter) => {
        const updatedDone = { ...done, [letter]: true };
        setDone(updatedDone); 
        localStorage.setItem('fluentHands', JSON.stringify(updatedDone));
        nextPage(currentLetter)
    }

    const nextPage = (currentLetter) => {
        setCorrect(null)
        const nextCharAscii = currentLetter.charCodeAt(0) + 1;
        if (nextCharAscii <= 90) {
            const nextChar = String.fromCharCode(nextCharAscii);
            navigate(`/lessons/${nextChar}`)
        } else {
            console.log(checkAllDone())
            if (checkAllDone()) {
                setMode('end')
                navigate(`/lessons`)
            } else {
                setMode('menu')
                navigate(`/lessons`)
            }
        }
    }

    return (
        <>
            <Header/>
            <div className={styles.container}>
                {lettersWithoutCam.includes(letter) ? 
                <div>
                    <div className={styles.controlContainer}>
                        <h1 className={styles.header}>Sign &apos;{letter}&apos;</h1>
                        <div className={styles.imgContainer}>
                            <img src={`/letters/${letter}.png`} alt={`letter ${letter} sign`} />
                        </div>
                        <div className={styles.buttonContainer}>
                            <button className={styles.nextBtn} onClick={() => markDoneAndNextPage(letter)}>Next</button>
                        </div>
                    </div>
                </div> :
                <div>
                    <div className={styles.controlContainer}>
                        <h1 className={styles.header}>Sign &apos;{letter}&apos;</h1>
                        <Cam
                            correct={correct}
                            evaluateCallback={setDetectedLetter}
                            capturing={capturing}
                            setCapturing={setCapturing}
                            withHint={false}
                        />
                        <div className={styles.buttonContainer}>
                            {showNextButton && (
                                <button className={styles.nextBtn} onClick={() => nextPage(letter)}>Next</button>
                            )}
                            {/* {showTryAgainButton && (
                                <button className={styles.tryAgainBtn} onClick={() => alert("Try Again!")}>Try Again</button>
                            )} */}
                            {showSkipButton && (
                                <button className={styles.skipBtn} onClick={() => nextPage(letter)}>Skip</button>
                            )}
                        </div>
                    </div>
                    <div className={styles.imgContainer}>
                        <img src={`/letters/${letter}.png`} alt={`letter ${letter} sign`} />
                    </div>
                </div>
                }
            </div>
        </>
    );
}

LessonContent.propTypes = {
    mode: PropTypes.string.isRequired,
    setMode: PropTypes.func.isRequired
};