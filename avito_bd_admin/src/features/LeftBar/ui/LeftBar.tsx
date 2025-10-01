import { ComponentControls } from "../../Builder/ui/ComponentControls/ComponentControls";
import { ComponentAdder } from "../../ComponentLibrary/ui/ComponentAdder/ComponentAdder";
import styles from "./LeftBar.module.css";
import Sidebar from "./sidebar/Sidebar";

const LeftBar = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.panel}>
        <ComponentAdder />
        <ComponentControls/>
      </div>
    </div>
  );
};

export default LeftBar;
