import type { UIAddons } from "../model/screenAddonsTypes";

export const addonsDefaults: {
    [K in UIAddons["type"]]?: Partial<Extract<UIAddons, { type: K }>>
} = {
    snackbar: {
        text: "text",
        actionText: '',
        duration: 3000
    },
    bottomSheet: {
        dismissible: false,
    }
}