
import type { ColumnHorizontalAlignment, ColumnVerticalArrangement, RowHorizontalArrangement, RowVerticalAlignment } from "../../model/componentTypes";

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

export const getColHorizontalArrangement = (value: ColumnHorizontalAlignment) => {
    switch (value) {
        case "start":
            return "flex-start"
        case "center":
            return "center"
        case "end":
            return "flex-end"
        default:
            return ""
    }
}

export const getColVerticalAlignment = (value: ColumnVerticalArrangement) => {
    switch (value) {
        case "top":
            return "start"
        case "center":
            return "center"
        case "bottom":
            return "end"
        case "spaceBetween":
            return "space-between"
        case "spaceAround":
            return "space-around"
        case "spaceEvenly":
            return "space-evenly"
        default:
            return ""
    }
}

export const getRowHorizontalArrangement = (value: RowHorizontalArrangement) => {
    switch (value) {
        case "start":
            return "flex-start"
        case "center":
            return "center"
        case "end":
            return "flex-end"
        case "spaceBetween":
            return "space-between"
        case "spaceAround":
            return "space-around"
        case "spaceEvenly":
            return "space-evenly"
        default:
            return ""
    }
}

export const getRowVerticalAlignment = (value: RowVerticalAlignment) => {
    switch (value) {
        case "top":
            return "start"
        case "center":
            return "center"
        case "bottom":
            return "end"
        default:
            return ""
    }
}