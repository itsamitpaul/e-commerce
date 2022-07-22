import { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/helpers/PrivateRoute";
import PublicRoute from "./components/helpers/PublicRoute";
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import { AuthorizeUser } from "./components/helpers/AuthorizeUser";
import List from "./components/product/list";
import AddProduct from "./components/product/addProduct";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(AuthorizeUser());

  const onAdminLogout = () => {
    localStorage.removeItem("userData");
    setUserLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Header onAdminLogout={onAdminLogout} userLoggedIn={userLoggedIn} />
      <Switch>
        <PrivateRoute exact path="/" component={List}></PrivateRoute>
        <PublicRoute exact path="/login" component={() => <Login setUserLoggedIn={setUserLoggedIn} />}></PublicRoute>
        <PrivateRoute exact path="/add_product" component={AddProduct}></PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
