import { InternalLinks } from 'config/config'
import { useRouter } from 'next/router'

const Zoom = (): JSX.Element => {
    const router = useRouter()
    const zoomLink = process.env['ZOOM_LINK']

    zoomLink ? router.push(zoomLink) : router.push(InternalLinks.Home)

    return <></>
}

export default Zoom
