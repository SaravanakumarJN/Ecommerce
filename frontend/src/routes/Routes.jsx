import { Switch, Route } from 'react-router-dom';

import { Login } from '../components/Login/Login';
import { Register } from '../components/Register/Register';
import { PrivateRoutes } from './PrivateRoute';
import { Home } from '../components/Home/Home';
import { AdminRoutes } from './AdminRoute';
import { AdminDashboard } from '../components/AdminDashboard/AdminDashboard';
import { AdminAddProduct } from '../components/AdmimAddProduct/AdminAddProduct';
import { AdminAddCategory } from '../components/AdminAddCategory/AdminAddCategory';
import { Product } from '../components/Product/Product';
import { Cart } from '../components/Cart/Cart';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/register'>
        <Register />
      </Route>
      <Route exact path='/login'>
        <Login />
      </Route>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/product/:id'>
        <Product />
      </Route>

      <AdminRoutes
        path='/admin-dashboard'
        exact={true}
        component={<AdminDashboard />}
      ></AdminRoutes>
      <AdminRoutes
        path='/admin-dashboard/add-product'
        exact={true}
        component={<AdminAddProduct />}
      ></AdminRoutes>
      <AdminRoutes
        path='/admin-dashboard/edit/:id'
        exact={true}
        component={<AdminAddProduct />}
      ></AdminRoutes>
      <AdminRoutes
        path='/admin-dashboard/add-category'
        exact={true}
        component={<AdminAddCategory />}
      ></AdminRoutes>

      <PrivateRoutes
        path='/cart'
        exact={true}
        component={<Cart />}
      ></PrivateRoutes>
      <Route>
        <div>Page Not found</div>
      </Route>
    </Switch>
  );
};

export { Routes };
