import { useEffect, useState } from "react";

export default function useCamEnabled() {
    const [camEnabled, setCamEnabled] = useState(false)
    useEffect(() => {
        const cameraPermissions = navigator.permissions.query( { name: 'camera' } );
        cameraPermissions.onchange = setCamEnabled(checkCamEnabled())
    },[])
    return camEnabled
}

async function checkCamEnabled() {
    if (!navigator.mediaDevices?.enumerateDevices) {
        console.log("enumerateDevices() not supported.");
    } else {
    navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
            for (let device of devices) {
                if (device.kind == 'videoinput') {
                    console.log('detected')
                    return true
                }
            }
            return false
        })
        .catch((err) => {
            console.error(`${err.name}: ${err.message}`);
        });
    }
}

export {checkCamEnabled}