import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./hoc/layout";
import RegisterLogin from "./components/Register_Login";
import Register from './components/Register_Login/register';
import Shop from './components/Shop';
import ResetUser from './components/Reset_user';
import ResetPass from './components/Reset_user/reset_pass';

import UserDashboard from './components/user'
import Auth from './hoc/auth';
import AddProduct from './components/user/Admin/add_products';
import ManageCategories from './components/user/Admin/manage_categories';
import ProductPage from './components/Product';
import UserCart from './components/user/cart';
import UpdateProfile from './components/user/update_profile';
import ManageSite from './components/user/Admin/manage_site';
import AddFile from './components/user/Admin/add_file';

import PageNotFound from './components/utils/page_not_found';


function Routes() {
  return (
    <Layout >
      <Switch>
      <Route path="/user/dashboard" exact component={Auth(UserDashboard,true)} />
      <Route path="/user/cart" exact component={Auth(UserCart,true)} />
      <Route path="/user/user_profile" exact component={Auth(UpdateProfile,true)} />
      <Route path="/admin/add_product" exact component={Auth(AddProduct,true)} />
      <Route path="/admin/manage_categories" exact component={Auth(ManageCategories,true)} />
      <Route path="/admin/site_info" exact component={Auth(ManageSite,true)} />
      <Route path="/admin/add_file" exact component={Auth(AddFile,true)} />
      
      <Route path="/reset_password/:token" exact component={Auth(ResetPass,false)} />
      <Route path="/reset_user" exact component={Auth(ResetUser,false)} />
      <Route path="/product_detail/:id" exact component={Auth(ProductPage,null)} />
      <Route path="/register" exact component={Auth(Register,false)} />
      <Route path="/register_login" exact component={Auth(RegisterLogin,false)} />
      <Route path="/shop" exact component={Auth(Shop,null)} />
      <Route path="/" exact component={Auth(Home,null)} />
        
      <Route component={Auth(PageNotFound,null)} />  
      </Switch>
    </Layout>
  );
}

export default Routes;
