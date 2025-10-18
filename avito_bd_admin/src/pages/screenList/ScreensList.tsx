import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ScreensList.module.css";
import Button from "../../shared/ui/Button/Button";
import { deleteScreen, fetchScreens, updateScreenTitle } from "./api/fetch";
import type { ScreenItem } from "./model/types";
import { TextInput } from "../../shared/ui/TextInput/TextInput";

const ScreensList = () => {
  const navigate = useNavigate();

  const [screens, setScreens] = useState<ScreenItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingScreenId, setEditingScreenId] = useState<string | null>(null);
  const [newName, setNewName] = useState("");

  const [isUpdate, setIsUpdate] = useState(true);

  useEffect(() => {
    fetchScreens(setScreens, setLoading, setError);
    setIsUpdate(false);
  }, [isUpdate]);

  const handleDeleteClick = (id: string) => {
    deleteScreen({
      id: id,
      onSuccess: () => {
        console.log("success");
      },
      onError: (e) => {
        console.log(e);
      },
    });
    setIsUpdate(true);
  };

  const handleRenameClick = (screenId: string, currentTitle: string) => {
    setEditingScreenId(screenId);
    setNewName(currentTitle);
  };

  const handleCancelRename = () => {
    setEditingScreenId(null);
    setNewName("");
  };

  const handleSaveRename = async (screenId: string) => {
    if (!newName.trim()) {
      alert("Название не может быть пустым");
      return;
    }

    try {
      await updateScreenTitle(screenId, newName.trim());
      setEditingScreenId(null);
      setNewName("");
      setIsUpdate(true);
    } catch (error) {
      console.error("Ошибка при обновлении названия:", error);
      alert("Не удалось обновить название");
    }
  };

  if (loading) {
    return <div className={styles.container}>Загрузка экранов...</div>;
  }

  if (error) {
    return <div className={styles.container}>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Доступные экраны</h1>

      <div className={styles.actions}>
        <Button onClick={() => navigate("/builder/new")}>
          + Создать новый экран
        </Button>
      </div>

      <div className={styles.screensGrid}>
        {screens.map((screen) => (
          <div key={screen._id} className={styles.screenCard}>
            {editingScreenId === screen._id ? (
              <TextInput
                value={newName}
                onChange={setNewName}
                placeholder="Введите новое название"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  marginBottom: "10px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              />
            ) : (
              <h3 className={styles.screenName}>
                {screen.title ||
                  screen.name ||
                  screen.id ||
                  "Неназванный скрин"}
              </h3>
            )}

            <p
              className={
                screen._id === "new" ? styles.newScreenId : styles.screenId
              }
            >
              ID: {screen._id}
            </p>

            <div className={styles.btn_container}>
              <Button onClick={() => navigate(`/builder/${screen._id}`)}>
                {screen._id === "new"
                  ? "Продолжить изменения"
                  : "Открыть в Редакторе"}
              </Button>
              <Button
                style={{ background: "#e12323" }}
                onClick={() => handleDeleteClick(screen._id)}
              >
                Удалить
              </Button>

              {/* Кнопки меняются в зависимости от режима редактирования */}
              {editingScreenId === screen._id ? (
                <>
                  <Button
                    style={{ background: "#28a745" }}
                    onClick={() => handleSaveRename(screen._id)}
                  >
                    Сохранить
                  </Button>
                  <Button
                    style={{ background: "#6c757d" }}
                    onClick={handleCancelRename}
                  >
                    Отмена
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() =>
                    handleRenameClick(
                      screen._id,
                      screen.title || screen.name || screen.id || ""
                    )
                  }
                >
                  Поменять название
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Link to="/stats" className={styles.statsLink}>
        Статистика →
      </Link>
    </div>
  );
};

export default ScreensList;
