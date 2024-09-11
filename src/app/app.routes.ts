import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AllRestaurantsComponent } from './components/all-restaurants/all-restaurants.component';
import { AllMenuItemsComponent } from './components/all-menu-items/all-menu-items.component';
import { AddRestaurantComponent } from './components/add-restaurant/add-restaurant.component';
import { CartComponent } from './components/cart/cart.component';
import { AddMenuItemsComponent } from './components/add-menu-items/add-menu-items.component';
import { AuthGuard } from './guards/auth.guard';
import { AllCustomersComponent } from './components/all-customers/all-customers.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrdersComponent } from './components/orders/orders.component';
import { LoginGuard } from './guards/login.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UpdateCustomerFormComponent } from './components/update-customer-form/update-customer-form.component';
import { UpdateRestaurantFormComponent } from './components/update-restaurant-form/update-restaurant-form.component';
import { UpdateMenuItemFormComponent } from './components/update-menu-item-form/update-menu-item-form.component';
import { AllDeliveryDriversComponent } from './components/all-delivery-drivers/all-delivery-drivers.component';
import { NotLoginGuard } from './guards/not-login.guard';
import { AllCouponsComponent } from './components/all-coupons/all-coupons.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'home', component:HomeComponent},
    {path: 'login', component:LoginComponent, canActivate:[NotLoginGuard]},
    {path: 'signup', component:SignupComponent, canActivate:[NotLoginGuard]},
    {path: 'resetpassword', component:ForgotPasswordComponent, canActivate:[NotLoginGuard]},
    {path: 'restaurants', component:AllRestaurantsComponent},
    {path: 'customers', component:AllCustomersComponent, canActivate:[LoginGuard]},
    {path: 'orders', component:OrdersComponent, canActivate:[LoginGuard]},
    {path: 'coupons', component:AllCouponsComponent, canActivate:[LoginGuard]},
    {path: 'drivers', component:AllDeliveryDriversComponent, canActivate:[AuthGuard]},
    {path: 'menu/:restaurantid', component:AllMenuItemsComponent},
    {path: 'addrestaurant', component:AddRestaurantComponent, canActivate:[AuthGuard]},
    {path: 'addmenu', component:AddMenuItemsComponent, canActivate:[AuthGuard]},
    {path: 'cart', component:CartComponent, canActivate:[LoginGuard]},
    {path: 'profile/:id',component:ProfileComponent, canActivate:[LoginGuard]},
    {path: 'updatecustomer/:id',component:UpdateCustomerFormComponent, canActivate:[LoginGuard]},
    {path: 'updaterestaurant/:id',component:UpdateRestaurantFormComponent, canActivate:[AuthGuard]},
    {path: 'updatemenuitem/:restaurantid/:itemid',component:UpdateMenuItemFormComponent, canActivate:[AuthGuard]}
];
