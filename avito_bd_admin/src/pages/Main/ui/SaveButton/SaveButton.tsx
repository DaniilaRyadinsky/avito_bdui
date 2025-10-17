import { useState } from "react";
import { useBuilder } from "../../../../features/Builder/lib/builderContext";
import { useNavigate } from "react-router-dom";
import Button from "../../../../shared/ui/Button/Button";
import styles from './SaveButton.module.css'
import { fetchCreateScreen, fetchReloadScreen, fetchUpdateScreen } from "../../api/fetch";

export const SaveButton = () => {
    const { screen } = useBuilder();
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSave = async () => {
        if (!screen) return;

        setSaving(true);
        setMessage(null);

        try {
            const isNewScreen = screen._id === "new";
            const screenData = {
                ...screen,
                _id: isNewScreen ? `temp-${Date.now()}` : screen._id,
            };

            let result;
            if (isNewScreen) {
                result = await fetchCreateScreen(screenData);
            } else {
                result = await fetchUpdateScreen(screenData, screen._id);
            }

            if (isNewScreen && result.id) 
                navigate(`/builder/${result.id}`)
            
            setMessage(isNewScreen ? "Экран успешно создан!" : "Изменения успешно сохранены!");
            if (!isNewScreen ) {
                console.log("fetch")
                fetchReloadScreen(screen._id)
            }

        } catch (err) {
            setMessage(`Ошибка: ${err instanceof Error ? err.message : "Неизвестная ошибка"}`);
        } finally {
            setSaving(false);
            setTimeout(() => setMessage(null), 3000);
        }
    };

    return (
        <div className={styles.saveSection}>
            <Button
                onClick={handleSave}
                disabled={saving}
            >
                {saving
                    ? "Сохранение..."
                    : screen?._id === "new"
                        ? "Создать экран"
                        : "Сохранить изменения"}
            </Button>
            {message && (
                <div
                    className={
                        message.includes("Ошибка")
                            ? styles.errorMessage
                            : styles.successMessage
                    }
                >
                    {message}
                </div>
            )}
        </div>
    );
};