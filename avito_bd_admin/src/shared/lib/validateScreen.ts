import type { UIScreen } from "../model/types";

export function validateScreenData(data: any): UIScreen {
  return {
    type: data.type as "screen",
    _id: data._id,
    name: data.name,
    background: data.background,
    topBar: data.topBar || [],
    content: data.content || [],
    bottomBar: data.bottomBar || [],
    snackbars: data.snackbars || [],
  };
}
