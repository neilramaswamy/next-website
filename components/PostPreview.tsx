import styles from './PostPreview.module.scss'
import { GenericLink } from './GenericLink'

interface Props {
    frontMatter: MdxEnhanced.FrontMatter
}

export const PostPreview = (props: Props): JSX.Element => {
    const { frontMatter } = props
    const { title, author, description, __resourcePath } = frontMatter

    if (!__resourcePath) {
        return <></>
    }

    return (
        <GenericLink link={__resourcePath} className={styles.container}>
            <div>
                <div className={styles.imageContainer} />

                <div className={styles.textWrapper}>
                    <h4 className={styles.title}>{title}</h4>
                    <h5 className={styles.description}>{description}</h5>
                </div>
            </div>
        </GenericLink>
    )
}
