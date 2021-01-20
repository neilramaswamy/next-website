import '../styles/globals.css'
import SiteWrapper from '../components/SiteWrapper'

function MyApp({ Component, pageProps }) {
    return (
        <SiteWrapper>
            <Component {...pageProps} />
        </SiteWrapper>
    )
}

export default MyApp
