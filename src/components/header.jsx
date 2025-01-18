import { useNavigate } from 'react-router'
import styles from './header.module.css'
import { MdArrowBack } from "react-icons/md";
export default function Header () {
    const navigate = useNavigate()
    const handleBack = () => navigate('/') 
    
    return (
        <div className={styles.header}>
            <button className={styles.backBtn} type='button' onClick={handleBack}>
                <MdArrowBack style={{color: 'var(--color-onsurface'}}/>Back
            </button>    
        </div>
    )
}