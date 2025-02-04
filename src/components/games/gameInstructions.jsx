import PropTypes from 'prop-types'
import styles from './gameInstructions.module.css'
import { useState } from 'react';
import Cam from '../cam';



function GamesInstructions({ setMode }) {
    const [capturing, setCapturing] = useState(true)
    const handleStartGame = () => setMode('stage')

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
                        Place your hand in the orange box (your webcam), so it is visible on screen. <br/>
                        Click the start button.
                    </p>
                    <Cam
                        capturing={capturing}
                        setCapturing={setCapturing}
                        withHint={false}
                        useML={false}
                    />                 

                </div>

            </div>

            <div className={styles.gamesMenuButtonContainer}>
                <button className='button' onClick={handleStartGame}>
                    Start Game
                </button>
            </div>


        </div >

        
    )


    
}

GamesInstructions.propTypes = {
    setMode: PropTypes.func.isRequired
}



export default GamesInstructions