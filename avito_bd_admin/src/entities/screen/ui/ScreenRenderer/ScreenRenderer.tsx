import React from "react";

import styles from "./ScreenRenderer.module.css";
import { ComponentFactory } from "../../../components/ui/ComponentFactory/ComponentFactory";
import { useBuilder } from "../../../../features/Builder/lib/builderContext";
import type { BottomSheetComponent } from "../../../screenAddons/model/screenAddonsTypes";
import BottomSheetRenderer from "../../../screenAddons/ui/BottomSheetRenderer/BottomSheetRenderer";

export const ScreenRenderer: React.FC = () => {
  const { screen, 
    selectedComponentId,
    selectedBottomSheetId,
    selectedSnackBarId, 
    setSelectedComponent, 
    setSelectedBottomSheet, 
    setSelectedSnackBar } = useBuilder();

  if (!screen) {
    return <div className={styles.loading}>Загрузка экрана...</div>;
  }

  const handleComponentSelect = (componentId: string) => {
    setSelectedComponent(componentId);
  };

  const handleUnselect = () => {
    console.log("workspase unselect")
    setSelectedComponent(null)
    setSelectedBottomSheet(null)
    setSelectedSnackBar(null)
  }


  return (
    <div className={styles.workspace} onClick={() => {handleUnselect()}}>

      <div className={styles.workspase2}>
        <div
          className={styles.screen}
          style={{ background: screen.background, width: screen.width, height: screen.height }}>


          <div className={styles.topBar}>
            {screen.topBar.map((component, index) => (
              <ComponentFactory
                key={component._id || `topbar-${index}`}
                component={component}
                selectedId={selectedComponentId}
                onSelect={handleComponentSelect}
              />
            ))}
          </div>


          <div className={styles.content}>
            {screen.content.map((component, index) => (
              <ComponentFactory
                key={
                  component._id ? `${component._id}-${index}` : `content-${index}`
                }
                component={component}
                selectedId={selectedComponentId}
                onSelect={handleComponentSelect}
              />
            ))}
          </div>

          <div className={styles.bottomBar}>
            {screen.bottomBar.map((component, index) => (
              <ComponentFactory
                key={component._id || `bottombar-${index}`}
                component={component}
                selectedId={selectedComponentId}
                onSelect={handleComponentSelect}
              />
            ))}
          </div>

          {selectedBottomSheetId &&
            <BottomSheetRenderer/>
          }

          {/* bottomsheet */}
        </div>
      </div>
    </div>

  );
};
