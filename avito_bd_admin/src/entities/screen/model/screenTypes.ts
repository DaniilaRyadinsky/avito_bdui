import type { RawUIComponent, SnackbarComponent, UIComponent } from "../../components/model/componentTypes";

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
  // width: string,
  // height: string;
  background: string;
  topBar: UIComponent[];
  content: UIComponent[];
  bottomBar: UIComponent[];
  snackbars: SnackbarComponent[];
}
