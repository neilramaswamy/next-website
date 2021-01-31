import styles from './PostPreview.module.scss'
import { GenericLink } from './GenericLink'

interface Props {
    frontMatter: MdxEnhanced.FrontMatter
}

export const PostPreview = (props: Props): JSX.Element => {
    const { frontMatter } = props
    const { title, description, gradient, __resourcePath } = frontMatter

    if (!__resourcePath) {
        return <></>
    }

    let style: React.CSSProperties = {}
    if (gradient) {
        const colors = gradient.split(',')
        if (colors.length === 2) {
            style.backgroundImage = `linear-gradient(120deg, ${colors[0]} 0%, ${colors[1]} 100%)`
        }
    }

    return (
        <GenericLink link={__resourcePath} className={styles.container} style={style}>
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
