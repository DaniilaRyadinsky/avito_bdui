import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LeftBar from "../../features/LeftBar/ui/LeftBar";
import { ScreenRenderer } from "../../entities/screen/ui/ScreenRenderer/ScreenRenderer";
import {
    BuilderProvider
} from "../../features/Builder/lib/builderContext";
import { useScreenData } from "../../entities/screen/lib/useScreenData";
import styles from "./Main.module.css";
import { PropertyPanel } from "../../features/PropertyPanel/ui/PropertyPanel";
import Button from "../../shared/ui/Button/Button";
import { SaveButton } from "./ui/SaveButton/SaveButton";
import { fetchScreenData } from "./api/fetch";
import SizeContainer from "./ui/SizeContainer/SizeContainer";



const Main = () => {
    const { screenId } = useParams<{ screenId: string }>();
    const [fetchedData, setFetchedData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const navigate = useNavigate();

    useEffect(() => {
        fetchScreenData(screenId, setFetchedData, setLoading, setError);
    }, [screenId]);

    // Передаем полученные данные в useScreenData
    const screen = useScreenData(fetchedData);
    console.log(screen)



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
                    <Button onClick={() => navigate("/")} > ← К списку экранов</Button>
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
                    <Button onClick={() => navigate("/")} >← К списку экранов</Button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* <Topbar /> */}
            <div className={styles.main_window}>
                <BuilderProvider screen={screen}>
                    <LeftBar />
                    <div className={styles.work_panel}>
                        <div className={styles.work_panel_top}>
                            <div className={styles.top_actions}>
                                <Button onClick={() => navigate("/")} >← К списку экранов</Button>
                            </div>
                            <SizeContainer/>
                            <SaveButton />
                        </div>
                        <div className={styles.workspace}>
                            <div
                                className={styles.screen}
                                style={{ width: screen.width, height: screen.height }}>
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
