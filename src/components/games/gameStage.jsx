import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './gameStage.module.css';
import Cam from '../cam';

export default function GamesStage({ setMode }) {

    const wordList = ['hello', 'love', 'name', 'thanks', 'friend', 'dear', 'happy', 'sorry', 'help', 'think', 'say', 'good', 'bye', 'safe', 'smile', 'cheers', 'hope', 'joy', 'sad', 'find'];
    
    const [usedWords, setUsedWords] = useState([]);
    const [currentWord, setCurrentWord] = useState('');
    const [inputLetters, setInputLetters] = useState([]);
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
    const [sessionCount, setSessionCount] = useState(0);
    const [stageState, setStageState] = useState('stage');
    
    const [capturing, setCapturing] = useState(false)
    const [detectedLetter, setDetectedLetter] = useState('')
    const [correct, setCorrect] = useState(null) 
    // hint states: '', 'button', 'picture'
    const [hint, setHint] = useState('');

    const handleEndGame = () => setMode('end')
    
    // select a new word or end game
    useEffect(() => {
        console.log(currentWord)
        if (sessionCount > 5) {
            handleEndGame();
            return;
        }
        if (currentWord == '') {
            const remainingWords = wordList.filter(word => !usedWords.includes(word));

            if (remainingWords.length === 0) {
                // reset usedWords after all words are used
                setUsedWords([]);
            } else {
                const newWord = remainingWords[Math.floor(Math.random() * remainingWords.length)];
                setCurrentWord(newWord.toUpperCase());
                setInputLetters(Array(newWord.length).fill(''));
                setUsedWords([...usedWords, newWord]);
                setCurrentLetterIndex(0);
            }
            return
        }

        if (capturing) {
            handleEvalLetter(detectedLetter)
        }
    }, [currentWord, usedWords, wordList, sessionCount, detectedLetter, currentLetterIndex, capturing]);

    // mark letter as correct
    const handleMarkCorrect = () => {
        const newInputLetters = [...inputLetters];
        newInputLetters[currentLetterIndex] = currentWord[currentLetterIndex]; // Mark the current letter as correct
        setInputLetters(newInputLetters);

        if (currentLetterIndex < currentWord.length - 1) {
            setCurrentLetterIndex(currentLetterIndex + 1);
        } else {
            setStageState("results");     // current word is complete, show results page
            setCapturing(false)
        }
    };

    // mark letter as wrong
    const handleMarkWrong = () => {
        const newInputLetters = [...inputLetters];
        newInputLetters[currentLetterIndex] = ' '; // mark as incorrect
        setInputLetters(newInputLetters);   // stay on the same letter
    };

    const handleEvalLetter = (detectedLetter) => {
        if (detectedLetter) {
            console.log('Detected letter:', detectedLetter, 'Required letter:', currentWord[currentLetterIndex])
            if (detectedLetter == currentWord[currentLetterIndex]) {
                setHint('')
                setCorrect("correct")
                setTimeout(() => {
                    setCorrect(null)
                }, 1000)
                handleMarkCorrect()
            } else {
                if (correct == null) {
                    setCorrect('wrong')
                    if (hint == '') setHint('button')
                    handleMarkWrong()
                }
            }
        }
    }

    // set the next word and go back to the page where the user signs
    const handleNextWord = () => {
        // Reset display states
        setCorrect(null)
        setDetectedLetter('')
        setHint('')
        // Reset word
        setCurrentWord(''); 
        setStageState('stage');
        setSessionCount(sessionCount + 1);
        setCapturing(true)
    };

    return (
        (stageState == "stage") ? (
        //stage page for one word: where the user signs
        <div className={styles.gameStageContainer}>
            <div className={styles.gamesStage}>
                
                {capturing ? 
                <>
                    <div className={styles.gamesStageHeaderContainer}>
                        <div className={styles.gamesStageButtonContainer}>
                        </div>
                        <h1 className={styles.gamesStageHeader}>
                            Spell {currentWord}
                        </h1>
                        <div className={styles.gamesStageButtonContainer}>
                            <button className="button" onClick={() => setStageState("results")}>
                                Skip
                            </button>
                        </div>
                    </div>
                    <div className={styles.camContainer}>
                        {hint == 'picture' && <div className={styles.hintPic}></div>}
                        <Cam
                            capturing={capturing}
                            setCapturing={setCapturing}
                            setDetectedLetter={setDetectedLetter}
                            correct={correct}
                            hint={hint}
                            hintButtonHandler={() => setHint('picture')}
                            useML={true}
                        />
                        {hint == 'picture' && <div className={styles.hintPic}>
                            <img src={`letters/${currentWord[currentLetterIndex]}.png`} alt={`${currentWord[currentLetterIndex]} sign hint`} />
                        </div>}
                    </div>
                    <div className={styles.gamesStageLettersOverview}>
                        {currentWord.split('').map((letter, index) => (
                            <div
                                key={index}
                                className={
                                    inputLetters[index]
                                        ? inputLetters[index] === letter
                                            ? styles.gamesStageLetterCorrect
                                            : styles.gamesStageLetterWrong
                                        : styles.gamesStageLetterEmpty
                                }>
                                {inputLetters[index] || ''}
                            </div>
                        ))}
                    </div>
                </> :
                <>
                    <p>
                        Place your hand in the orange box (your webcam), so it is visible on screen. <br/>
                        Click the button to begin.
                    </p>
                    <Cam
                        setDetectedLetter={() => {}}
                        setCorrect={() => {}}
                        setHint={() => {}}
                        capturing={true}
                        useML={false}
                    />
                    <button className='button' style={{margin: '0 auto'}} onClick={() => {console.log(capturing); setCapturing(true)}}>I&apos;m ready</button>
                </>}
            </div>
        </div>
        ) : (
            // results page for one word
        <div className={styles.gamesResultsOverview}>
            <h1 className={styles.gamesStageHeader}>
                Spell {currentWord}
            </h1>
            <div className={styles.gamesResultsLettersOverview}>
                {currentWord.split('').map((letter, index) => (
                    <div key={index} className={styles.gamesResultsLetterContainer}>
                        <img className={styles.gamesResultsLetterImg} src={`./letters/${letter}.png`} alt={`${letter} sign hint`}/>
                        <div
                            className={styles.gamesStageLetterCorrect}>
                            {letter}
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.gamesResultsButtonContainer}>
                <button className="button" onClick={handleNextWord}>
                    Next
                </button>
            </div>
        </div>
        )
    )
}

GamesStage.propTypes = {
    setMode: PropTypes.func.isRequired
}
