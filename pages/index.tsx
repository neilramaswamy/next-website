import styles from 'styles/Home.module.scss'
import { Header } from 'components/Header'
import { FlairText } from 'components/FlairText'
import { Flair } from 'config/config'

const Home = (): JSX.Element => {
    const leftColumn = (
        <div className={`${styles.textContainer} ${styles.column}`}>
            <h1>
                Hi, web wanderer! <br /> I'm Neil.
            </h1>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id{' '}
                <FlairText flair={Flair.BrownU}>Brown University</FlairText>
                est, nec facilisis dui. Sed commodo urna, sit amet{' '}
                <FlairText flair={Flair.Orbyt}>Orbyt</FlairText> sem gravida eu.{' '}
            </p>

            <p>
                Curabitur sit amet <FlairText flair={Flair.Blog}>my blog</FlairText> augue, a
                rhoncus massa. Vestibulum risus nunc, scelerisque id dolor at, varius{' '}
                <FlairText flair={Flair.Projects}>projects</FlairText> enim. Duis ac consequat elit.
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
