import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import './app.css'
import Home from './pages/home.jsx'
import Quiz from './pages/quiz.jsx'
import Lessons from './pages/lessons.jsx'
import Games from './pages/games.jsx'
import NotFound from './pages/notFound.jsx'

function App() {

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/quiz' element={<Quiz />} />
        <Route path='/lessons' element={<Lessons />} />
        <Route path='/games' element={<Games />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
