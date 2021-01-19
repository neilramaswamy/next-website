import SiteWrapper from 'components/SiteWrapper'
import { Header } from 'components/Header'
import { frontMatter as blogPosts } from './**.mdx'
import { GenericLink } from 'components/GenericLink'

const Blog = (): JSX.Element => {
    return (
        <SiteWrapper>
            <Header />

            {blogPosts.map((post) => {
                if (!post.__resourcePath) {
                    return <></>
                }

                return (
                    <GenericLink link={post.__resourcePath}>
                        <h2>{post.title}</h2>
                    </GenericLink>
                )
            })}
        </SiteWrapper>
    )
}

export default Blog
