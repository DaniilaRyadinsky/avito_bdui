import React from "react";
import styles from "./BoxModelVisualizer.module.css";
import type { Modifier } from "../../model/types";

const colors = {
  margin: "#F6B26B",
  padding: "#CFE8A9",
  content: "#A0C5FF",
  outline: "rgba(0,0,0,0.2)",
};

export interface BoxModelVisualizerProps {
  modifier: Modifier;
  isActive?: boolean;
  children: React.ReactNode;
}

const n = (v?: number) => v ?? 0;

export const BoxModelVisualizer = ({ modifier, children }: BoxModelVisualizerProps) => {
  const { padding = {}, margin = {} } = modifier;

  const mar = {
    top: n(margin.top),
    right: n(margin.end),
    bottom: n(margin.bottom),
    left: n(margin.start),
  };

  const pad = {
    top: n(padding.top),
    right: n(padding.end),
    bottom: n(padding.bottom),
    left: n(padding.start),
  };

  // MARGIN слои — выходят за пределы контента
  const mTopStyle: React.CSSProperties = {
    top: -mar.top,
    left: -mar.left,
    right: -mar.right,
    height: mar.top,
    backgroundColor: colors.margin,
  };
  const mBottomStyle: React.CSSProperties = {
    bottom: -mar.bottom,
    left: -mar.left,
    right: -mar.right,
    height: mar.bottom,
    backgroundColor: colors.margin,
  };
  const mLeftStyle: React.CSSProperties = {
    top: -mar.top,
    bottom: -mar.bottom,
    left: -mar.left,
    width: mar.left,
    backgroundColor: colors.margin,
  };
  const mRightStyle: React.CSSProperties = {
    top: -mar.top,
    bottom: -mar.bottom,
    right: -mar.right,
    width: mar.right,
    backgroundColor: colors.margin,
  };

  // PADDING слои — внутри контента
  const pTopStyle: React.CSSProperties = {
    top: 0,
    left: 0,
    right: 0,
    height: pad.top,
    backgroundColor: colors.padding,
  };
  const pBottomStyle: React.CSSProperties = {
    bottom: 0,
    left: 0,
    right: 0,
    height: pad.bottom,
    backgroundColor: colors.padding,
  };
  const pLeftStyle: React.CSSProperties = {
    top: pad.top,
    bottom: pad.bottom,
    left: 0,
    width: pad.left,
    backgroundColor: colors.padding,
  };
  const pRightStyle: React.CSSProperties = {
    top: pad.top,
    bottom: pad.bottom,
    right: 0,
    width: pad.right,
    backgroundColor: colors.padding,
  };

  // Контентная область (для наглядности)
  const contentInnerStyle: React.CSSProperties = {
    outline: `1px solid ${colors.outline}`,
    backgroundColor: colors.content,
    // создаём внутренний бокс, чтобы padding был виден как «ободок»
    paddingTop: pad.top,
    paddingRight: pad.right,
    paddingBottom: pad.bottom,
    paddingLeft: pad.left,
    boxSizing: "border-box",
  };

  return (
    <div className={styles.container}>
      {/* нормальный поток, чтобы контейнер имел размер */}
      <div className={styles.content} >
        {children}
      </div>

      {/* Margin overlay */}
      <div className={styles.overlay} style={mTopStyle} />
      <div className={styles.overlay} style={mLeftStyle} />
      <div className={styles.overlay} style={mBottomStyle} />
      <div className={styles.overlay} style={mRightStyle} />

      {/* Padding overlay */}
      <div className={styles.overlay} style={pTopStyle} />
      <div className={styles.overlay} style={pLeftStyle} />
      <div className={styles.overlay} style={pBottomStyle} />
      <div className={styles.overlay} style={pRightStyle} />
    </div>
  );
};

export default BoxModelVisualizer;
