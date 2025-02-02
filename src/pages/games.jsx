import { useState } from "react"
import { useNavigate } from "react-router"
import Header from "../components/header"
import Dialogue from "../components/dialogue"
import GamesMenu from "../components/games/gameMenu"
import GamesInstructions from "../components/games/gameInstructions"
import GamesStage from "../components/games/gameStage"
import GamesResults from "../components/games/gameResults"
import GamesEnd from "../components/games/gameEnd"

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
            {promptMsg && <Dialogue {...dialogueProps}/>}
            {gameMode == 'menu' && <GamesMenu setMode={setGameMode}/>}
            {gameMode == 'instructions' && <GamesInstructions setMode={setGameMode}/>}
            {gameMode == 'stage' && <GamesStage setMode={setGameMode}/>}
            {gameMode == 'results' && <GamesResults setMode={setGameMode}/>}
            {gameMode == 'end' && <GamesEnd setMode={setGameMode}/>}
        </>

    )
}
