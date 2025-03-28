import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from 'react-router'
import styles from './lessonResults.module.css'


export default function LessonResult() {
  const navigate = useNavigate()
  const handleBack = () => navigate('/')

  return (
    <div className={styles.resultsContainer}>
        <div className={styles.results}>
          <img src="./complete.svg" alt="girl standing proudly and pointing to herself" />
          <h3 className={styles.resultsPara}>Congratulations! You’re proving that practice makes perfect!</h3>
        </div>
        <div className={styles.btnContainer}>
            <button className='button' onClick={handleBack}> 
              <MdArrowForwardIos/> Back to homepage
            </button>
        </div>

    </div>
  )
}