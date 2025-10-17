
import type { RowComponent, ColumnComponent, RowVerticalAlignment, RowHorizontalArrangement, ColumnHorizontalAlignment, ColumnVerticalArrangement } from "../../../entities/components/model/componentTypes";
import { BoolSwitch } from "../../../shared/ui/BoolSwitch/BoolSwitch";
import { SelectBox } from "../../../shared/ui/SelectBox/SelectBox";
import { Column } from "./FieldPrimitives";
import { Section } from "./Section";

export const AligmentStyleGroup: React.FC<{
  value?: RowComponent | ColumnComponent;
  onChange: (patch: Partial<RowComponent> | Partial<ColumnComponent>) => void;
}> = ({ value, onChange }) => {

  const isRow = (v: RowComponent | ColumnComponent | undefined): v is RowComponent =>
    !!v && v.type === "row";

  const isColumn = (v: RowComponent | ColumnComponent | undefined): v is ColumnComponent =>
    !!v && v.type === "column";

  // прокидываем ровно патч, без склейки с value
  const setRowCol = (patch: Partial<RowComponent> | Partial<ColumnComponent>) => {
    onChange(patch);
  };

  return (
    <Section title="Выравнивание контейнера">
      {/* СТРОКА */}
      {isRow(value) && (
        <>
          <Column label="По вертикали (Row)">
            <SelectBox
              value={String(value.verticalAlignment ?? "centerVertically")}
              onChange={(v) =>
                setRowCol({ verticalAlignment: v as RowVerticalAlignment })
              }
              options={["top", "center", "bottom"].map(x => ({ label: x, value: x }))}
            />
          </Column>
          <Column label="По горизонтали (Row)">
            <SelectBox
              value={String(value.horizontalArrangement ?? "centerVertically")}
              onChange={(v) =>
                setRowCol({ horizontalArrangement: v as RowHorizontalArrangement })
              }
              options={['start', 'center', 'end', 'spaceBetween', 'spaceAround', 'spaceEvenly'].map(x => ({ label: x, value: x }))}
            />
          </Column>
        </>
      )}
      {/* СТОЛБЕЦ */}
      {isColumn(value) && (
        <>
          <Column label="По вертикали (Column)">
            <SelectBox
              value={String(value.verticalArrangement ?? "top")}
              onChange={(v) =>
                setRowCol({ verticalArrangement: v as ColumnVerticalArrangement })
              }
              options={["top", "center", "bottom", 'spaceBetween', 'spaceAround', 'spaceEvenly'].map(x => ({ label: x, value: x }))}
            />
          </Column>
          <Column label="По горизонтали (Column)">
            <SelectBox
              value={String(value.horizontalAlignment ?? "top")}
              onChange={(v) =>
                setRowCol({ horizontalArrangement: v as ColumnHorizontalAlignment })
              }
              options={["start", "center", "end"].map(x => ({ label: x, value: x }))}
            />
          </Column>
        </>
      )}
      <Column label="Скролл">
        <BoolSwitch checked={value?.modifier?.scrollable} onChange={(x) => {
          setRowCol({
            // отдаём патч по modifier; внутри него мерджим, чтобы не потерять другие поля modifier
            modifier: { ...(value?.modifier ?? {}), scrollable: x }
          })
        }} />
      </Column>
    </Section>
  );
};