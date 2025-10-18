import type { UIComponent } from "../../entities/components/model/componentTypes";
import type { UIScreen } from "../../entities/screen/model/screenTypes";
import type { SnackbarComponent } from "../../entities/screenAddons/model/screenAddonsTypes";

export const findInList = (list: UIComponent[] | undefined, id: string): UIComponent | null => {
    if (!list) return null;
    for (const comp of list) {
        if (comp._id === id) return comp;
        if ("children" in comp && comp.children?.length) {
            const found = findInList(comp.children, id);
            if (found) return found;
        }
    }
    return null;
};


const findInBottomSheets = (screen: UIScreen, id: string): UIComponent | null => {
    for (const bs of screen.bottomSheets ?? []) {
        const found = findInList(bs.children, id);
        if (found) return found;
    }
    return null;
};

export const findInSnackBars = (snackbars: SnackbarComponent[], id: string): SnackbarComponent | null => {
    if (!snackbars) return null;
    for (const sb of snackbars) {
        if (sb._id === id) {
            return sb;
        }
    }
    return null;
}

export const findComponentById = (screen: UIScreen | null | undefined, id: string | null): UIComponent | null => {
    if (!screen || !id) return null;
    return (
        findInList(screen.topBar, id) ||
        findInList(screen.content, id) ||
        findInList(screen.bottomBar, id) ||
        findInBottomSheets(screen, id) ||  
        null
    );
};