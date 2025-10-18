import type { UIComponent } from "../../entities/components/model/componentTypes";
import type { UIScreen } from "../../entities/screen/model/screenTypes";

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

export const findComponentById = (screen: UIScreen | null | undefined, id: string | null): UIComponent | null => {
    if (!screen || !id) return null;
    return (
        findInList(screen.topBar, id) ||
        findInList(screen.content, id) ||
        findInList(screen.bottomBar, id) ||
        findInBottomSheets(screen, id) ||   // 👈 добавили
        null
    );
};