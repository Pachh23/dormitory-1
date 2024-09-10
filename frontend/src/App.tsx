import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ConfigRoutes from "./routes";
import "./App.css";
import './PersonInfoCard.css'; // สมมติว่าเราสร้างไฟล์ CSS แยก
import './index.css'; // หรือเส้นทางของไฟล์ CSS ที่คุณใช้

const App: React.FC = () => {
  return (
    <Router>
      <ConfigRoutes />
    </Router>
  );
};
export default App;