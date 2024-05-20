import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Protected from "./pages/Protected";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Protected />}>
          <Route path="/home" element={<Feed />} />
          <Route path="/profile" element={<h1>profile</h1>} />
          <Route path="/settings" element={<h1>settings</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
