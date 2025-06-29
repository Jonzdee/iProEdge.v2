import React from "react";
import { FaRegClock, FaTruck, FaHome, FaCheckCircle } from "react-icons/fa";

const TIMELINE_STATUSES = [
  { key: "processing", label: "Processing", icon: <FaRegClock color="#888" /> },
  { key: "shipped", label: "Shipped", icon: <FaTruck color="#007bff" /> },
  { key: "outForDelivery", label: "Out for Delivery", icon: <FaHome color="#ffc107" /> },
  { key: "delivered", label: "Delivered", icon: <FaCheckCircle color="green" /> },
];

export default function StatusTimeline({ statusHistory = [] }) {
  return (
    <div>
      {TIMELINE_STATUSES.map((step, idx) => {
        const found = statusHistory.find(h => h.status === step.key);
        return (
          <div key={step.key} style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
            <span>{step.icon}</span>
            <span style={{ marginLeft: 8, fontWeight: found ? 600 : 400 }}>
              {step.label}
            </span>
            {found && (
              <span style={{ color: "#888", marginLeft: 10, fontSize: 13 }}>
                ({new Date(found.timestamp).toLocaleString()})
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}