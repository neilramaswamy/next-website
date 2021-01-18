// Fixed!
import { animated } from 'react-spring'
import { useBoop } from '../util/useBoop'
import { ArrowRight } from 'react-feather'
import { InternalLinks } from '../config/config'
import styles from './Button.module.scss'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface Props {
    text: string
    // Only unqualified URLs will result in internal redirects.
    link: string
}

export const Button = (props: Props): JSX.Element => {
    const { text, link } = props

    const router = useRouter()
    const [style, trigger] = useBoop({ x: 3 })

    return (
        <Link href={InternalLinks.Blog}>
            <button className={styles.button} /*onMouseEnter={() => trigger()} */>
                {text}
                {/* <animated.div className={styles.iconContainer} style={style}>
                <ArrowRight />
            </animated.div> */}
            </button>
        </Link>
    )
}
