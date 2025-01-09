import PropTypes from 'prop-types'
import styles from './quizMenu.module.css'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import '@material/web/button/filled-button.js'

function QuizMenu({setMode}) {
    const handleStartQuiz = () => setMode('quiz')
    return (
        <div className={styles.quizMenu}>
            <h1 className={styles.quizMenuHeader}>Quiz</h1>
            <div className={styles.quizMenuContent}>
                <h3 className={styles.quizMenuSubheading}>How to Play</h3>
                <div className={styles.quizMenuSteps}>
                    <ol type='1'>
                        <li>A letter will appear on the screen.</li>
                        <li>Sign the letter using your hands within 30 seconds.</li>
                        <li>Your webcam will track your sign and provide instant feedback.</li>
                    </ol>
                </div>
                <p>Ready to Begin? Let’s Test Your Skills!</p>
            </div>
            <div className={styles.quizMenuButtonContainer}>
                <button className='button' onClick={handleStartQuiz}>
                    <MdOutlineKeyboardArrowRight/>Start Quiz
                </button>
            </div>
        </div>
    )
}

QuizMenu.propTypes = {
  setMode: PropTypes.func.isRequired
}

export default QuizMenu