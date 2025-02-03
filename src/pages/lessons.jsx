import React, { useState, useEffect } from 'react'
import Header from "../components/header"
import LessonMenu from '../components/lesson/lessonMenu'
import LessonContent from '../components/lesson/lessonContent';
import LessonResult from '../components/lesson/lessonResult';
import { Routes, Route, useNavigate } from "react-router-dom";

export default function Lessons() {
  const navigate = useNavigate();
  const [lessonMode, setLessonMode] = useState('menu');

  useEffect(() => {
    if (lessonMode === 'menu') {
      navigate('/lessons/', { replace: true });
    }
  }, [lessonMode, navigate]);

  return (
    <>
      <Header/>
      {lessonMode === 'menu' && <LessonMenu setMode={setLessonMode} />}
      <Routes>
        {lessonMode === 'lesson' && (
          <Route path="/:letter" element={<LessonContent setMode={setLessonMode} />} />
        )}
      </Routes>
      {lessonMode === 'end' && <LessonResult setMode={setLessonMode}/>}
    </>
  )
}