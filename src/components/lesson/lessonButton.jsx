import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import PropTypes from 'prop-types';
import styles from './lessonButton.module.css'

export default function LessonButton({letter, done, onClick}) {
    return(
        <button className={done ? styles.buttonDone : styles.buttonNotDone} onClick={onClick}>
            <span className={styles.letter}>{letter}</span>
            {done && <IoMdCheckmarkCircleOutline className={styles.checkmarkIcon} />} 
        </button>
    )
}

LessonButton.propTypes = {
    letter: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}