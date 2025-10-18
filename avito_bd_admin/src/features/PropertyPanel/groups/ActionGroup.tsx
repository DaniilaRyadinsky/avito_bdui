import React, { useEffect } from "react";
import { Section } from "./Section";
import { Column } from "./FieldPrimitives";
import { SelectBox } from "../../../shared/ui/SelectBox/SelectBox";
import type {
  Action,
  ActionEvent,
  ActionType,
  ActionMethod,
  Modifier,
} from "../../../entities/components/model/componentTypes";
import Button from "../../../shared/ui/Button/Button";
import { TextInput } from "../../../shared/ui/TextInput/TextInput";
import { TextArea } from "../../../shared/ui/TextArea/TextArea";

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
  const [localActions, setLocalActions] = React.useState<Action[]>(
    actions || []
  );

  useEffect(() => {
    setLocalActions(actions || []);
  }, [actions]);

  useEffect(() => {
    const hasActions = localActions.length > 0;
    const isCurrentlyClickable = modifier?.clickable === true;

    if (hasActions && !isCurrentlyClickable) {
      console.log("Setting clickable to true because there are actions");
      onModifierChange?.({ clickable: true });
    } else if (!hasActions && isCurrentlyClickable) {
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
    setLocalActions(newActions);

    onChange(newActions);
  };

  const updateAction = (index: number, updates: Partial<Action>) => {
    const newActions = localActions.map((action, i) =>
      i === index ? { ...action, ...updates } : action
    );

    setLocalActions(newActions);

    onChange(newActions);
  };

  const removeAction = (index: number) => {
    const newActions = localActions.filter((_, i) => i !== index);

    setLocalActions(newActions);

    onChange(newActions);
  };

  const shouldShowBodyField = (method?: ActionMethod) => {
    return method === "POST" || method === "PUT";
  };

  const actionEvents: { value: ActionEvent; label: string }[] = [
    { value: "onClick", label: "По клику" },
  ];

  const actionTypes: { value: ActionType; label: string }[] = [
    { value: "navigate", label: "Навигация" },
    { value: "showSnackbar", label: "Показать уведомление" },
    { value: "showBottomSheet", label: "Показать нижнюю панель" },
    { value: "fetch", label: "HTTP запрос" },
  ];

  const actionMethods: { value: ActionMethod; label: string }[] = [
    { value: "GET", label: "GET" },
    { value: "POST", label: "POST" },
    { value: "PUT", label: "PUT" },
    { value: "DELETE", label: "DELETE" },
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

            {action.type === "fetch" && (
              <>
                <Column label="Метод запроса">
                  <SelectBox
                    value={action.method || "GET"}
                    options={actionMethods}
                    onChange={(value) =>
                      updateAction(index, { method: value as ActionMethod })
                    }
                  />
                </Column>

                <Column label="Эндпоинт">
                  <TextInput
                    value={action.endpoint || ""}
                    onChange={(value) =>
                      updateAction(index, { endpoint: value })
                    }
                    placeholder="Введите URL эндпоинта"
                  />
                </Column>

                {shouldShowBodyField(action.method) && (
                  <Column label="Тело запроса (JSON)">
                    <TextArea
                      value={
                        action.body ? JSON.stringify(action.body, null, 2) : ""
                      }
                      onChange={(value) => {
                        try {
                          const parsedBody = value
                            ? JSON.parse(value)
                            : undefined;
                          updateAction(index, { body: parsedBody });
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                      placeholder='Введите JSON тело запроса, например: {"key": "value"}'
                    />
                  </Column>
                )}

                <Column label="ID для сохранения ответа (опционально)">
                  <TextInput
                    value={action.targetId || ""}
                    onChange={(value) =>
                      updateAction(index, { targetId: value })
                    }
                    placeholder="ID переменной для сохранения ответа"
                  />
                </Column>
              </>
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
