// pages/Main/Main.tsx
import LeftBar from "../features/LeftBar/ui/LeftBar";
import Topbar from "../widgets/Topbar/Topbar";
import { ScreenRenderer } from "../widgets/ScreenRenderer/index";
import { ComponentControls } from "../features/Builder/ui/ComponentControls/ComponentControls";
import { BuilderProvider } from "../features/Builder/lib/builderContext";
import { useScreenData } from "../shared/lib/useScreenData";
import screenData from "../app/data/screen.json";
import styles from "./Main.module.css";

const Main = () => {
  const screen = useScreenData(screenData);

  return (
    <div className={styles.container}>
      <Topbar />
      <div className={styles.main_window}>
        <BuilderProvider screen={screen}>
          <LeftBar />
          <div className={styles.screen_area}>
            <ScreenRenderer />
          </div>
          <div className={styles.controls_panel}>
            <ComponentControls />
          </div>
        </BuilderProvider>
      </div>
    </div>
  );
};

export default Main;
