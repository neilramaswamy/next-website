const withMdxEnhanced = require('next-mdx-enhanced')

module.exports = withMdxEnhanced({
    layoutPath: 'layouts',
    defaultLayout: true,
    webpack5: false,
    fileExtensions: ['mdx'],
    remarkPlugins: [],
    rehypePlugins: [],
    usesSrc: false,
    extendFrontMatter: {
        process: (mdxContent, frontMatter) => {},
        phase: 'prebuild|loader|both',
    },
    reExportDataFetching: false,
})()
