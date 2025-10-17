import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import LeftBar from "../features/LeftBar/ui/LeftBar";
import Topbar from "../widgets/Topbar/Topbar";

import {
  BuilderProvider,
  useBuilder,
} from "../features/Builder/lib/builderContext";

import styles from "./Main.module.css";
import { PropertyPanel } from "../features/PropertyPanel/ui/PropertyPanel";
import { NumberInput } from "../shared/ui/NumberInput/NumberInput";

import { useScreenData } from "../entities/screen/lib/useScreenData";
import { createNewScreen } from "../entities/screen/constants/screenTemplates";
import { ScreenRenderer } from "../entities/screen/ui/ScreenRenderer/ScreenRenderer";

const SaveButton = () => {
  const { screen } = useBuilder();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSave = async () => {
    if (!screen) return;
    // эшкере
    setSaving(true);
    setMessage(null);

    try {
      const isNewScreen = screen._id === "new";

      const screenData = {
        ...screen,
        _id: isNewScreen ? `temp-${Date.now()}` : screen._id,
      };

      const url = isNewScreen
        ? "http://31.56.205.210:8080/api/screen/create"
        : `http://31.56.205.210:8080/api/screen/rewrite?id=${screen._id}`;

      const method = isNewScreen ? "POST" : "PUT";

      console.log(
        `💾 ${isNewScreen ? "Creating" : "Updating"} screen:`,
        screenData
      );

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(screenData),
      });

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}, body: ${responseText}`
        );
      }

      let result;
      if (responseText && responseText.trim() !== "") {
        result = JSON.parse(responseText);
      } else {
        result = { success: true, message: "Пустой ответ" };
      }

      console.log("✅ Save successful:", result);

      if (isNewScreen && result._id) {
        console.log("New screen ID:", result._id);
      }

      setMessage(
        isNewScreen ? "Экран успешно создан!" : "Изменения успешно сохранены!"
      );
    } catch (err) {
      setMessage(
        `Ошибка: ${err instanceof Error ? err.message : "Неизвестная ошибка"}`
      );
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className={styles.saveSection}>
      <button
        onClick={handleSave}
        disabled={saving}
        className={styles.saveButton}
      >
        {saving
          ? "Сохранение..."
          : screen?._id === "new"
          ? "Создать экран"
          : "Сохранить изменения"}
      </button>
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

        console.log("🔍 Screen ID from URL:", screenId);

        if (!screenId) {
          // Создаем новый экран с уникальными ID
          const newScreen = createNewScreen();
          console.log("🆕 Creating new screen (no ID):", newScreen);
          setFetchedData(newScreen);
          return;
        }

        if (screenId === "new") {
          // Создаем новый экран с уникальными ID
          const newScreen = createNewScreen();
          console.log("🆕 Creating new screen:", newScreen);
          setFetchedData(newScreen);
        } else {
          // Загружаем существующий экран
          console.log(`📡 Fetching screen with ID: ${screenId}`);
          const response = await fetch(
            `http://31.56.205.210:8080/api/screen/get?id=${screenId}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setFetchedData(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchScreenData();
  }, [screenId]);

  // Передаем полученные данные в useScreenData
  const screen = useScreenData(fetchedData);

  if (!screenId && loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div>Инициализация редактора...</div>
          <div className={styles.loadingSpinner}>⏳</div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div>
            {screenId === "new"
              ? "Создание нового экрана..."
              : "Загрузка экрана..."}
          </div>
          <div className={styles.loadingSpinner}>⏳</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h3>
            Ошибка {screenId === "new" || !screenId ? "создания" : "загрузки"}{" "}
            экрана
          </h3>
          <p>{error}</p>
          <Link to="/" className={styles.backLink}>
            ← К списку экранов
          </Link>
        </div>
      </div>
    );
  }

  if (!screen) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h3>Данные экрана не найдены или неверный формат</h3>
          <p>ID экрана: {screenId || "новый экран"}</p>
          <Link to="/" className={styles.backLink}>
            ← К списку экранов
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
              <div className={styles.top_actions}>
                <Link to="/" className={styles.screensLink}>
                  ← Доступные экраны
                </Link>
              </div>
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
              </div>
              <SaveButton />
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
