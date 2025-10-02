import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import LeftBar from "../features/LeftBar/ui/LeftBar";
import Topbar from "../widgets/Topbar/Topbar";
import { ScreenRenderer } from "../widgets/ScreenRenderer/index";
import {
    BuilderProvider,
    useBuilder,
} from "../features/Builder/lib/builderContext";
import { useScreenData } from "../shared/lib/useScreenData";
import styles from "./Main.module.css";
import { PropertyPanel } from "../features/PropertyPanel/ui/PropertyPanel";
import { NumberInput } from "../shared/ui/NumberInput/NumberInput";

const SaveButton = () => {
    const { screen } = useBuilder();
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleSave = async () => {
        if (!screen) return;

        setSaving(true);
        setMessage(null);

        try {
            const isNewScreen = screen._id === "new";

            const screenData = {
                ...screen,
                // Для нового скрина генерируем временный ID, сервер создаст постоянный
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
            console.log(`📤 Sending ${method} request to: ${url}`);

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(screenData),
            });

            console.log(
                `📥 Response status: ${response.status} ${response.statusText}`
            );

            // Проверяем, есть ли тело ответа
            const responseText = await response.text();
            console.log(`📥 Response body:`, responseText);

            if (!response.ok) {
                throw new Error(
                    `HTTP error! status: ${response.status}, body: ${responseText}`
                );
            }

            // Парсим JSON только если есть содержимое
            let result;
            if (responseText && responseText.trim() !== "") {
                result = JSON.parse(responseText);
            } else {
                result = { success: true, message: "Empty response" };
            }

            console.log("✅ Save successful:", result);

            setMessage(
                isNewScreen
                    ? "Screen created successfully!"
                    : "Screen updated successfully!"
            );

            // Если это новый скрин, можно обновить URL с новым ID
            if (isNewScreen && result._id) {
                console.log("New screen ID:", result._id);
            }
        } catch (err) {
            console.error("❌ Error saving screen:", err);
            setMessage(
                `Error: ${err instanceof Error ? err.message : "Unknown error"}`
            );
        } finally {
            setSaving(false);
            // Автоматически скрываем сообщение через 3 секунды
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
                    ? "Сохранение"
                    : screen?._id === "new"
                        ? "Создать скрин"
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
    const navigate = useNavigate();
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
                    console.log("🆕 No screen ID, creating new screen");
                    const newScreen = {
                        _id: "new",
                        type: "screen",
                        name: "New Screen",
                        background: "#FFFFFF",
                        topBar: [],
                        content: [],
                        bottomBar: [],
                        snackbars: [],
                    };
                    setFetchedData(newScreen);
                    return;
                }

                if (screenId === "new") {
                    const newScreen = {
                        _id: "new",
                        type: "screen",
                        name: "New Screen",
                        background: "#FFFFFF",
                        topBar: [],
                        content: [],
                        bottomBar: [],
                        snackbars: [],
                    };
                    setFetchedData(newScreen);
                } else {
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

    const screen = useScreenData(fetchedData);

    if (!screenId && loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>
                    <div>Initializing editor...</div>
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
                            ? "Creating new screen..."
                            : "Loading screen..."}
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
                        Error {screenId === "new" || !screenId ? "creating" : "loading"}{" "}
                        screen
                    </h3>
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
                    <p>Screen ID: {screenId || "none (new screen)"}</p>
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
                            <Link to="/" className={styles.screensLink}>
                                ← Доступные экраны
                            </Link>
                            <div className={styles.top_actions}>

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
