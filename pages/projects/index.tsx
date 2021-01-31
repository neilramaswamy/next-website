import { Header } from 'components/Header'
import { PreviewContainer } from 'components/PreviewContainer'
import { frontMatter as projectPosts } from './**.mdx'

const Projects = (): JSX.Element => {
    return (
        <div>
            <Header />

            <PreviewContainer postFrontMatter={projectPosts} />
        </div>
    )
}

export default Projects
