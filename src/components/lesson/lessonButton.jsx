import styles from './lessonButton.module.css'

function LessonButton({letter, done, onClick}) {
    return(
        <button className={done ? styles.buttonDone : styles.buttonNotDone} onClick={onClick}>
            <span className={styles.letter}>{letter}</span>
        </button>
    )
}

export default LessonButton