import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import LeftBar from "../features/LeftBar/ui/LeftBar";
import Topbar from "../widgets/Topbar/Topbar";
import { ScreenRenderer } from "../widgets/ScreenRenderer/index";
import { BuilderProvider } from "../features/Builder/lib/builderContext";
import { useScreenData } from "../shared/lib/useScreenData";
import styles from "./Main.module.css";
import { PropertyPanel } from "../features/PropertyPanel/ui/PropertyPanel";
import { NumberInput } from "../shared/ui/NumberInput/NumberInput";

const Main = () => {
  const { screenId } = useParams<{ screenId: string }>();
  const [fetchedData, setFetchedData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [width, setWidth] = useState(420);
  const [height, setHeight] = useState(600);

  useEffect(() => {
    const fetchScreenData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (screenId) {
          console.log(`📡 Fetching screen with ID: ${screenId}`);

          const response = await fetch(
            `http://31.56.205.210:8080/api/screen/get?id=${screenId}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log("📦 Raw data from server:", data);
          setFetchedData(data);
        } else {
          throw new Error("No screen ID provided");
        }
      } catch (err) {
        console.error("Error fetching screen data:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchScreenData();
  }, [screenId]);

  // Передаем полученные данные в useScreenData
  const screen = useScreenData(fetchedData);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div>Loading screen...</div>
          <div className={styles.loadingSpinner}>⏳</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h3>Error loading screen</h3>
          <p>{error}</p>
          <Link to="/" className={styles.backLink}>
            ← Back to Screens List
          </Link>
        </div>
      </div>
    );
  }

  if (!screen) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h3>No screen data found or invalid format</h3>
          <p>Received data: {JSON.stringify(fetchedData, null, 2)}</p>
          <Link to="/" className={styles.backLink}>
            ← Back to Screens List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Topbar />

      <div className={styles.main_window}>
        <BuilderProvider screen={screen}>
          <LeftBar />
          <div className={styles.work_panel}>
            <div className={styles.work_panel_top}>
              <div className={styles.input_container}>
                <NumberInput
                  value={width}
                  min={0}
                  max={2000}
                  onChange={(e) => setWidth(e)}
                />
                <NumberInput
                  value={height}
                  min={0}
                  max={2000}
                  onChange={(e) => setHeight(e)}
                />
                <Link to="/" className={styles.screensLink}>
                  ← All Screens
                </Link>
              </div>
            </div>
            <div className={styles.workspace}>
              <div
                className={styles.screen}
                style={{ width: width, height: height }}
              >
                <ScreenRenderer />
              </div>
            </div>
          </div>
          <PropertyPanel />
        </BuilderProvider>
      </div>
    </div>
  );
};

export default Main;
