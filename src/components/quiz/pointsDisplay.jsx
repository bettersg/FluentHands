import PropTypes from 'prop-types';
import styles from './pointsDisplay.module.css'
// import { MdOutlineStarOutline, MdStar } from "react-icons/md";

export default function PointsDisplay({points}) {

    return (
        <div className={styles.pointsDisplay}>

            <div className={styles.text}>
                <span>Total score: </span>
                <span>{points}</span>
            </div>
        </div>
    )
}

PointsDisplay.propTypes = {
    points: PropTypes.number.isRequired,
    maxPoints: PropTypes.number.isRequired
}