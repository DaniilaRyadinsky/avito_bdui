import type { RawUIComponent, UIComponent } from "../../components/model/componentTypes";
import type { SnackbarComponent, BottomSheetComponent } from "../../screenAddons/model/screenAddonsTypes";

export type RawUIScreen = {
  type: string;
  _id: string;
  name: string;
  background: string;
  topBar: RawUIComponent[];
  content: RawUIComponent[];
  bottomBar: RawUIComponent[];
  snackbars: RawUIComponent[];
  [key: string]: any;
};

// Экран
export interface UIScreen {
  type: "screen";
  _id: string;
  name: string;
  width: number,
  height: number;
  background: string;
  topBar: UIComponent[];
  content: UIComponent[];
  bottomBar: UIComponent[];
  snackbars: SnackbarComponent[];
  bottomSheets: BottomSheetComponent[];
}
