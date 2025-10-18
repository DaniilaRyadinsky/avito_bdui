import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { UIScreen } from "../../../entities/screen/model/screenTypes";
import type { UIComponent } from "../../../entities/components/model/componentTypes";
import { findBottomSheetById } from "../../../entities/screenAddons/lib/findBottomsheets";

interface BuilderContextType {
  screen: UIScreen | null;
  selectedComponentId: string | null;
  setSelectedComponent: (_id: string | null) => void;
  updateScreen: (updater: (currentScreen: UIScreen) => UIScreen) => void;
  deleteComponent: (componentId: string) => void;
  moveComponent: (componentId: string, direction: "up" | "down") => void;

  selectedBottomSheetId: string | null;
  setSelectedBottomSheet: (_id: string | null) => void;

  selectedSnackBarId: string | null;
  setSelectedSnackBar: (_id: string | null) => void;

  customTemplates: UIComponent[];
  addCustomTemplate: (component: UIComponent, name: string) => void;
  removeCustomTemplate: (templateId: string) => void;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

interface BuilderProviderProps {
  screen: UIScreen | null;
  children: ReactNode;
}

const CUSTOM_TEMPLATES_STORAGE_KEY = "builder_custom_templates";

const loadCustomTemplatesFromStorage = (): UIComponent[] => {
  try {
    const stored = localStorage.getItem(CUSTOM_TEMPLATES_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error(error);
  }
  return [];
};

const saveCustomTemplatesToStorage = (templates: UIComponent[]): void => {
  try {
    localStorage.setItem(
      CUSTOM_TEMPLATES_STORAGE_KEY,
      JSON.stringify(templates)
    );
  } catch (error) {
    console.error(error);
  }
};

export const BuilderProvider: React.FC<BuilderProviderProps> = ({
  screen: initialScreen,
  children,
}) => {
  const [screen, setScreen] = useState<UIScreen | null>(initialScreen);
  const [selectedComponentId, setSelectedComponent] = useState<string | null>(
    null
  );
  const [selectedBottomSheetId, setSelectedBottomSheet] = useState<
    string | null
  >(null);
  const [selectedSnackBarId, setSelectedSnackBar] = useState<string | null>(
    null
  );
  const [customTemplates, setCustomTemplates] = useState<UIComponent[]>([]);

  useEffect(() => {
    const loadedTemplates = loadCustomTemplatesFromStorage();
    setCustomTemplates(loadedTemplates);
  }, []);

  const addCustomTemplate = (component: UIComponent, name: string) => {
    const regenerateIds = (comp: UIComponent): UIComponent => {
      const newId = `comp_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      const newComp: UIComponent = {
        ...comp,
        _id: newId,
      };

      if ("children" in newComp && Array.isArray(newComp.children)) {
        (newComp as any).children = newComp.children.map((child) =>
          regenerateIds(child)
        );
      }

      return newComp;
    };

    const templateWithName = {
      ...regenerateIds(component),
      _id: `template_${Date.now()}`,
      templateName: name,
    };

    setCustomTemplates((prev) => {
      const newTemplates = [...prev, templateWithName];
      saveCustomTemplatesToStorage(newTemplates);
      return newTemplates;
    });
  };

  const removeCustomTemplate = (templateId: string) => {
    setCustomTemplates((prev) => {
      const newTemplates = prev.filter((t) => t._id !== templateId);
      saveCustomTemplatesToStorage(newTemplates);
      return newTemplates;
    });
  };

  useEffect(() => {
    setScreen(initialScreen);
  }, [initialScreen]);

  const updateScreen = (updater: (currentScreen: UIScreen) => UIScreen) => {
    if (screen) {
      const newScreen = updater(screen);
      setScreen(newScreen);
    }
  };
  const moveComponent = (componentId: string, direction: "up" | "down") => {
    if (!screen) return;

    const moveInTree = (
      components: UIComponent[]
    ): { found: boolean; components: UIComponent[] } => {
      let found = false;
      const newComponents = [...components];

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
        }

        return { found, components: newComponents };
      }

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

      // ✅ Меняем только children выбранного bottomSheet
      bottomSheets: (screen.bottomSheets ?? []).map((bs) =>
        bs._id === selectedBottomSheetId
          ? { ...bs, children: moveInSection(bs.children ?? []) }
          : bs
      ),
      // snackbars — без изменений
    };
    setScreen(newScreen);
  };

  const deleteComponent = (componentId: string) => {
    if (!screen) return;

    const deepRemove = (components: UIComponent[] = []): UIComponent[] => {
      return (
        components
          // 1) Удаляем сам компонент, если совпал id
          .filter((c) => c._id !== componentId)
          // 2) Рекурсивно чистим детей (если они есть)
          .map((c) => {
            if ("children" in c && Array.isArray(c.children)) {
              return { ...c, children: deepRemove(c.children) };
            }
            return c;
          })
      );
    };

    const newScreen: UIScreen = {
      ...screen,
      topBar: deepRemove(screen.topBar || []),
      content: deepRemove(screen.content || []),
      bottomBar: deepRemove(screen.bottomBar || []),
      bottomSheets: (screen.bottomSheets ?? []).map((bs) =>
        bs._id === selectedBottomSheetId
          ? { ...bs, children: deepRemove(bs.children ?? []) }
          : bs
      ),
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
    selectedBottomSheetId,
    setSelectedBottomSheet,
    selectedSnackBarId,
    setSelectedSnackBar,
    customTemplates,
    addCustomTemplate,
    removeCustomTemplate,
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
