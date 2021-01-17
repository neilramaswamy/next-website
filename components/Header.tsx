enum Page {
    About,
    Projects,
    Blog,
}

interface Props {
    activePage: Page
}

export const Header = (props: Props): JSX.Element => {
    const { activePage } = props

    return <div>{`active page is ${activePage}`}</div>
}
