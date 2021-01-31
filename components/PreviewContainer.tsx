import styles from './PreviewContainer.module.scss'
import { PostPreview } from './PostPreview'

interface Props {
    postFrontMatter: MdxEnhanced.FrontMatter[]
}

export const PreviewContainer = (props: Props): JSX.Element => {
    const { postFrontMatter } = props
    return (
        <div className={styles.container}>
            {postFrontMatter.map((frontMatter) => (
                <PostPreview key={frontMatter.__resourcePath} frontMatter={frontMatter} />
            ))}
        </div>
    )
}
