import PropTypes from 'prop-types'
import styles from './gameEnd.module.css'
import { RxCross2 } from "react-icons/rx";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from 'react-router'

function GamesEnd({ setMode }) {
    const navigate = useNavigate()
    const handleEndGame = () => navigate('/')
    const handleNextLevel = () => setMode('stage')


    return (
        <div className={styles.gamesEndOverview}>
            <img src='./gameEnd.png' alt="game end picture"></img>
            <p className={styles.gamesEndText}>
                Brilliant work! You're signing your way to greatness!
            </p>

            <div className={styles.gamesEndButtonsContainer}>
                <button className='button' onClick={handleEndGame}>
                    <RxCross2 />Quit Game
                </button>

                <button className='button' onClick={handleNextLevel}>
                    <MdOutlineKeyboardArrowRight />Next Level
                </button>
            </div>

        </div>
    )


}

GamesEnd.propTypes = {
    setMode: PropTypes.func.isRequired
}

export default GamesEnd