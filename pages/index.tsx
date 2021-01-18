import styles from 'styles/Home.module.scss'
import { Header } from 'components/Header'
import { FlairText } from 'components/FlairText'
import { Flair, InternalLinks } from 'config/config'
import SiteWrapper from 'components/SiteWrapper'
import { Button } from 'components/Button'
import { GitHub } from 'react-feather'

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
                If you're into writing as much as I am, then you should check out{' '}
                <FlairText flair={Flair.Blog}>my blog</FlairText>. I'd also recommend my list of{' '}
                <FlairText flair={Flair.Projects}>projects</FlairText>, if you've liked to read
                about what I've worked on over the years.
            </p>

            <Button text={'GitHub'} link={'https://github.com'} />
        </div>
    )

    const rightColumn = (
        <div className={`${styles.column} ${styles.imageContainer}`}>
            <img src="/me.JPG" className={styles.meImage} />
        </div>
    )

    return (
        <SiteWrapper>
            <div className={styles.container}>
                <Header />

                <div className={styles.content}>
                    {leftColumn}
                    {rightColumn}
                </div>
            </div>
        </SiteWrapper>
    )
}

export default Home
