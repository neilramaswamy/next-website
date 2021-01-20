import { Button } from 'components/Button'
import { FlairText } from 'components/FlairText'
import { Header } from 'components/Header'
import { Flair } from 'config/config'
import styles from 'styles/Home.module.scss'

const Home = (): JSX.Element => {
    const leftColumn = (
        <div className={`${styles.textContainer} ${styles.column}`}>
            <h1>
                Hi, web wanderer! <br /> I'm Neil.
            </h1>

            <p>
                I'm currently studying CS at{' '}
                <FlairText flair={Flair.BrownU}>Brown University</FlairText>, but I've taken many
                music and english classes. I'm also working on{' '}
                <FlairText flair={Flair.Orbyt}>Orbyt</FlairText>, the best way to manage your
                network.{' '}
            </p>

            <p>
                I'm still putting this site together, so you can check out my empty{' '}
                <FlairText flair={Flair.Blog}>blog</FlairText> if you don't like reading. I'll
                upload my writing there soon. I really recommend you don't check out the stuff over
                on <FlairText flair={Flair.Projects}>my projects page</FlairText>, as the content
                there is unstyled and intellectually vacuous (for now)!
            </p>
        </div>
    )

    const rightColumn = (
        <div className={`${styles.column} ${styles.imageContainer}`}>
            <img src="/me.JPG" className={styles.meImage} />
        </div>
    )

    return (
        <div className={styles.container}>
            <Header />

            <div className={styles.content}>
                {leftColumn}
                {rightColumn}
            </div>
        </div>
    )
}

export default Home
