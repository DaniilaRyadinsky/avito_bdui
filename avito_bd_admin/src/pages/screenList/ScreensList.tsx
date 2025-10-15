import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ScreensList.module.css";

interface ScreenItem {
  _id: string;
  title?: string;
  id?: string;
  name?: string;
}

const ScreensList = () => {
  const [screens, setScreens] = useState<ScreenItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScreens = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://31.56.205.210:8080/api/screen/all"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setScreens(data);
      } catch (err) {
        console.error("Error fetching screens:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchScreens();
  }, []);

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
        <Link to="/builder/new" className={styles.createButton}>
          + Создать новый экран
        </Link>
      </div>

      <div className={styles.screensGrid}>
        {screens.map((screen) => (
          <Link
            key={screen._id}
            to={`/builder/${screen._id}`}
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
            <span className={styles.viewButton}>
              {screen._id === "new"
                ? "Продолжить изменения"
                : "Открыть в Редакторе"}
            </span>
          </Link>
        ))}
      </div>

      <Link to="/stats" className={styles.statsLink}>
        Статистика →
      </Link>
    </div>
  );
};

export default ScreensList;
