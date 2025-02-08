import PropTypes from 'prop-types'
import styles from './quizMenu.module.css'
import { VscTriangleRight } from 'react-icons/vsc';

function QuizMenu({setMode}) {
    const handleStartQuiz = () => setMode('play')
    return (
        <div className={styles.quizMenu}>
            <h1 className={styles.quizMenuHeader}>Quiz</h1>
            <div className={styles.quizMenuContent}>
                <h3 className={styles.quizMenuSubheading}>How to Play</h3>
                <br />
                <ol className={styles.quizMenuSteps} type='1'>
                    <li>A letter will appear on the screen.</li>
                    <br />
                    <li>Sign the letter using your hands within 1 min.</li>
                    <br />
                    <li>Your webcam will track your sign and provide instant feedback.</li>
                </ol>
                <br />
                <p>Ready to Begin? Let’s Test Your Skills!</p>
            </div>
            <div className={styles.quizMenuButtonContainer}>
                <button className='button' onClick={handleStartQuiz}>
                    <VscTriangleRight />Start Quiz
                </button>
            </div>
        </div>
    )
}

QuizMenu.propTypes = {
  setMode: PropTypes.func.isRequired
}

export default QuizMenu