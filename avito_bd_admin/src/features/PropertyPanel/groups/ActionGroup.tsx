import React from "react";
import { Section } from "./Section";
import { Column } from "./FieldPrimitives";
import { SelectBox } from "../../../shared/ui/SelectBox/SelectBox";
import type {
  Action,
  ActionEvent,
  ActionType,
  Modifier,
} from "../../../entities/components/model/componentTypes";
import Button from "../../../shared/ui/Button/Button";
import { TextInput } from "../../../shared/ui/TextInput/TextInput";

interface ActionGroupProps {
  actions?: Action[];
  modifier?: Modifier;
  onChange: (actions: Action[]) => void;
  onModifierChange?: (modifier: Partial<Modifier>) => void;
}

export const ActionGroup: React.FC<ActionGroupProps> = ({
  actions = [],
  modifier,
  onChange,
  onModifierChange,
}) => {
  // Используем локальное состояние для отслеживания изменений
  const [localActions, setLocalActions] = React.useState<Action[]>(
    actions || []
  );

  // Синхронизируем локальное состояние с props
  React.useEffect(() => {
    setLocalActions(actions || []);
  }, [actions]);

  // Автоматически управляем clickable на основе наличия действий
  React.useEffect(() => {
    const hasActions = localActions.length > 0;
    const isCurrentlyClickable = modifier?.clickable === true;

    // Если есть действия, но компонент не кликабельный - делаем кликабельным
    if (hasActions && !isCurrentlyClickable) {
      console.log("Setting clickable to true because there are actions");
      onModifierChange?.({ clickable: true });
    }
    // Если нет действий, но компонент кликабельный - делаем не кликабельным
    else if (!hasActions && isCurrentlyClickable) {
      console.log("Setting clickable to false because there are no actions");
      onModifierChange?.({ clickable: false });
    }
  }, [localActions.length, modifier?.clickable, onModifierChange]);

  const addAction = () => {
    const newAction: Action = {
      event: "onClick",
      type: "navigate",
      targetId: "",
    };
    const newActions = [...localActions, newAction];

    // Сначала обновляем локальное состояние для мгновенного отображения
    setLocalActions(newActions);

    // Затем вызываем onChange для родительского компонента
    onChange(newActions);
  };

  const updateAction = (index: number, updates: Partial<Action>) => {
    const newActions = localActions.map((action, i) =>
      i === index ? { ...action, ...updates } : action
    );

    // Сначала обновляем локальное состояние
    setLocalActions(newActions);

    // Затем вызываем onChange
    onChange(newActions);
  };

  const removeAction = (index: number) => {
    const newActions = localActions.filter((_, i) => i !== index);

    // Сначала обновляем локальное состояние
    setLocalActions(newActions);

    // Затем вызываем onChange
    onChange(newActions);
  };

  const actionEvents: { value: ActionEvent; label: string }[] = [
    { value: "onClick", label: "По клику" },
  ];

  const actionTypes: { value: ActionType; label: string }[] = [
    { value: "navigate", label: "Навигация" },
    { value: "showSnackbar", label: "Показать уведомление" },
    { value: "showBottomSheet", label: "Показать нижнюю панель" },
  ];

  return (
    <Section title="Действия">
      <div className="space-y-4">
        {localActions.map((action, index) => (
          <div
            key={`action-${index}-${action.type}`}
            className="p-3 border border-gray-200 rounded-lg space-y-3"
          >
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium text-gray-700">
                Действие #{index + 1}
              </h4>
              <Button onClick={() => removeAction(index)}>Удалить</Button>
            </div>

            <Column label="Событие">
              <SelectBox
                value={action.event || "onClick"}
                options={actionEvents}
                onChange={(value) =>
                  updateAction(index, { event: value as ActionEvent })
                }
              />
            </Column>

            <Column label="Тип действия">
              <SelectBox
                value={action.type || "navigate"}
                options={actionTypes}
                onChange={(value) =>
                  updateAction(index, { type: value as ActionType })
                }
              />
            </Column>

            {action.type === "navigate" && (
              <Column label="ID целевого компонента">
                <TextInput
                  value={action.targetId || ""}
                  onChange={(value) => updateAction(index, { targetId: value })}
                  placeholder="Введите ID компонента"
                />
              </Column>
            )}

            {action.type === "showSnackbar" && (
              <Column label="Текст уведомления">
                <TextInput
                  value={action.targetId || ""}
                  onChange={(value) => updateAction(index, { targetId: value })}
                  placeholder="Введите текст уведомления"
                />
              </Column>
            )}

            {action.type === "showBottomSheet" && (
              <Column label="ID содержимого">
                <TextInput
                  value={action.targetId || ""}
                  onChange={(value) => updateAction(index, { targetId: value })}
                  placeholder="Введите ID содержимого"
                />
              </Column>
            )}
          </div>
        ))}

        <Button style={{ marginTop: "1rem" }} onClick={addAction}>
          + Добавить действие
        </Button>
      </div>
    </Section>
  );
};
