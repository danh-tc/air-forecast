"use client";

import React, { useState } from "react";
import "./api-button.scss";
import { buildAQIData } from "../../libs/utils";

export default function APIButton() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const handleCallAPI = async () => {
    setLoading(true);
    setResponse(null);

    const data = buildAQIData(
      new Date(new Date().getTime() + 7 * 60 * 60 * 1000),
      12,
      34
    ); // returns 25 objects
    console.log("Payload:", data);

    try {
      const res = await fetch("http://localhost:8000/predict_aqi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }), // wrapper for backend
      });

      const json = await res.json();
      setResponse(json);
    } catch (err) {
      console.error("API call failed:", err);
      setResponse({ error: "API call failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="api-button-container">
      <button onClick={handleCallAPI} disabled={loading} className="api-button">
        {loading ? "Calling API..." : "Generate & Call API"}
      </button>

      {response && (
        <pre className="api-response">{JSON.stringify(response, null, 2)}</pre>
      )}
    </div>
  );
}
