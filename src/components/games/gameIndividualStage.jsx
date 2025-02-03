import PropTypes from 'prop-types';
import styles from './gameStage.module.css';
import Cam from '../cam';



function Stage({ currentWord, inputLetters, setStageState, evaluateCallback }) {
    return (
        <div className={styles.gamesStageWithButton}>

            <div className={styles.gamesStageOverview}>
                <h1 className={styles.gamesStageHeader}>
                    Spell {currentWord}</h1>
                <div className={styles.cameraWebcam}>
                    <Cam
                        capturing={true}
                        evaluateCallback={evaluateCallback}
                        withHint={true}
                    />
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
                            }
                        >
                            {inputLetters[index] || ''}
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.gamesStageButtonContainer}>
                <button className="button" onClick={() => setStageState("results")}>Skip</button>
            </div>

        </div>
    );
}

Stage.propTypes = {
    setMode: PropTypes.func.isRequired
}

export default Stage