import PropTypes from 'prop-types'
import styles from './gameResults.module.css'

function GamesResults({ setMode }) {
    const handleStartGame = () => setMode('end')

    return (
        <div className={styles.gamesResultsWithButton}>
            <div className={styles.gamesResultsOverview}>

                <h1 className={styles.gamesResultsHeader}>
                    Spell HELLO
                </h1>

                <div className={styles.gamesResultsLettersOverview}>
                    <div className={styles.gamesResultsLetterContainer}>
                        <img src='./WebcamPlaceholder.png' alt="webcam placeholder image"></img>
                        <div className={styles.gamesResultsLetter}>H</div>
                    </div>

                    <div className={styles.gamesResultsLetterContainer}>
                        <img src='./WebcamPlaceholder.png' alt="webcam placeholder image"></img>
                        <div className={styles.gamesResultsLetter}>E</div>
                    </div>

                    <div className={styles.gamesResultsLetterContainer}>
                        <img src='./WebcamPlaceholder.png' alt="webcam placeholder image"></img>
                        <div className={styles.gamesResultsLetter}>L</div>
                    </div>

                    <div className={styles.gamesResultsLetterContainer}>
                        <img src='./WebcamPlaceholder.png' alt="webcam placeholder image"></img>
                        <div className={styles.gamesResultsLetter}>L</div>
                    </div>

                    <div className={styles.gamesResultsLetterContainer}>
                        <img src='./WebcamPlaceholder.png' alt="webcam placeholder image"></img>
                        <div className={styles.gamesResultsLetter}>O</div>
                    </div>
                    
                    

                </div>
            </div>

            <div className={styles.gamesResultsButtonContainer}>
                <button className='button' onClick={handleStartGame}>
                    Next
                </button>
            </div>

        </div>
    )


}

GamesResults.propTypes = {
    setMode: PropTypes.func.isRequired
}

export default GamesResults