import { CodeBlock as CB } from 'react-code-blocks'
import styles from './CodeBlock.module.scss'

export const CodeBlock = (props: any): JSX.Element => {
    return (
        <div className={styles.container}>
            <CB {...props} />
        </div>
    )
}
