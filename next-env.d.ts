/// <reference types="next" />
/// <reference types="next/types/global" />

// Looks like next-mdx-enhanced uses GreyMatter, but doesn't include Type definitions.
// We'll put those here for now, even though I think in the future we might want to consider a
// better place for auxiliary type definitions.
declare namespace MdxEnhanced {
    interface FrontMatter { 
        title?: string, 
        description?: string, 
        author?: string, 
        __resourcePath?: string 
    }
}

declare module '*.mdx' {
    const frontMatter: MdxEnhanced.FrontMatter[]

    export frontMatter
}