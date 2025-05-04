import React from "react";
import { Routes, Route } from "react-router";

// pages
import Home from "./pages/Home";
import Error from "./pages/404";
import Editor from "./pages/Editor";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/editor" element={<Editor />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
