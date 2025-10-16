import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ScreensList from "../pages/screenList/ScreensList";
import Stats from "../pages/Stats/Stats";
import Main from "../pages/Main/Main";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ScreensList />} />
        <Route path="/builder/:screenId" element={<Main />} />
        <Route
          path="/builder"
          element={<Navigate to="/builder/new" replace />}
        />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  );
}

export default App;
