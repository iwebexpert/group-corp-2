import React from "react";

export function Error() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Error 404!</h1>
      <p>Page not found</p>
    </div>
  );
}
