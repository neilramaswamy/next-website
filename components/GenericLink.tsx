import Link, { LinkProps } from 'next/link'
import { NavLink } from 'config/config'
import { isLinkQualified } from 'util/isLinkQualified'
import { PropsWithChildren } from 'react'

interface Props {
    link: string

    linkProps?: LinkProps
    anchorProps?: React.HTMLProps<HTMLAnchorElement>

    // Courtesy prop (it is identical to linkProps.className)
    className?: string
}

// Next Links don't support new tabs out of the box, so we'll bake that into our own component.
export const GenericLink = (props: PropsWithChildren<Props>): JSX.Element => {
    const { link: _link, linkProps, anchorProps, className, children } = props

    const isQualified = isLinkQualified(_link)
    // Don't strip extensions on unqualified/outbound URLs... they're not yours to play with!
    const link = !isQualified ? stripMdxExtension(_link) : _link
    const anchorTarget = isQualified ? '_blank' : ''

    return (
        <Link {...linkProps} href={link}>
            <a target={anchorTarget} className={className} {...anchorProps} href={link}>
                {children}
            </a>
        </Link>
    )
}

// When we read all the content files for the project/blog, they come with file paths.
// But Next doesn't like that, and will 404 anything that ends with .mdx.
// Because all consumer components should be using GenericLinks, we'll do the cleaning here.
const stripMdxExtension = (link: string): string => {
    const mdxExtension = '.mdx'
    return link.endsWith(mdxExtension) ? link.substr(0, link.length - mdxExtension.length) : link
}
