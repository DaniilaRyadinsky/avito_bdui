import type { Size, Padding } from "../../model/types"

export const calculateWidth = (padding?: Padding) => {
    if (padding) {
        if (padding?.start && padding?.end) {
            return `calc(100% - ${padding.start + padding.end}px)`
        }
    }
}


export const calculateHeight = (padding?: Padding) => {
    if (padding)
        if (padding?.top && padding?.bottom)
            return `calc(100% - ${padding.top + padding.bottom}px)`
}

export const calculateSize = (size?: string, padding1?: number, padding2?: number) => {
    if (size === "wrap_content")
        return "fit-content"
    else if (size === "match_parent") {
        if (padding1 && padding2)
            return `calc(100% - ${padding1 + padding2}px)`
    }
    else
        return `${size}px`
}
