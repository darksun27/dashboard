import { useAuth } from 'contexts/auth';
import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';
import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  SignIn as SignInView,
  SignUp as SignUpView,
  Account as AccountView,
  Sale as SaleView
} from './views';

const Routes = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return (
      <Switch>
        <Redirect exact from="/" to="/sign-in" />
        <RouteWithLayout
          component={SignUpView}
          exact
          layout={MinimalLayout}
          path="/sign-up"
        />
        <RouteWithLayout
          component={SignInView}
          exact
          layout={MinimalLayout}
          path="/sign-in"
        />
        <RouteWithLayout
          component={SaleView}
          exact
          layout={MinimalLayout}
          path="/sale/:user/:course"
        />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <RouteWithLayout
        component={SaleView}
        exact
        layout={MinimalLayout}
        path="/sale/:user/:course"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/bankDetails"
      />
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
