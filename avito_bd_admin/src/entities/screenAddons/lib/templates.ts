import { createColumn } from "../../../features/ComponentLibrary/lib/templates";
import { genId, withDefaults } from "../../../shared/lib/merge";
import type { BottomSheetComponent, SnackbarComponent } from "../model/screenAddonsTypes";
import { addonsDefaults } from "./constants";

export const createSnackbar = (): SnackbarComponent => {
    const base: SnackbarComponent = {
        type: "snackbar",
        _id: genId("snackbar"),
        text: "Message sent",
        actionText: undefined,
        duration: 3000,
    };
    return base;
};

export const createBottomSheet = (): BottomSheetComponent => {
    const base: BottomSheetComponent = {
        _id: genId("bottomSheet"),
        type: "bottomSheet",
        dismissible: false,
        children: [createColumn()],
    };
    return base;
}