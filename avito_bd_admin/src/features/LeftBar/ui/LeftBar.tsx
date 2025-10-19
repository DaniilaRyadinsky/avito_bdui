import styles from "./LeftBar.module.css";
import Sidebar from "./sidebar/Sidebar";
import { useState } from "react";
import ColorsWidget from "./ColorsWiget/ColorsWidget";
import ComponentsWidget from "../../ComponentLibrary/ui/ComponentWidget/ComponentWidget";
import { ComponentControls } from "./ComponentControls/ComponentControls";
import ComponentTree from "../../ComponentTree/ui/ComponentTree";
import BottomSheetTree from "../../ComponentTree/ui/BottomSheetTree";
import { TemplateManager } from "./TemplateManager/TemplateManager";
import SnackbarTree from "../../ComponentTree/ui/SnackbarTree";

const LeftBar = () => {
  const [mode, setMode] = useState<"comp" | "col" | "var">("comp");

  return (
    <div className={styles.container}>
      <Sidebar mode={mode} setMode={setMode} />
      <div className={styles.panel}>
        {mode == "comp" && (
          <>
            <ComponentsWidget />
            <ComponentControls />
            <div>Дерево компонентов</div>
            <ComponentTree />
            <BottomSheetTree />
            <SnackbarTree />
          </>
        )}
        {mode == "col" && <ColorsWidget />}
        {mode == "var" && <TemplateManager />}
        <div></div>
      </div>
    </div>
  );
};

export default LeftBar;
