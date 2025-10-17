import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { UIScreen } from "../../../entities/screen/model/screenTypes";
import type { UIComponent } from "../../../entities/components/model/componentTypes";


interface BuilderContextType {
  screen: UIScreen | null;
  selectedComponentId: string | null;
  setSelectedComponent: (_id: string | null) => void;
  updateScreen: (updater: (currentScreen: UIScreen) => UIScreen) => void;
  deleteComponent: (componentId: string) => void;
  moveComponent: (componentId: string, direction: "up" | "down") => void;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

interface BuilderProviderProps {
  screen: UIScreen | null;
  children: ReactNode;
}

export const BuilderProvider: React.FC<BuilderProviderProps> = ({
  screen: initialScreen,
  children,
}) => {
  const [screen, setScreen] = useState<UIScreen | null>(initialScreen);
  const [selectedComponentId, setSelectedComponent] = useState<string | null>(
    null
  );

  // Обновляем screen при изменении initialScreen
  useEffect(() => {
    console.log("🔄 BuilderProvider: screen updated", initialScreen);
    setScreen(initialScreen);
  }, [initialScreen]);

  // Функция для обновления экрана
  const updateScreen = (updater: (currentScreen: UIScreen) => UIScreen) => {
    if (screen) {
      const newScreen = updater(screen);
      setScreen(newScreen);
    }
  };

  const moveComponent = (componentId: string, direction: "up" | "down") => {
    if (!screen) return;

    console.log("🔄 Attempting to move component:", componentId, direction);

    const moveInTree = (
      components: UIComponent[]
    ): { found: boolean; components: UIComponent[] } => {
      let found = false;
      const newComponents = [...components];

      // Сначала ищем на текущем уровне
      const index = newComponents.findIndex((comp) => comp._id === componentId);

      if (index !== -1) {
        found = true;
        let newIndex = index;

        if (direction === "up" && index > 0) {
          newIndex = index - 1;
        } else if (direction === "down" && index < newComponents.length - 1) {
          newIndex = index + 1;
        }

        if (newIndex !== index) {
          const [movedComponent] = newComponents.splice(index, 1);
          newComponents.splice(newIndex, 0, movedComponent);
          console.log(
            "✅ Moved component:",
            componentId,
            "from",
            index,
            "to",
            newIndex
          );
        }

        return { found, components: newComponents };
      }

      // Если не нашли, ищем в детях
      for (let i = 0; i < newComponents.length; i++) {
        const comp = newComponents[i];
        if ("children" in comp && comp.children) {
          const result = moveInTree(comp.children);
          if (result.found) {
            return {
              found: true,
              components: [
                ...newComponents.slice(0, i),
                { ...comp, children: result.components },
                ...newComponents.slice(i + 1),
              ],
            };
          }
        }
      }

      return { found: false, components: newComponents };
    };

    const moveInSection = (components: UIComponent[]): UIComponent[] => {
      const result = moveInTree(components);
      return result.components;
    };

    const newScreen: UIScreen = {
      ...screen,
      content: moveInSection(screen.content),
      topBar: moveInSection(screen.topBar),
      bottomBar: moveInSection(screen.bottomBar),
    };

    setScreen(newScreen);
  };

const deleteComponent = (componentId: string) => {
  if (!screen) return;

  const deepRemove = (components: UIComponent[] = []): UIComponent[] => {
    return components
      // 1) Удаляем сам компонент, если совпал id
      .filter(c => c._id !== componentId)
      // 2) Рекурсивно чистим детей (если они есть)
      .map(c => {
        if ('children' in c && Array.isArray(c.children)) {
          return { ...c, children: deepRemove(c.children) };
        }
        return c;
      });
  };

  const newScreen: UIScreen = {
    ...screen,
    topBar: deepRemove(screen.topBar || []),
    content: deepRemove(screen.content || []),
    bottomBar: deepRemove(screen.bottomBar || []),
  };

  setScreen(newScreen);
  setSelectedComponent(null);
};

  const contextValue: BuilderContextType = {
    screen,
    selectedComponentId,
    setSelectedComponent,
    updateScreen,
    deleteComponent,
    moveComponent,
  };

  return (
    <BuilderContext.Provider value={contextValue}>
      {children}
    </BuilderContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBuilder = (): BuilderContextType => {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error("useBuilder must be used within a BuilderProvider");
  }
  return context;
};
