import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/home" Component={Home} />
        <Route path="/dashboard" Component={PrivateRoute}>
          <Route path="" Component={Dashboard} />
        </Route>
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/about" Component={About} />
        <Route path="/contact" Component={Contact} />
        <Route path="/policy" Component={Policy} />
        <Route path="*" Component={PageNotFound} />
      </Routes>
    </>
  );
}

export default App;
