import PropTypes from 'prop-types';
import styles from './gameStage.module.css';


function Results({ currentWord, handleNextWord }) {
    return (
        <div className={styles.gamesResultsWithButton}>
            <div className={styles.gamesResultsOverview}>
                <h1 className={styles.gamesStageHeader}>Spell {currentWord}</h1>
                <div className={styles.gamesResultsLettersOverview}>
                    {currentWord.split('').map((letter, index) => (
                        <div key={index} className={styles.gamesResultsLetterContainer}>
                            <img src="./WebcamPlaceholder.png" alt="webcam placeholder" />
                            <div className={styles.gamesStageLetterCorrect}>{letter}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.gamesResultsButtonContainer}>
                <button className="button" onClick={handleNextWord}>Next</button>
            </div>
        </div>
    );
}

Results.propTypes = {
    setMode: PropTypes.func.isRequired
}

export default Results