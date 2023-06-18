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
import ManageCategories from "./pages/admin/ManageCategories";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import ManageProducts from "./pages/admin/ManageProducts";
import UpdateProduct from "./pages/admin/UpdateProduct";
import SearchResults from "./pages/SearchResults";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProducts from "./pages/CategoryProducts";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/home" Component={Home} />
        <Route path="/categories" Component={Categories} />
        <Route path="/category/:slug" Component={CategoryProducts} />
        <Route path="/search-results" Component={SearchResults} />
        <Route path="/dashboard" Component={PrivateRoute}>
          <Route path="user" Component={UserDashboard} />
          <Route path="user/profile" Component={Profile} />
          <Route path="user/orders" Component={Orders} />
        </Route>
        <Route path="/dashboard" Component={AdminRoute}>
          <Route path="admin" Component={AdminDashboard} />
          <Route path="admin/manage-categories" Component={ManageCategories} />
          <Route path="admin/create-product" Component={CreateProduct} />
          <Route path="admin/product/:slug" Component={UpdateProduct} />
          <Route path="admin/users" Component={Users} />
          <Route path="admin/manage-products" Component={ManageProducts} />
        </Route>
        <Route path="/product/:slug" Component={ProductDetails} />
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
