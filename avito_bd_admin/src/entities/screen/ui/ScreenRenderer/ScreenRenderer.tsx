import React from "react";

import styles from "./ScreenRenderer.module.css";
import { ComponentFactory } from "../../../components/ui/ComponentFactory/ComponentFactory";
import { useBuilder } from "../../../../features/Builder/lib/builderContext";

export const ScreenRenderer: React.FC = () => {
  const { screen, selectedComponentId, setSelectedComponent } = useBuilder();

  if (!screen) {
    return <div className={styles.loading}>Загрузка экрана...</div>;
  }

  const handleComponentSelect = (componentId: string) => {
    setSelectedComponent(componentId);
  };

  return (
    <div
      className={styles.screen}
      style={{ background: screen.background }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setSelectedComponent(null);
        }
      }}
    >
      {/* Top Bar */}
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

      {/* Main Content */}
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

      {/* Bottom Bar */}
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

      {/* bottomsheet */}
      <div className={styles.bottomsheet}>
          
      </div>
    </div>
  );
};
