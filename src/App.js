import Auth from "./pages/Auth";
import Course from "./pages/Course";
import Main from "./pages/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact={true} path={"/"} element={<Auth />} />
        <Route exact={true} path={"/admin"} element={<Main />} />
        <Route exact={true} path={"/course"} element={<Course />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
