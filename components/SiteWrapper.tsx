import { PropsWithChildren } from 'react'
import styles from './SiteWrapper.module.scss'

const SiteWrapper = (props: PropsWithChildren<unknown>): JSX.Element => {
    return <div className={styles.container}>{props.children}</div>
}

export default SiteWrapper
