import React from "react";
import PropTypes from 'prop-types'
import Cam from '../cam'
import { useParams } from "react-router-dom";
import styles from './lessonContent.module.css'

export default function LessonContent({setMode}) {
    const { letter } = useParams(); 
  
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Sign '{letter}'</h1>

            <Cam />
        </div>
    );
}

LessonContent.propTypes = {
    setMode: PropTypes.func.isRequired
}