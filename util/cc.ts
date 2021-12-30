// Author: John Lynch.
// This is taken from Orbyt Inc.

type ClassName = string | undefined | null | boolean
type Styles = { [key: string]: string }

// dw about highlighting, this is syntactically valid
export default function cc(styles: Styles, ...list: ClassName[]): string
export default function cc(...list: ClassName[]): string
export default function cc(styles: Styles | ClassName, ...list: ClassName[]): string {
    const doConvertStyles = isValidStylesObject(styles)
    if (!doConvertStyles) list.push(styles as ClassName)

    let filtered = list.filter((i) => !!i)

    // split up "class1 class2" into "class1" and "class2"
    // ts gets very upset about flatmap for some reason here
    if (doConvertStyles)
        filtered = filtered.map((c) => (typeof c === 'string' ? c.split(' ') : c)).flat()

    // preserve raw, or convert styles if requested. then, join all the classes into a string
    return filtered
        .map((s) =>
            isRaw(s)
                ? s.substring(1)
                : doConvertStyles
                ? (styles as Styles)[s!.toString()] || s
                : s,
        )
        .join(' ')
}

function isRaw(s: ClassName): s is string {
    return typeof s == 'string' && s?.startsWith('!')
}

function isValidStylesObject(styles: { [key: string]: string } | any): styles is Styles {
    if (typeof styles != 'object') return false
    for (let key in styles)
        if (typeof styles[key] !== 'string' && typeof styles[key] !== 'function') return false
    return true
}

/**
 * Raw class utility. Use the given class string directly. Don't convert with style[s]
 * @param style
 */
export function r(style: string | undefined) {
    if (style === undefined) return undefined
    return `!${style}`
}

export function createStylesObject(styles: { [key: string]: any }) {
    styles.cc = (...s: string[]) => cc(styles, ...s)
    return styles
}
