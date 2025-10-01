import type { UIScreen } from "../model/types";

export function validateScreenData(data: any): UIScreen {
  return {
    type: data.type as "screen",
    id: data.id,
    name: data.name,
    background: data.background,
    topBar: data.topBar || [],
    content: data.content || [],
    bottomBar: data.bottomBar || [],
    snackbars: data.snackbars || [],
  };
}
