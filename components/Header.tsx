import styles from './Header.module.scss'
import Link from 'next/link'
import { InternalLinks } from 'config/config'

export const Header = (): JSX.Element => {
    const headerLinkContent = (text: string): JSX.Element => (
        <a>
            <h5 className={styles.headerLinkText}>{text}</h5>
        </a>
    )
    return (
        <header className={styles.container}>
            <div>{/* Logo goes here! */}</div>
            <section className={styles.linkContainer}>
                <Link href={InternalLinks.Home}>{headerLinkContent('About')}</Link>

                <Link href={InternalLinks.Projects}>{headerLinkContent('Projects')}</Link>

                <Link href={InternalLinks.Blog}>{headerLinkContent('Blog')}</Link>
            </section>
        </header>
    )
}
