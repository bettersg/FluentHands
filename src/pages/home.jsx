import { useNavigate } from "react-router";
import Card from "../components/card";
import styles from './home.module.css';
import { logEvent } from "firebase/analytics";
import { analytics } from "../main";

export default function Home() {
    const navigate = useNavigate()
    const heroDescText = 'Strengthen your Singapore Sign Language skills through interactive learning. Whether you&#39;re just starting or looking to test your knowledge, we have the perfect options for you'
    const cardContents = [
        {
            src: './lessons.svg',
            alt: 'woman holding a pen in a virtual conference call ',
            title: 'Lessons (Easy)',
            desc: 'Get started with the basics!',
            click: () => {
                navigate('/lessons')
                logEvent(analytics, 'select_content', {content_type: 'lessons'})
            }

        },
        {
            src: './quiz.svg',
            alt: 'woman clicking on a website start button, launching a rocket',
            title: 'Quiz (Medium)',
            desc: 'Challenge yourself with our interactive quiz!',
            click: () => {
                navigate('/quiz')
                logEvent(analytics, 'select_content', {content_type: 'quiz'})
            }
        },
        {
            src: './games.svg',
            alt: 'boy sitting on a chair playing a video game',
            title: 'Games (Hard)',
            desc: 'Put your SGSL skills to the test!',
            click: () => {
                navigate('/games')
                logEvent(analytics, 'select_content', {content_type: 'quiz'})
            }
        }
    ]
    return (
        <div className={styles.home}>
            <div className={styles.hero}>
                <h1 className={styles.heroTitle}>FluentHands</h1>
                <p className={styles.heroDesc}>
                    {heroDescText}
                </p>
            </div>
            <div className={styles.cardGroup}>
                {
                    cardContents.map((cardContent, index) =>
                        <Card key={index} {...cardContent} />)
                }
            </div>
        </div>
    )
}