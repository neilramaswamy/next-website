import { NextPageContext, NextPage, NextComponentType } from 'next'
import { InternalLinks } from 'config/config'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
    Location: string
}

const Zoom: NextComponentType<NextPageContext, Props> = (props: Props): JSX.Element => {
    const { Location } = props
    const router = useRouter()

    React.useEffect(() => {
        router.push(Location)
    }, [])

    console.log(Location)
    return <p>You should be redirected shortly.</p>
}

Zoom.getInitialProps = (ctx: NextPageContext): Props => {
    const zoomLink = process.env['ZOOM_LINK']
    if (zoomLink) {
        return { Location: zoomLink }
    }

    return { Location: InternalLinks.Home }
}
export default Zoom
