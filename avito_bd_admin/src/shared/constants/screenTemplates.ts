import type { UIScreen } from "../model/types";

export const NEW_SCREEN_TEMPLATE: UIScreen = {
  _id: "a7b1a4ed-9c24-44e9-939d-fe7c2556dc85",
  name: "CartScreen",
  background: "#FFFFFF",
  topBar: [
    {
      id: "column1",
      type: "column",
      modifier: { fillMaxWidth: true, size: { height: "50" } },
      background: "#FFFFFF",
      children: [],
      _id: "comp-topbar-0-0dy6un5am",
    },
  ],
  content: [
    {
      type: "row",
      modifier: {
        height: "500",
        size: { width: "match_parent", height: "500" },
        fillMaxWidth: true,
      },
      children: [],
      _id: "comp-content-0-4l8izz5mr",
    },
  ],
  bottomBar: [
    {
      type: "box",
      _id: "comp-bottombar-0-l07qiutpa",
      id: "box1",
      modifier: { fillMaxWidth: true, size: { height: "50" } },
      background: "#FFFFFF",
      children: [],
    },
  ],
  snackbars: [],
  type: "screen",
};

// Функция для создания нового экрана с уникальными ID
export const createNewScreen = (): UIScreen => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 9);

  return {
    ...NEW_SCREEN_TEMPLATE,
    _id: "new",
    name: `New Screen ${timestamp}`,
    topBar: NEW_SCREEN_TEMPLATE.topBar.map((comp) => ({
      ...comp,
      _id: `comp-topbar-${timestamp}-${random}`,
    })),
    content: NEW_SCREEN_TEMPLATE.content.map((comp) => ({
      ...comp,
      _id: `comp-content-${timestamp}-${random}`,
    })),
    bottomBar: NEW_SCREEN_TEMPLATE.bottomBar.map((comp) => ({
      ...comp,
      _id: `comp-bottombar-${timestamp}-${random}`,
    })),
  };
};
