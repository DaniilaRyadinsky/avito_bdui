import type { UIComponent, UIScreen } from "../../../shared/model/types";

export function updateByIdInList(
  list: UIComponent[] | undefined,
  id: string,
  mutator: (c: UIComponent) => UIComponent
): UIComponent[] {
  if (!list) return [];                 // <-- всегда массив
  return list.map(c => {
    if (c._id === id) return mutator(c);
    if ("children" in c && Array.isArray(c.children)) {
      return { ...c, children: updateByIdInList(c.children, id, mutator) };
    }
    return c;
  });
}

export function updateComponentById(
  screen: UIScreen,
  id: string,
  mutator: (c: UIComponent) => UIComponent
): UIScreen {
  return {
    ...screen,
    topBar: updateByIdInList(screen.topBar, id, mutator),      // тип уже UIComponent[]
    content: updateByIdInList(screen.content, id, mutator),
    bottomBar: updateByIdInList(screen.bottomBar, id, mutator),
  };
}