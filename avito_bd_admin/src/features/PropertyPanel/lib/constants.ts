
import type { UIComponent, Modifier } from "../../../entities/components/model/componentTypes";
import type { UIScreen } from "../../../entities/screen/model/screenTypes";
import { componentDefaults, defaultButtonStyle, defaultModifier, defaultTextStyle } from "../../LeftBar/ui/ComponentLibrary/lib/constant";


// === утилиты ===
const genId = (prefix = "id") =>
  `${prefix}_${Math.random().toString(36).slice(2, 10)}`;

// что считаем «пустым» значением, которое надо заполнить дефолтом:
const isEmpty = (v: unknown) =>
  v === undefined || v === null || (typeof v === "string" && v.trim() === "");

// неглубокое копирование объектов/массивов
const clone = <T>(v: T): T =>
  Array.isArray(v) ? (v.map(clone) as any) :
  (v && typeof v === "object") ? ({ ...(v as any) } as T) :
  (v as T);

// «мягкое» заполнение: если в target поле пустое — берём из defaults; если оба — объекты, идём внутрь
function fillMissing<T>(target: T, defaults?: Partial<T>|null): T {
  if (!defaults || typeof defaults !== "object") return target;

  const out: any = Array.isArray(target) ? [...(target as any)] : { ...(target as any) };

  for (const key of Object.keys(defaults as any)) {
    const dv = (defaults as any)[key];
    const tv = (out as any)[key];

    if (isEmpty(tv)) {
      // прямое заполнение пустого
      (out as any)[key] = clone(dv);
    } else if (
      dv &&
      typeof dv === "object" &&
      !Array.isArray(dv) &&
      tv &&
      typeof tv === "object" &&
      !Array.isArray(tv)
    ) {
      // оба — простые объекты: идём внутрь
      (out as any)[key] = fillMissing(tv, dv);
    } // иначе оставляем пользовательское значение как есть
  }

  return out as T;
}

// специальная сборка дефолтов МОДИФИКАТОРА: глобальные + типовые
function buildDefaultModifier(type: UIComponent["type"]): Modifier {
  const typeMod = (componentDefaults[type] as any)?.modifier as Partial<Modifier> | undefined;
  return fillMissing(
    clone(typeMod ?? {}) as Modifier,
    clone(defaultModifier) as Partial<Modifier>
  );
}

// общий «эталон» для типа: модификатор, стили и прочее
function buildTypeBaseline<K extends UIComponent["type"]>(type: K): Extract<UIComponent, { type: K }> {
  const base: any = { _id: genId(type), type };

  // модификатор: глобальный defaultModifier + типовой override
  base.modifier = buildDefaultModifier(type);

  // типовые дефолты из componentDefaults (кроме modifier, который уже собрали)
  const typeDefaults = clone(componentDefaults[type] ?? {}) as any;
  delete typeDefaults.modifier;

  // некоторые типы имеют «общие» стили: text/style, button/style и т.д.
  // Мы заполним их только если их нет в typeDefaults
  if (type === "text") {
    typeDefaults.style = fillMissing(
      typeDefaults.style ?? {},
      defaultTextStyle
    );
  }
  if (type === "button") {
    typeDefaults.style = fillMissing(
      typeDefaults.style ?? {},
      defaultButtonStyle
    );
  }

  // сливаем оставшиеся типовые поля
  return { ...base, ...typeDefaults } as Extract<UIComponent, { type: K }>;
}

// === публичные функции ===

// 1) Создать компонент «с нуля» по шаблону (из componentTemplates) с учётом дефолтов
// export function createComponentFromTemplate(
//   template: { type: UIComponent["type"]; name?: string },
//   overrides?: Partial<UIComponent>
// ): UIComponent {
//   const baseline = buildTypeBaseline(template.type);
//   const withOverrides = overrides ? { ...baseline, ...overrides } : baseline;

//   // гарантируем _id
//   if (!withOverrides._id) (withOverrides as any)._id = genId(template.type);

//   // окончательно заполняем пустые поля дефолтами типа (включая вложенные)
//   const finalComp = fillMissing(withOverrides, baseline);

//   // если есть дети — прогоняем рекурсивно
//   if ("children" in finalComp && Array.isArray((finalComp as any).children)) {
//     (finalComp as any).children = (finalComp as any).children.map((ch: UIComponent) =>
//       applyDefaultsToComponent(ch)
//     );
//   }

//   return finalComp;
// }

// 2) Применить дефолты к уже существующему компоненту (и всем его детям)
export function applyDefaultsToComponent<C extends UIComponent|null>(comp?: C): C;
export function applyDefaultsToComponent(comp: null ): null;

// Реализация
export function applyDefaultsToComponent(
  comp: UIComponent | null | undefined
): UIComponent | null {
  if (!comp) return null;

  const baseline = buildTypeBaseline(comp.type);

  // гарантируем _id
  const withId: UIComponent = comp._id
    ? comp
    : ({ ...comp, _id: genId(comp.type) } as UIComponent);

  // мягко заполняем пустые поля из baseline
  let merged = fillMissing(withId, baseline) as UIComponent;

  // модификатор: мягкий мердж ещё раз
  merged = {
    ...merged,
    modifier: fillMissing(
      (merged as any).modifier ?? ({} as Modifier),
      baseline.modifier
    ),
  };

  // рекурсивно прогоняем детей (если есть)
  if ("children" in merged && Array.isArray((merged as any).children)) {
    (merged as any).children = (merged as any).children.map((child: UIComponent) =>
      applyDefaultsToComponent(child)!
    );
  }

  return merged;
}

// 3) Массовая версия для экранов (topBar/content/bottomBar)
export function applyDefaultsToScreen(screen: UIScreen): UIScreen {
  const fixList = (list?: UIComponent[]) =>
    (list ?? []).map((c) => applyDefaultsToComponent(c));

  return {
    ...screen,
    topBar: fixList(screen.topBar),
    content: fixList(screen.content),
    bottomBar: fixList(screen.bottomBar),
  };
}