import type { UIComponent } from "../../../entities/components/model/componentTypes";
import type { UIScreen } from "../../../entities/screen/model/screenTypes";

const updateInList = (
  list: UIComponent[] = [],
  id: string,
  mutator: (c: UIComponent) => UIComponent
): UIComponent[] => {
  return list.map((c) => {
    if (c._id === id) {
      return mutator(c);
    }
    if ("children" in c && Array.isArray(c.children)) {
      return { ...c, children: updateInList(c.children, id, mutator) };
    }
    return c;
  });
};

export const updateComponentById = (
  screen: UIScreen,
  id: string,
  mutator: (c: UIComponent) => UIComponent
): UIScreen => {
  // обновляем в стандартных секциях
  let next: UIScreen = {
    ...screen,
    topBar: updateInList(screen.topBar, id, mutator),
    content: updateInList(screen.content, id, mutator),
    bottomBar: updateInList(screen.bottomBar, id, mutator),
  };

  // обновляем внутри каждого bottomSheet
  if (screen.bottomSheets?.length) {
    next = {
      ...next,
      bottomSheets: screen.bottomSheets.map((bs) => ({
        ...bs,
        children: updateInList(bs.children, id, mutator),
      })),
    };
  }

  return next;
};