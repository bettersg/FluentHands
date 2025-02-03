import PropTypes from 'prop-types'
import styles from './gameEnd.module.css'
import { MdArrowForwardIos } from "react-icons/md";
import { MdOutlineReplay } from "react-icons/md";
import { useNavigate } from 'react-router'

function GamesEnd({ setMode }) {
    const navigate = useNavigate()
    const handleEndGame = () => navigate('/')
    const handlePlayAgain = () => setMode('stage')


    return (
        <div className={styles.gamesEndOverview}>
            <img src='./quizComplete.svg' alt="game end picture"></img>
            <p className={styles.gamesEndText}>
                Brilliant work! You're signing your way to greatness!
            </p>

            <div className={styles.gamesEndButtonsContainer}>
                <button className='button' onClick={handleEndGame}>
                    <MdArrowForwardIos /> Back to homepage
                </button>

                <button className='button' onClick={handlePlayAgain}>
                    <MdOutlineReplay /> Play again
                </button>

            </div>

        </div>
    )


}

GamesEnd.propTypes = {
    setMode: PropTypes.func.isRequired
}

export default GamesEnd