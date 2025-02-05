import PropTypes from 'prop-types'
import styles from './gameEnd.module.css'
import { RxCross2 } from "react-icons/rx";
import { IoMdRefresh } from "react-icons/io";
import { useNavigate } from 'react-router'

export default function GamesEnd({ setMode }) {
    const navigate = useNavigate()
    const handleRestartGame = () => setMode('stage')
    const handleEndGame = () => navigate('/')


    return (
        <div className={styles.gamesEndOverview}>
            <img src="./complete.svg" alt="girl standing proudly and pointing to herself" />
            <p className={styles.gamesEndText}>
                Brilliant work! You&apos;re signing your way to greatness!
            </p>

            <div className={styles.gamesEndButtonsContainer}>
                <button className='button' onClick={handleRestartGame}> 
                    <IoMdRefresh/> Try again
                </button>
                <button className='button' onClick={handleEndGame}>
                    <RxCross2 /> Back to homepage
                </button>
            </div>
        </div>
    )
}

GamesEnd.propTypes = {
    setMode: PropTypes.func.isRequired
}
