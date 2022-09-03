import { NextPageContext, NextPage, NextComponentType } from 'next'
import { InternalLinks } from 'config/config'
import { useRouter } from 'next/router'
import React from 'react'

// TODO: Make this file Typescript!
const Zoom = (props) => {
    const { Location } = props
    // const router = useRouter()

    // React.useEffect(() => {
    //     router.push(Location)
    // }, [])

    return <p>You should be redirected shortly.</p>
}

// Zoom.getInitialProps = () => {
//     const zoomLink = process.env['ZOOM_LINK']
//     if (zoomLink) {
//         return { Location: zoomLink }
//     }

//     return { Location: InternalLinks.Home }
// }

export default Zoom
