import PropTypes from 'prop-types'
import styles from './dialogue.module.css'
import { IoMdClose } from "react-icons/io";

export default function Dialogue({title='', children=null, desc='', left, right, leftHandler, rightHandler, withModal=false}) {
    return (
        <div className={styles.dialogueContainer}>
            {withModal && <div className={styles.modal}></div>}
            <div className={styles.dialogue}>
                <div className={styles.text}>
                    {title && <h1 className={styles.title}>{title}<IoMdClose/></h1>}
                    {children}
                    {desc && <h3 className={styles.desc}>{desc}</h3>}
                </div>
                <div className={styles.btnContainer}>
                    <button className={styles.btnLeft} onClick={leftHandler}>
                        {left}
                    </button>
                    <button className={styles.btnRight} onClick={rightHandler}>
                        {right}
                    </button>
                </div>
            </div>
        </div>
    )
}

Dialogue.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element,
    desc: PropTypes.string,
    left: PropTypes.string.isRequired,
    right: PropTypes.string.isRequired,
    leftHandler: PropTypes.func.isRequired,
    rightHandler: PropTypes.func.isRequired,
    withModal: PropTypes.bool
}