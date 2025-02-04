import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './gameStage.module.css';
import Cam from '../cam';

function GamesStage({ setMode }) {

    const wordList = ['hello', 'love', 'name', 'thanks', 'friend', 'dear', 'happy', 'sorry', 'help', 'think', 'say', 'good', 'bye', 'safe', 'smile', 'cheers', 'hope', 'joy', 'sad', 'find'];
    
    const [usedWords, setUsedWords] = useState([]);
    const [currentWord, setCurrentWord] = useState('');
    const [inputLetters, setInputLetters] = useState([]);
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
    const [sessionCount, setSessionCount] = useState(0);
    const [stageState, setStageState] = useState('stage');
    
    const [capturing, setCapturing] = useState(true) 
    const handleEndGame = () => setMode('end')
    
    // select a new word or end game
    useEffect(() => {
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
        }
    }, [currentWord, usedWords, wordList, sessionCount]);

    // mark letter as correct
    const handleMarkCorrect = () => {
        const newInputLetters = [...inputLetters];
        newInputLetters[currentLetterIndex] = currentWord[currentLetterIndex]; // Mark the current letter as correct
        setInputLetters(newInputLetters);

        if (currentLetterIndex < currentWord.length - 1) {
            setCurrentLetterIndex(currentLetterIndex + 1);
        } else {
            setStageState("results");     // current word is complete, show results page

        }
    };

    // mark letter as wrong
    const handleMarkWrong = () => {
        const newInputLetters = [...inputLetters];
        newInputLetters[currentLetterIndex] = ' '; // mark as incorrect
        setInputLetters(newInputLetters);   // stay on the same letter
    };

    const handleEvalLetter = (correct) => {
        if (correct) {
            handleMarkCorrect()
        } else {
            handleMarkWrong()
        }
    }

    // set the next word and go back to the page where the user signs
    const handleNextWord = () => {
        setStageState('stage');
        setCurrentWord(''); // reset word
        setSessionCount(sessionCount + 1);
    };

    return (
        <div className={styles.gamesStageWithButton}>
            {(stageState == "stage") ? (
                //stage page for one word: where the user signs
                <>
                    <div className={styles.gamesStageOverview}>
                        <h1 className={styles.gamesStageHeader}>
                            Spell {currentWord}
                        </h1>

                        <Cam
                            capturing={capturing}
                            setCapturing={setCapturing}
                            requiredLetter={currentWord[currentLetterIndex]}
                            evaluateCallback={handleEvalLetter}
                        />

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
                    </div>

                    <div className={styles.gamesStageButtonContainer}>
                        {/* <button className='button' onClick={handleMarkCorrect}>
                            Correct
                        </button>
                        <button className='button' onClick={handleMarkWrong}>
                            Wrong
                        </button> */}
                        <button className="button" onClick={() => setStageState("results")}>
                            Skip
                        </button>
                    </div>
                </>
            ) : (
                // results page for one word
                <div className={styles.gamesResultsWithButton}>
                    <div className={styles.gamesResultsOverview}>

                        <h1 className={styles.gamesStageHeader}>
                            Spell {currentWord}
                        </h1>

                        <div className={styles.gamesResultsLettersOverview}>
                            {currentWord.split('').map((letter, index) => (
                                <div key={index} className={styles.gamesResultsLetterContainer}>
                                    <img src={`./letters/${letter}.png`} alt="webcam placeholder" />
                                    <div
                                        className={styles.gamesStageLetterCorrect}>
                                        {letter}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.gamesResultsButtonContainer}>
                        <button className="button" onClick={handleNextWord}>
                            Next
                        </button>
                    </div>
                </div>

            )}
        </div>
    )
}

GamesStage.propTypes = {
    setMode: PropTypes.func.isRequired
}

export default GamesStage