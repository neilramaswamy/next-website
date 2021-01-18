import styles from './FlairText.module.scss'
import { Flair } from 'config/config'

interface Props {
    flair: Flair
}

export const FlairText = (props: React.PropsWithChildren<Props>): JSX.Element => {
    const { children, flair } = props
    return (
        <p className={`${styles.text} ${styles[flair]}`}>
            {children}
            {` `}
        </p>
    )
}
