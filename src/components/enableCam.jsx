import PropTypes from 'prop-types'
import Dialogue from './dialogue'
import { IoMdCamera } from 'react-icons/io'

export default function EnableCam({desc, enableHandler, denyHandler}) {
    const dialogueProps = {
        title: 'Enable Permissions',
        desc: desc,
        left: 'Enable',
        right: 'Deny',
        leftHandler: enableHandler,
        rightHandler: denyHandler
    }
    return (
        <Dialogue {...dialogueProps}>
            <div style={{width: '72px', height: '72px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <IoMdCamera color='var(--color-primary)' size='32px'/>
            </div>
        </Dialogue>
    )
}

EnableCam.propTypes = {
    desc: PropTypes.string.isRequired,
    enableHandler: PropTypes.func.isRequired,
    denyHandler: PropTypes.func.isRequired,
}