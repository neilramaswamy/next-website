import { Button } from 'components/Button'
import { FlairText } from 'components/FlairText'
import { Header } from 'components/Header'
import { Flair } from 'config/config'
import styles from 'styles/Home.module.scss'
import React from 'react'
import cc from 'util/cc'

const Home = (): JSX.Element => {
    const [neilClicks, setNeilClicks] = React.useState(0)

    const leftColumn = (
        <div className={`${styles.textContainer} ${styles.column}`}>
            <h1>
                Hi, web wanderer! <br />{' '}
                <span
                    className={cc(styles, 'imNeil', neilClicks > 1 && 'ryansRequest')}
                    onClick={() => {
                        setNeilClicks(neilClicks + 1)
                    }}
                >
                    I'm Neil.
                </span>
            </h1>

            <p>
                I'm currently concentrating in CS at{' '}
                <FlairText flair={Flair.BrownU}>Brown</FlairText>, but I'm concurrently taking many
                English and Music classes. I'm also working on{' '}
                <FlairText flair={Flair.Orbyt}>Orbyt</FlairText>, the best way to stay connected to
                those in your network who matter most.{' '}
            </p>

            <p>
                I'm still putting this site together, but my{' '}
                <FlairText flair={Flair.Projects}>projects page</FlairText> has a few technical
                posts about some of my favorite projects. I'll be putting any of my other writing on
                my <FlairText flair={Flair.Blog}>blog</FlairText>, which is sparse now, but it won't
                be for long!
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
