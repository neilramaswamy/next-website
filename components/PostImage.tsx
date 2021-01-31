import styles from './PostImage.module.scss'

type Props = JSX.IntrinsicElements['img']

export const PostImage = (props: Props): JSX.Element => {
    const { className, ...passThrough } = props

    return (
        <div className={styles.container}>
            <img className={`${className} ${styles.image}`} {...passThrough} />
        </div>
    )
}
