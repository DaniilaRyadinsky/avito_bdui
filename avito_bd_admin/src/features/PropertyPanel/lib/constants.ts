
import type { UIComponent, Modifier } from "../../../entities/components/model/componentTypes";
import type { UIScreen } from "../../../entities/screen/model/screenTypes";
import { genId } from "../../../shared/lib/merge";
import { componentDefaults, defaultButtonStyle, defaultModifier, defaultTextStyle } from "../../ComponentLibrary/lib/constant";


const isEmpty = (v: unknown) =>
  v === undefined || v === null || (typeof v === "string" && v.trim() === "");

const clone = <T>(v: T): T =>
  Array.isArray(v) ? (v.map(clone) as any) :
  (v && typeof v === "object") ? ({ ...(v as any) } as T) :
  (v as T);


function fillMissing<T>(target: T, defaults?: Partial<T>|null): T {
  if (!defaults || typeof defaults !== "object") return target;

  const out: any = Array.isArray(target) ? [...(target as any)] : { ...(target as any) };

  for (const key of Object.keys(defaults as any)) {
    const dv = (defaults as any)[key];
    const tv = (out as any)[key];

    if (isEmpty(tv)) {
      (out as any)[key] = clone(dv);
    } else if (
      dv &&
      typeof dv === "object" &&
      !Array.isArray(dv) &&
      tv &&
      typeof tv === "object" &&
      !Array.isArray(tv)
    ) {
      (out as any)[key] = fillMissing(tv, dv);
    } 
  }

  return out as T;
}

function buildDefaultModifier(type: UIComponent["type"]): Modifier {
  const typeMod = (componentDefaults[type] as any)?.modifier as Partial<Modifier> | undefined;
  return fillMissing(
    clone(typeMod ?? {}) as Modifier,
    clone(defaultModifier) as Partial<Modifier>
  );
}

function buildTypeBaseline<K extends UIComponent["type"]>(type: K): Extract<UIComponent, { type: K }> {
  const base: any = { _id: genId(type), type };

  base.modifier = buildDefaultModifier(type);

  const typeDefaults = clone(componentDefaults[type] ?? {}) as any;
  delete typeDefaults.modifier;

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

  return { ...base, ...typeDefaults } as Extract<UIComponent, { type: K }>;
}


export function applyDefaultsToComponent<C extends UIComponent|null>(comp?: C): C;
export function applyDefaultsToComponent(comp: null ): null;

export function applyDefaultsToComponent(
  comp: UIComponent | null | undefined
): UIComponent | null {
  if (!comp) return null;

  const baseline = buildTypeBaseline(comp.type);

  const withId: UIComponent = comp._id
    ? comp
    : ({ ...comp, _id: genId(comp.type) } as UIComponent);

  let merged = fillMissing(withId, baseline) as UIComponent;

  merged = {
    ...merged,
    modifier: fillMissing(
      (merged as any).modifier ?? ({} as Modifier),
      baseline.modifier
    ),
  };

  if ("children" in merged && Array.isArray((merged as any).children)) {
    (merged as any).children = (merged as any).children.map((child: UIComponent) =>
      applyDefaultsToComponent(child)!
    );
  }

  return merged;
}

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