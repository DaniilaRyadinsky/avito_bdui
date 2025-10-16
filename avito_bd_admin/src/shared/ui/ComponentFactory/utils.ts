import type { Size, Padding } from "../../model/types"


export const calculateSize = (size?: string, padding1?: number, padding2?: number, isAuto = false) => {

    if (size === "wrap_content") {
        if (isAuto)
            return "auto";
        return "fit-content"
    }
    else if (size === "match_parent") {
        if (padding1 !== undefined && padding2 !== undefined) {
            console.log(`calc(100% - ${padding1 + padding2}px)`);
            return `calc(100% - ${padding1 + padding2}px)`
        }
        return "100%"
    }
    else {
        if (padding1 !== undefined && padding2 !== undefined)
            return `calc(${size}px - ${padding1 + padding2}px)`
        else return `${size}px`
    }

}
