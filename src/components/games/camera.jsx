import styles from './camera.module.css'

function Camera() {
    return (
        <div className={styles.cameraWebcam}>
            <div className={styles.cameraSquare}>
                <img src='./WebcamPlaceholder.png' alt="webcam placeholder image" style={{width: "380px", height: "340px"}}></img>
            </div>
        </div>
    )
}

export default Camera