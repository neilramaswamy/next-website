import { NavLink } from 'config/config'

export const isLinkQualified = (link: NavLink): boolean => {
    return !!/https?:\/\/.*/.exec(link)
}
