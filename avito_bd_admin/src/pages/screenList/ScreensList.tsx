import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ScreensList.module.css";
import Button from "../../shared/ui/Button/Button";
import { deleteScreen, fetchScreens } from "./api/fetch";
import type { ScreenItem } from "./model/types";



const ScreensList = () => {
  const navigate = useNavigate()

  const [screens, setScreens] = useState<ScreenItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isUpdate, setIsUpdate] = useState(true);

  useEffect(() => {
    fetchScreens(setScreens, setLoading, setError);
    setIsUpdate(false)
  }, [isUpdate]);

  const handleDeleteClick = (id: string) => {
    deleteScreen({
      id: id,
      onSuccess: () => { console.log("success") },
      onError: (e) => { console.log(e) }
    })
    setIsUpdate(true);
  }

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
          <div
            key={screen._id}
            className={styles.screenCard}
          >
            <h3 className={styles.screenName}>
              {screen.title || screen.name || screen.id || "Неназванный скрин"}
            </h3>
            <p
              className={
                screen._id === "new" ? styles.newScreenId : styles.screenId
              }
            >
              ID: {screen._id}
            </p>
            <div className={styles.btn_container}>
              <Button onClick={() => navigate(`/builder/${screen._id}`)}> {screen._id === "new"
                ? "Продолжить изменения"
                : "Открыть в Редакторе"}</Button>
              <Button onClick={() => handleDeleteClick(screen._id)}>Удалить</Button>
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
