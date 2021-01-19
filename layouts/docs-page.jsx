// This function must be named otherwise it disables Fast Refresh.
export default function DocsPage({ children, frontMatter }) {
    // React hooks, for example `useState` or `useEffect`, go here.
    return (
        <div>
            <h1>{frontMatter.title}</h1>
            {children}
        </div>
    )
}
