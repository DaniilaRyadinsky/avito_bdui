import type { UIScreen } from "../model/screenTypes";


export const NEW_SCREEN_TEMPLATE: UIScreen = {
  _id: "a7b1a4ed-9c24-44e9-939d-fe7c2556dc85",
  name: "CartScreen",
  background: "#FFFFFF",
  width: 420,
  height: 800,
  topBar: [
    {
      _id: "comp-topbar-0-0dy6un5am",
      type: "row",
      modifier: {
        background: "#FFFFFF",
        fillMaxWidth: true,
        size: {
          width: "match_parent",
          height: "50"
        }
      },
      children: [],
    },
  ],
  content: [
    {
      type: "column",
      modifier: {
        size: { width: "match_parent", height: "match_parent" },
        fillMaxWidth: true,
        fillMaxHeight: true,
      },
      children: [],
      _id: "comp-content-0-4l8izz5mr",
    },
  ],
  bottomBar: [
    {
      type: "row",
      _id: "comp-bottombar-0-l07qiutpa",
      modifier: {
        background: "#FFFFFF",
        fillMaxWidth: true,
        size: {
          width: "match_parent",
          height: "50"
        }
      },

      children: [],
    },
  ],
  bottomSheets: [],
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
