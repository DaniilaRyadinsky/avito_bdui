import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Stats.module.css";
import { fetchStats } from "./api/fetchStats";

export interface StatsData {
  screenReceiving: Array<{ id: string; title: string; count: number }>;
  clickElements: Array<{ id: string; count: number }>;
  clickScreens: Array<{ id: string; title: string; count: number }>;
}

const Stats = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
        fetchStats(setStats, setLoading, setError);
  }, []);

  if (loading) {
    return <div className={styles.container}>Загрузка экранов...</div>;
  }

  if (error) {
    return <div className={styles.container}>Ошибка: {error}</div>;
  }
  if (!stats) {
    return <div className={styles.container}>Нет данных по статистике</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Статистика</h1>

      <Link to="/" className={styles.backLink}>
        ← Доступные экраны
      </Link>

      <div className={styles.statsSections}>
        <div className={styles.statSection}>
          <h2>Просмотры экранов</h2>
          <div className={styles.statList}>
            {stats.screenReceiving.map((item) => (
              <div key={item.id} className={styles.statItem}>
                <span className={styles.statId}>{item.title}</span>
                <span className={styles.statCount}>
                  {item.count} просмотров
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.statSection}>
          <h2>Клики по элементам</h2>
          <div className={styles.statList}>
            {stats.clickElements.map((item) => (
              <div key={item.id} className={styles.statItem}>
                <span className={styles.statId}>{item.id}</span>
                <span className={styles.statCount}>{item.count} кликов</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
