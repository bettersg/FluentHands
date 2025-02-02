import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app.jsx'
import { BrowserRouter } from 'react-router'
import { IconContext } from "react-icons";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const reactIconContext = {
    className: 'reactIcons',
    style: { verticalAlign: 'middle' },
}
const firebaseConfig = {
    apiKey: "AIzaSyCJefQ2Ct7fzjUIywRRnYex-daYHeMnO_Y",
    authDomain: "furious-sign-racer.firebaseapp.com",
    projectId: "furious-sign-racer",
    storageBucket: "furious-sign-racer.firebasestorage.app",
    messagingSenderId: "492590728056",
    appId: "1:492590728056:web:2e64a979b9dc86064cfe8d",
    measurementId: "G-J0H5NSH27N"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <IconContext.Provider value={reactIconContext}>
                <App />
            </IconContext.Provider>
        </BrowserRouter>
    </StrictMode>,
)
