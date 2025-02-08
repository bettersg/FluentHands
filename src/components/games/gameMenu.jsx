import PropTypes from 'prop-types'
import styles from './gameMenu.module.css'
import { VscTriangleRight } from "react-icons/vsc";

function GamesMenu({ setMode }) {
    const handleStartGame = () => setMode('stage')

    return (
        <div className={styles.gamesMenuContainer}>
            <div className={styles.gamesMenu}>
                <img className={styles.gamesMenuImg} src='./gamesMenu.jpg' alt="image showing a burger reading Hamburger Spells"></img>
                <div className={styles.gamesMenuHeaderContainer}>
                    <h1 className={styles.gamesMenuHeader}>Word Spells</h1>
                    <h2 className={styles.gamesMenuSubheader}>Mini-game</h2>
                </div>
                <p className={styles.gamesMenuText}>In this game, you will be finger spelling letters to form a word! Have fun!
                </p>
                {/* <h1 className={styles.gamesInstructionsHeader}>Word spells</h1> */}
                <div className={styles.gamesInstructionsContent}>
                    <h3 className={styles.gamesInstructionsSubheading}>
                        How to play
                    </h3>
                    <ol className={styles.gamesInstructionsText}>
                        <li>Form words by fingerspelling the alphabets</li>
                        <br />
                        <li>If you get the letter correct, the box will turn green.</li>
                        <br />
                        <li>Your webcam will track your signs and give instant feedback.</li>
                    </ol>
                </div>
            </div>

            <div className={styles.gamesMenuButtonContainer}>
                <button className='button' onClick={handleStartGame}>
                    <VscTriangleRight />Play
                </button>
            </div>
        </div>
    )
}

GamesMenu.propTypes = {
    setMode: PropTypes.func.isRequired
}

export default GamesMenu