import PropTypes from 'prop-types'
import styles from './gameMenu.module.css'
import { VscTriangleRight } from "react-icons/vsc";

function GamesMenu({ setMode }) {
    const handleStartGame = () => setMode('instructions')

    return (
        <div>
            <div className={styles.gamesMenuWithButton}>
                <div className={styles.gamesMenu}>
                    <img src='./gamesMenu.png' alt="image showing a burger reading Hamburger Spells"></img>
                    <h1 className={styles.gamesMenuHeader}>Hamburger Spells</h1>
                    <h2 className={styles.gamesMenuSubheader}>Mini-game</h2>
                    <p className={styles.gamesMenuText}>In this game, you will be finger spelling the ingredients
                        needed to create a burger! Have fun!
                    </p>
                </div>

                <div className={styles.gamesMenuButtonContainer}>
                    <button className='button' onClick={handleStartGame}>
                        <VscTriangleRight />Play
                    </button>
                </div>

            </div>
        </div>
    )


}

GamesMenu.propTypes = {
    setMode: PropTypes.func.isRequired
}

export default GamesMenu