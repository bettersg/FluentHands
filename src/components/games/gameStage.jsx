import PropTypes from 'prop-types'
import styles from './gameStage.module.css'
import Camera from './camera'

function GamesStage({ setMode }) {
    const handleStartGame = () => setMode('results')

    return (
        <div className={styles.gamesStageWithButton}>
            <div className={styles.gamesStageOverview}>

                <h1 className={styles.gamesStageHeader}>
                    Spell HELLO
                </h1>

                <Camera></Camera>

                <div className={styles.gamesStageLettersOverview}>
                    <div className={styles.gamesStageLetterCorrect}>H</div>
                    <div className={styles.gamesStageLetterCorrect}>E</div>
                    <div className={styles.gamesStageLetterWrong}>E</div>
                    <div className={styles.gamesStageLetterEmpty}></div>
                    <div className={styles.gamesStageLetterEmpty}></div>
                </div>

            </div>


            <div className={styles.gamesStageButtonContainer}>
                <button className='button' onClick={handleStartGame}>
                    Skip
                </button>
            </div>

        </div>
    )


}

GamesStage.propTypes = {
    setMode: PropTypes.func.isRequired
}

export default GamesStage