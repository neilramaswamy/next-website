import { Flair, FlairToLink } from 'config/config'
import Link from 'next/link'
import { isLinkQualified } from 'util/isLinkQualified'
import styles from './FlairText.module.scss'
import { GenericLink } from './GenericLink'

interface Props {
    flair: Flair
}

export const FlairText = (props: React.PropsWithChildren<Props>): JSX.Element => {
    const { children, flair } = props

    const link = FlairToLink[flair]

    return (
        <GenericLink link={link}>
            <span className={`${styles.text} ${styles[flair]}`}>{children}</span>
        </GenericLink>
    )
}
