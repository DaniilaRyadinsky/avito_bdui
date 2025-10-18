import type { BottomSheetComponent } from "../model/screenAddonsTypes";

export function findBottomSheetById(
    items: BottomSheetComponent[],
    id: string | null
): BottomSheetComponent | undefined {
    return items.find(item => item._id === id);
}