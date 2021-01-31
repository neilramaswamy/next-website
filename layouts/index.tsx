import { Header } from 'components/Header'
import { PropsWithChildren } from 'react'
import styles from './index.module.scss'

interface Props {
    frontMatter: MdxEnhanced.FrontMatter
}

const PostLayout = (props: PropsWithChildren<Props>): JSX.Element => {
    const { children, frontMatter } = props
    const { title, author, description } = frontMatter

    return (
        <div>
            {/* TODO: Put the title/author/description in some meta tags to help with SEO */}
            <Header />

            <div className={styles.metaContainer}>
                <h2 className={styles.title}>{title}</h2>
                <h5 className={styles.author}>{author}</h5>
            </div>
            {children}
        </div>
    )
}

export default PostLayout
