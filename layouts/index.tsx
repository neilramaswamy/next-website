import { Header } from 'components/Header'

interface Props {
    // TODO: Refactor this out or get type definitions from the library?
    frontMatter: {
        title?: string
        author?: string
        description?: string
    }
}

const PostLayout = (props: PropsWithChildren<Props>): JSX.Element => {
    const { children, frontMatter } = props
    const { title, author } = frontMatter

    return (
        <div>
            {/* TODO: Put the title/author/description in some meta tags to help with SEO */}
            <Header />

            <h2>{title}</h2>
            <h5>{author}</h5>
            {children}
        </div>
    )
}

export default PostLayout
