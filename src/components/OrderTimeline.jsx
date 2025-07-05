import React from "react";
import { FaCheckCircle } from "react-icons/fa";

/**
 * Modern, colorful and more descriptive order timeline.
 * - Completed: blue circle with check mark
 * - Current: bigger circle, blue border, number or icon
 * - Future: gray circle with step number or icon
 * - Progress bar colored up to current step
 */
const OrderTimeline = ({ statuses, currentIdx }) => (
  <div
    className="order-timeline"
    style={{
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      position: "relative",
      padding: "24px 0 8px 0",
      minHeight: 80,
    }}
  >
    {/* Progress Bar (background line) */}
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: 36,
        left: "7%",
        width: "86%",
        height: 6,
        background: "#e6eaf1",
        borderRadius: 3,
        zIndex: 0,
      }}
    >
      {/* Progress Fill */}
      <div
        style={{
          width: `${(currentIdx / (statuses.length - 1)) * 100}%`,
          height: "100%",
          background: "linear-gradient(90deg,#1976d2 60%,#42a5f5 100%)",
          borderRadius: 3,
          transition: "width 0.4s cubic-bezier(.5,.1,.2,1)",
        }}
      />
    </div>
    {/* Steps */}
    {statuses.map((s, idx) => {
      const isCompleted = idx < currentIdx;
      const isCurrent = idx === currentIdx;

      let circleContent, circleStyle;
      if (isCompleted) {
        circleContent = <FaCheckCircle color="#fff" size={18} />;
        circleStyle = {
          background: "linear-gradient(135deg,#1976d2 70%,#42a5f5 100%)",
          border: "2px solid #1976d2",
          color: "#fff",
        };
      } else if (isCurrent) {
        circleContent = (
          s.icon
            ? React.cloneElement(s.icon, { color: "#1976d2", size: 20 })
            : <span style={{ fontWeight: 700 }}>{idx + 1}</span>
        );
        circleStyle = {
          background: "#fff",
          border: "3px solid #1976d2",
          color: "#1976d2",
          boxShadow: "0 2px 8px 0 #1976d230",
        };
      } else {
        circleContent = (
          s.icon
            ? React.cloneElement(s.icon, { color: "#bbb", size: 18 })
            : <span style={{ fontWeight: 600 }}>{idx + 1}</span>
        );
        circleStyle = {
          background: "#f4f6fa",
          border: "2px solid #bbb",
          color: "#bbb",
        };
      }

      return (
        <div
          key={s.key}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: isCurrent ? 38 : 32,
              height: isCurrent ? 38 : 32,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: isCurrent ? 18 : 16,
              marginBottom: 8,
              marginTop: 0,
              transition: "all 0.24s cubic-bezier(.7,.2,.2,1)",
              ...circleStyle,
            }}
          >
            {circleContent}
          </div>
          <div
            style={{
              fontSize: isCurrent ? 15 : 13,
              color: isCurrent ? "#1976d2" : isCompleted ? "#1976d2" : "#888",
              fontWeight: isCurrent ? 700 : 500,
              marginTop: 3,
              textAlign: "center",
              maxWidth: 80,
              whiteSpace: "normal",
              lineHeight: 1.2,
            }}
          >
            {s.label}
          </div>
        </div>
      );
    })}
  </div>
);

export default OrderTimeline;