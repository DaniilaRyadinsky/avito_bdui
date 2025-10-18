import type { UIComponent } from "../../components/model/componentTypes";

export interface SnackbarComponent {
    _id: string,
    type: "snackbar";
    text: string;
    actionText?: string;
    duration?: number;
}

export interface BottomSheetComponent {
    _id: string,
    type: "bottomSheet";
    dismissible: boolean;
    children: UIComponent[];
}

export type UIAddons =
    SnackbarComponent |
    BottomSheetComponent
