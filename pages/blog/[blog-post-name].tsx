import { useRouter } from 'next/router'
import { DynamicRoutes } from 'config/config'

const BlogPost = (): JSX.Element => {
    const router = useRouter()
    const { [DynamicRoutes.BlogPostRoute]: blogPostName } = router.query

    return <div>{`this it the blog with ${blogPostName}`}</div>
}

export default BlogPost
