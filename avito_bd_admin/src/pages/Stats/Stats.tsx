import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Stats.module.css";

interface StatsData {
  screenReceiving: Array<{ id: string; count: number }>;
  clickElements: Array<{ id: string; count: number }>;
  clickScreens: Array<{ id: string; count: number }>;
}

const Stats = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://31.56.205.210:8080/api/stats/all");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className={styles.container}>Loading statistics...</div>;
  }

  if (error) {
    return <div className={styles.container}>Error: {error}</div>;
  }

  if (!stats) {
    return <div className={styles.container}>No statistics data</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Statistics</h1>

      <Link to="/" className={styles.backLink}>
        ← Back to Screens List
      </Link>

      <div className={styles.statsSections}>
        <div className={styles.statSection}>
          <h2>Screen Receiving</h2>
          <div className={styles.statList}>
            {stats.screenReceiving.map((item) => (
              <div key={item.id} className={styles.statItem}>
                <span className={styles.statId}>{item.id}</span>
                <span className={styles.statCount}>{item.count} views</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.statSection}>
          <h2>Element Clicks</h2>
          <div className={styles.statList}>
            {stats.clickElements.map((item) => (
              <div key={item.id} className={styles.statItem}>
                <span className={styles.statId}>{item.id}</span>
                <span className={styles.statCount}>{item.count} clicks</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.statSection}>
          <h2>Screen Clicks</h2>
          <div className={styles.statList}>
            {stats.clickScreens.map((item) => (
              <div key={item.id} className={styles.statItem}>
                <span className={styles.statId}>{item.id}</span>
                <span className={styles.statCount}>{item.count} clicks</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
