import PropTypes from 'prop-types'
import styles from './gameInstructions.module.css'
import Cam from '../cam'



function GamesInstructions({ setMode }) {
    const handleStartGame = () => setMode('stage')

    const evaluateCallback = (correct) => {
    };

    return (
        <div>

            <div className={styles.gamesInstructionsOverview}>

                <div className={styles.gamesInstructionsMenu}>
                    <h1 className={styles.gamesInstructionsHeader}>
                        How to play
                    </h1>

                    <ol className={styles.gamesInstructionsText}>
                        <li>Form words by fingerspelling the alphabets</li>
                        <br />
                        <li>If you get the letter correct, the box will turn green.</li>
                        <br />
                        <li>Your webcam will track your signs and give instant feedback.</li>
                    </ol>


                </div>

                <div className={styles.gamesInstructionsWebcamOverview}>
                    <p>
                        Place your hand in the box (your webcam), so it is visible on screen.
                        Click anywhere to start.
                    </p>

                    <div className={styles.cameraWebcam}>
                        <Cam
                            capturing={true}
                            evaluateCallback={evaluateCallback}
                            withHint={true}
                        />
                    </div>


                    <div className={styles.gamesMenuButtonContainer}>
                        <button className='button' onClick={handleStartGame}>
                            Start Game
                        </button>
                    </div>

                </div>

            </div>




        </div >


    )



}

GamesInstructions.propTypes = {
    setMode: PropTypes.func.isRequired
}



export default GamesInstructions