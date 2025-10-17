import type { Size, Padding } from "../../../../shared/model/types"

const n = (v?: number) => v ?? 0;

export const calculateSize = (
    size?: string,
    padding1?: number,
    padding2?: number,
    margin1?: number,
    margin2?: number,
    isAuto = false) => {

    if (size === "wrap_content") {
        if (isAuto)
            return "auto";
        return "fit-content"
    }
    else if (size === "match_parent") {
        return `calc(100% - ${n(padding1) + n(padding2) + n(margin1) + n(margin2)}px)`
    }
    else {
        return `calc(${size}px - ${n(padding1) + n(padding2)}px)`
    }

}
