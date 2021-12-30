import React from 'react'
import styles from './Center.module.scss'

export const Center = (props: React.PropsWithChildren<{}>): JSX.Element => {
    return <div className={styles.container}>{props.children}</div>
}
