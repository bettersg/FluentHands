import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app.jsx'
import { BrowserRouter } from 'react-router'
import { IconContext } from "react-icons";

const reactIconContext = {
    className: 'reactIcons',
    style: { verticalAlign: 'middle' },
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <IconContext.Provider value={reactIconContext}>
                <App />
            </IconContext.Provider>
        </BrowserRouter>
    </StrictMode>,
)
