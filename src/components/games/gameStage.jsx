import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './gameStage.module.css';
import Stage from './gameIndividualStage'
import Results from './gameIndividualResults'

function GamesStage({ setMode }) {

    const handleEndGame = () => setMode('end')

    const wordList = ['hello', 'love', 'name', 'thanks', 'friend', 'dear', 'happy', 'sorry', 'help', 'think', 'say', 'good', 'bye', 'safe', 'smile', 'cheers', 'hope', 'joy', 'sad', 'find'];

    const [usedWords, setUsedWords] = useState([]);
    const [currentWord, setCurrentWord] = useState('');
    const [inputLetters, setInputLetters] = useState([]);
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
    const [sessionCount, setSessionCount] = useState(0);
    const [stageState, setStageState] = useState('stage');

    // select a new word or end game
    useEffect(() => {
        if (sessionCount > 4) {
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


    const evaluateCallback = (correct) => {
        if (correct) {
            handleMarkCorrect()
        } else {
            handleMarkWrong()
        }
    };



    // mark letter as correct
    const handleMarkCorrect = () => {
        const newInputLetters = [...inputLetters];
        newInputLetters[currentLetterIndex] = currentWord[currentLetterIndex]; // Mark the current letter as correct
        setInputLetters(newInputLetters);

        if (currentLetterIndex < currentWord.length - 1) {
            setCurrentLetterIndex(currentLetterIndex + 1);
        } else {
            setTimeout(() => {
                handleNextWord();
            }, 600);  // 600ms delay
        }
    };

    // mark letter as wrong
    const handleMarkWrong = () => {
        const newInputLetters = [...inputLetters];
        newInputLetters[currentLetterIndex] = ' '; // mark as incorrect
        setInputLetters(newInputLetters);   // stay on the same letter
    };


    // set the next word and go back to the page where the user signs
    const handleNextWord = () => {
        setStageState('stage');
        setCurrentWord(''); // reset word
        setSessionCount(sessionCount + 1);
    };



    return (
        <div className={styles.gamesStageWithButton}>
            {stageState === "stage" ? (
                <Stage currentWord={currentWord} inputLetters={inputLetters} setStageState={setStageState} evaluateCallback={evaluateCallback} />
            ) : (
                <Results currentWord={currentWord} handleNextWord={handleNextWord} />
            )}
        </div>
    )
}

GamesStage.propTypes = {
    setMode: PropTypes.func.isRequired
}

export default GamesStage