// Fixed!
import { animated } from 'react-spring'
import { useBoop } from '../util/useBoop'
import { ArrowRight } from 'react-feather'
import { Routes } from '../config/config'
import styles from './Button.module.scss'

interface Props {
    text: string
    // icon: Icon

    // onAction:
    //     | {
    //           type: 'js'
    //           onClick: () => void
    //       }
    //     | {
    //           type: 'link'
    //           url: Routes
    //       }
}

export const Button = (props: Props): JSX.Element => {
    const { text } = props
    const [style, trigger] = useBoop({ x: 3 })

    return (
        <button className={styles.button} onMouseEnter={trigger}>
            {text}
            <animated.div className={styles.iconContainer} style={style}>
                <ArrowRight />
            </animated.div>
        </button>
    )
}
