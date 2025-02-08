import { useState } from "react"
import { useNavigate } from "react-router"
import Header from "../components/header"
import Dialogue from "../components/dialogue"
import GamesMenu from "../components/games/gameMenu"
import GamesStage from "../components/games/gameStage"
import GamesEnd from "../components/games/gameEnd"
import { checkAllDone } from "../components/lesson/lessonContent"

export default function Games() {
    const navigate = useNavigate()
    const [promptMsg, setPromptMsg] = useState(true)
    const [gameMode, setGameMode] = useState('menu')

    const dialogueProps = {
        desc: 'Do you want to proceed with the quiz without going through the lessons first?',
        left: 'Proceed',
        right: 'Return',
        leftHandler: () => setPromptMsg(false),
        rightHandler: () => navigate('/'),
        withModal: true
    }


    return (
        <>
            <Header />
            {!checkAllDone() && promptMsg && <Dialogue {...dialogueProps}/>}
            {gameMode == 'menu' && <GamesMenu setMode={setGameMode}/>}
            {gameMode == 'stage' && <GamesStage setMode={setGameMode}/>}
            {gameMode == 'end' && <GamesEnd setMode={setGameMode}/>}
        </>

    )
}
