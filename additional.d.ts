declare namespace MdxEnhanced {
    interface FrontMatter {
        title?: string
        description?: string
        author?: string
        gradient?: string
        __resourcePath?: string
    }
}

declare module '*.mdx' {
    const frontMatter: MdxEnhanced.FrontMatter[]
    export { frontMatter }
}
