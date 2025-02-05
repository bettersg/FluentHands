import styles from './card.module.css'
import PropTypes from 'prop-types'

function Card({src, alt, difficulty, title, desc, click}) {
  return (
    <div className={styles.card} onClick={click}>
      <img className={styles.cardImg} src={src} alt={alt} />
      <div className={styles.cardBody}>
        <div className={styles.cardTag}>{difficulty}</div>
        <h2 className={styles.cardTitle}>{title}</h2>
        <p className={styles.cardDesc}>{desc}</p>
      </div>
    </div>
  )
}

Card.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  click: PropTypes.func
}

export default Card