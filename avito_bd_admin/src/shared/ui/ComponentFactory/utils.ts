import type { Size, Padding } from "../../model/types"

export const calculateWidth = (padding?: Padding) => {
    if (padding ) {
        if (padding.all) {
            return `calc(100% - ${padding.all * 2}px)`
        }
        if (padding?.start && padding?.end ){
        return `calc(100% - ${padding.start + padding.end}px)`
        }
    }
}


export const calculateHeight = (padding?: Padding) => {
    if (padding)
        if (padding.all) {
            return `calc(100% - ${padding.all * 2}px)`
        }
    if (padding?.top && padding?.bottom)
        return `calc(100% - ${padding.top + padding.bottom}px)`
}