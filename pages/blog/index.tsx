import SiteWrapper from 'components/SiteWrapper'
import { Header } from 'components/Header'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
// import * as foobarFrontMatter from './foobar.mdx'

const BlogLanding = (foobar: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
    console.log('hello there', foobar)
    return (
        <SiteWrapper>
            <Header />

            <div>this is the page for every single blog entry</div>
        </SiteWrapper>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: { posts: ['abc', 'def'] },
    }
}

export default BlogLanding
