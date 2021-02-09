import React from 'react'

const Zoom = (): JSX.Element => {
    const zoomLink = process.env['ZOOM_LINK']

    React.useEffect(() => {
        if (zoomLink) {
            window.location.href = zoomLink
        }
    }, [])

    return zoomLink ? <p>You will be redirected shortly.</p> : <p>Oh no! No Zooming today :(</p>
}

export default Zoom
