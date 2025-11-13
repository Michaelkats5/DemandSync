import React from "react";
import { Navigate } from "react-router-dom";

export default function Overview() {
  // Overview shows the same content as the root dashboard
  return <Navigate to="/" replace />;
}

