import PropTypes from 'prop-types';
import styles from './pointsDisplay.module.css'
// import { MdOutlineStarOutline, MdStar } from "react-icons/md";

export default function PointsDisplay({points, maxPoints}) {
    // const threshold1 = maxPoints / 3
    // const threshold2 = maxPoints * 2/3
    return (
        <div className={styles.pointsDisplay}>
            {/* <div className={styles.graphic}>
                <div className={styles.filled}>
                    {points >= threshold1 && <MdStar size='80px'/>}
                    {points >= threshold2 && <MdStar size='80px'/>}
                    {points >= maxPoints && <MdStar  size='80px'/>}
                </div>
                <div className={styles.outlined}>
                    <MdOutlineStarOutline size='80px'/>
                    <MdOutlineStarOutline size='80px'/>
                    <MdOutlineStarOutline size='80px'/>
                </div>
            </div> */}
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