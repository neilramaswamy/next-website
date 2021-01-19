import styles from './Blurb.module.scss'

interface Props {
    title: string
}

export const Blurb = (props: Props): JSX.Element => {
    const { title } = props

    return (
        <div className={styles.container}>
            <h2>{title}</h2>
        </div>
    )
}
