import type { UIScreen } from "../model/screenTypes";


export function validateScreenData(data: any): UIScreen {
  return {
    type: data.type as "screen",
    _id: data._id,
    name: data.name,
    width: data.width,
    height: data.heidht,
    background: data.background,
    topBar: data.topBar || [],
    content: data.content || [],
    bottomBar: data.bottomBar || [],
    snackbars: data.snackbars || [],
  };
}
