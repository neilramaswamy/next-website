export const isLinkQualified = (link: string): boolean => {
    return !!/https?:\/\/.*/.exec(link)
}
