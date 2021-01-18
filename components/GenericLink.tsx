import Link, { LinkProps } from 'next/link'
import { NavLink } from 'config/config'
import { isLinkQualified } from 'util/isLinkQualified'

interface Props {
    link: NavLink

    linkProps?: LinkProps
    anchorProps?: React.HTMLProps<HTMLAnchorElement>
}

// Next Links don't support new tabs out of the box, so we'll bake that into our own component.
export const GenericLink = (props: PropsWithChildren<Props>): JSX.Element => {
    const { link, linkProps, anchorProps, children } = props

    const isQualified = isLinkQualified(link)
    const anchorTarget = isQualified ? '_blank' : ''

    return (
        <Link {...linkProps} href={link}>
            <a target={anchorTarget} {...anchorProps} href={link}>
                {children}
            </a>
        </Link>
    )
}
