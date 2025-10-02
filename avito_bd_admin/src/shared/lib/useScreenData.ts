import { useState, useEffect } from "react";
import type { UIScreen, RawUIScreen, UIComponent } from "../model/types";

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
    topBar: screen.topBar.map((comp, index) =>
      addMissingIds(comp, `topbar-${index}`)
    ),
    content: screen.content.map((comp, index) =>
      addMissingIds(comp, `content-${index}`)
    ),
    bottomBar: screen.bottomBar.map((comp, index) =>
      addMissingIds(comp, `bottombar-${index}`)
    ),
  };
}

export function useScreenData(initialData: RawUIScreen): UIScreen | null {
  const [screen, setScreen] = useState<UIScreen | null>(null);

  useEffect(() => {
    console.log("🔄 useScreenData: initialData received", initialData);

    try {
      // Простая валидация без сложной логики
      const screen: UIScreen = {
        type: "screen",
        _id: initialData._id || "default",
        name: initialData.name || "Default",
        background: initialData.background || "#FFFFFF",
        topBar: initialData.topBar || [],
        content: initialData.content || [],
        bottomBar: initialData.bottomBar || [],
        snackbars: initialData.snackbars || [],
      };

      // ДОБАВЬТЕ ЭТУ СТРОКУ для генерации ID
      const screenWithIds = ensureAllComponentsHaveIds(screen);

      console.log("✅ useScreenData: screen created", screenWithIds);
      setScreen(screenWithIds);
    } catch (error) {
      console.error("❌ useScreenData error:", error);
    }
  }, [initialData]);

  return screen;
}
