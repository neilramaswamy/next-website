import { HTMLProps } from 'react'
import styles from './PostImage.module.scss'

interface Props extends HTMLProps<HTMLImageElement> {}

export const PostImage = (props: Props): JSX.Element => {
    const { className, ...passThrough } = props

    return (
        <div className={styles.container}>
            <img className={`${className} ${styles.image}`} {...passThrough} />
        </div>
    )
}
