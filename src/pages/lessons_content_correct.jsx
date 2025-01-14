import React, { useState } from 'react'
import styles from '../components/lessonContentCorrect.module.css'

export default function LessonsCorrect() {
    return (
        <div>
            <div className={styles.back-box}>
                <div className={styles.front-box}>
                </div>
            </div>
            <button className={styles.next-button}>next</button>
        </div>
    );
}