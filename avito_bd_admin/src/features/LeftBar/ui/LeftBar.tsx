import { ComponentAdder } from "../../ComponentLibrary/ui/ComponentAdder/ComponentAdder";
import ComponentsWidget from "../../ComponentLibrary/ui/ComponentWidget/ComponentWidget";
import styles from "./LeftBar.module.css";
import Sidebar from "./sidebar/Sidebar";

const LeftBar = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.panel}>
        <ComponentAdder />
      </div>
    </div>
  );
};

export default LeftBar;
