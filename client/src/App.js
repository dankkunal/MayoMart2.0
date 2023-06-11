import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import UserDashboard from "./pages/user/UserDashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/home" Component={Home} />
        <Route path="/dashboard" Component={PrivateRoute}>
          <Route path="user" Component={UserDashboard} />
          <Route path="user/profile" Component={Profile} />
          <Route path="user/orders" Component={Orders} />
        </Route>
        <Route path="/dashboard" Component={AdminRoute}>
          <Route path="admin" Component={AdminDashboard} />
          <Route path="admin/create-category" Component={CreateCategory} />
          <Route path="admin/create-product" Component={CreateProduct} />
          <Route path="admin/users" Component={Users} />
        </Route>
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/forgot-password" Component={ForgotPassword} />
        <Route path="/about" Component={About} />
        <Route path="/contact" Component={Contact} />
        <Route path="/policy" Component={Policy} />
        <Route path="*" Component={PageNotFound} />
      </Routes>
    </>
  );
}

export default App;
