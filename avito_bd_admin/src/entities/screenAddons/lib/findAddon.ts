import type { BottomSheetComponent, SnackbarComponent } from "../model/screenAddonsTypes";

export function findBottomSheetById(
    items: BottomSheetComponent[],
    id: string | null
): BottomSheetComponent | undefined {
    return items.find(item => item._id === id);
}

export function findSnackbarById(
    items: SnackbarComponent[],
    id: string | null
): SnackbarComponent | undefined {
    return items.find(item => item._id === id);
}