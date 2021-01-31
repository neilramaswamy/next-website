import { Header } from 'components/Header'
import { PreviewContainer } from 'components/PreviewContainer'
import { frontMatter as blogPosts } from './**.mdx'

const Blog = (): JSX.Element => {
    return (
        <div>
            <Header />

            <PreviewContainer postFrontMatter={blogPosts} />
        </div>
    )
}

export default Blog
