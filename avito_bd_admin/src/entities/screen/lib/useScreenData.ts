import { useState, useEffect } from "react";
import type { SnackbarComponent, UIComponent } from "../../components/model/componentTypes";
import type { UIScreen, RawUIScreen } from "../model/screenTypes";


// Функция для добавления ID всем компонентам
function ensureAllComponentsHaveIds(screen: UIScreen): UIScreen {
  const addMissingIds = (component: UIComponent, path: string): UIComponent => {
    const withId = {
      ...component,
      _id:
        component._id ||
        `comp-${path}-${Math.random().toString(36).substr(2, 9)}`,
    };

    if ("children" in withId && withId.children) {
      return {
        ...withId,
        children: withId.children.map((child, index) =>
          addMissingIds(child, `${path}-${index}`)
        ),
      };
    }

    return withId;
  };

  return {
    ...screen,
    topBar: (screen.topBar || []).map((comp, index) =>
      addMissingIds(comp, `topbar-${index}`)
    ),
    content: (screen.content || []).map((comp, index) =>
      addMissingIds(comp, `content-${index}`)
    ),
    bottomBar: (screen.bottomBar || []).map((comp, index) =>
      addMissingIds(comp, `bottombar-${index}`)
    ),
  };
}

// Функция для адаптации данных с сервера к формату RawUIScreen
function adaptServerData(serverData: any): RawUIScreen | null {
  if (!serverData) return null;

  console.log("🔄 Adapting server data:", serverData);

  // Если это новый скрин (уже в правильном формате)
  if (serverData._id === "new" && serverData.type === "screen") {
    return serverData;
  }

  // Если данные уже в правильном формате RawUIScreen
  if (serverData.type === "screen" && serverData._id) {
    return serverData;
  }

  // Если данные пришли с сервера и содержат поле data с экраном
  if (serverData.data && serverData.data.type === "screen") {
    return serverData.data;
  }

  // Если данные пришли напрямую с сервера (как в вашем примере JSON)
  if (serverData._id && serverData.type === "screen") {
    return serverData;
  }

  // Если это просто объект с полями (резервный вариант)
  if (serverData._id || serverData.id) {
    return {
      type: "screen",
      _id: serverData._id || serverData.id,
      name: serverData.name || "Unnamed Screen",
      background: serverData.background || "#FFFFFF",
      topBar: serverData.topBar || [],
      content: serverData.content || [],
      bottomBar: serverData.bottomBar || [],
      snackbars: serverData.snackbars || [],
    };
  }

  console.warn("❌ Unknown data format:", serverData);
  return null;
}

export function useScreenData(initialData: any): UIScreen | null {
  const [screen, setScreen] = useState<UIScreen | null>(null);

  useEffect(() => {
    try {
      const adaptedData = adaptServerData(initialData);

      if (!adaptedData) {
        setScreen(null);
        return;
      }

      const screen: UIScreen = {
        type: "screen",
        _id: adaptedData._id || "default",
        name: adaptedData.name || "Default Screen",
        width: adaptedData.width,
        height: adaptedData.height,
        background: adaptedData.background || "#FFFFFF",
        topBar: adaptedData.topBar as unknown as UIComponent[] || [],
        content: adaptedData.content as unknown as UIComponent[] || [],
        bottomBar: adaptedData.bottomBar as unknown as UIComponent[] || [],
        snackbars: adaptedData.snackbars as unknown as SnackbarComponent[] || [],
      };

      const screenWithIds = ensureAllComponentsHaveIds(screen);

      setScreen(screenWithIds);
    } catch (error) {
      console.error("❌ useScreenData error:", error);
      setScreen(null);
    }
  }, [initialData]);

  return screen;
}
