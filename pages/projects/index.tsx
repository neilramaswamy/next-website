import { Header } from 'components/Header'
import { PostPreview } from 'components/PostPreview'
import { frontMatter as blogPosts } from './**.mdx'
import { PreviewContainer } from 'components/PreviewContainer'

const Blog = (): JSX.Element => {
    return (
        <div>
            <Header />

            <PreviewContainer postFrontMatter={blogPosts} />
        </div>
    )
}

export default Blog
