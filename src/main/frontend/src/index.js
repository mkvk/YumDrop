import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Trying from "./Trying";
import LoginPage from "./LoginPage";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import AddItemToMenu from "./AddItemToMenu";
import { Route, BrowserRouter as Router} from 'react-router-dom';
import LoginDashBoard from "./LoginDashboard";
import tryingForRoutes from "./tryingForRoutes"
import OTPpage from "./OTPpage";
import errorPageForRegistration from "./errorPageForRegistration";
import MySettingsPage from "./MySettingsPage";
import OTPResetPassword from "./OTPResetPassword";
import ResetPassword from "./ResetPassword";
import chatFeature from "./chatFeature";
import loginErrorPAge from "./loginErrorPAge";
import SuccessfulRegistration from './SuccessfulRegistration';
import Home from './Home';
import MyCurrentLocation from "./MyCurrentLocation";
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import ErrorPageForRestaurantRegistration from "./ErrorPageForRestaurantRegistration";
import RestaurantRegister from "./RestaurantRegister";
import DeliveryAgentDashboard from "./DeliveryAgentDashboard";
import DeliveryAgentOTPpage from "./DeliveryAgentOTPpage";
import RestaurantLogin from "./RestaurantLogin";
import successfullyChangedPasswordPage from "./successfullyChangedPasswordPage";
import UserSettingsPageAddresses from "./UserSettingsPageAddresses";
import RestaurantDashboard from "./RestaurantDashboard";
import AppForShoppingCart from "./AppForShoppingCart";
import RestaurantAddMenuForm from "./RestaurantAddMenuForm";
import RestaurantSettingsPage from "./RestaurantSettingsPage";
import restaurantAddressesPage from "./restaurantAddressesPage";
import MyCurrentRestaurantLocation from "./MyCurrentRestaurantLocation";
import RestaurantResetpassword from "./RestaurantResetpassword";
import DeliveryAgentRegistration from "./DeliveryAgentRegistration";
import DeliveryAgentLoginForm from "./DeliveryAgentLoginForm";
import ErrorPageForDeliveryAgentRegistration from "./ErrorPageForDeliveryAgentRegistration";
import DeliveryAgentLoginErrorPage from "./DeliveryAgentLoginErrorPage";
import DeliveryAgentOTPResetPassword from "./DeliveryAgentOTPResetPassword";
import MyCart from "./MyCart";
import paymentSystemForUsers from "./paymentSystemForUsers";
import restaurantChatStartButton from "./restaurantChatStartButton";
import userChatStartButton from "./userChatStartButton";
import ActiveOrders from "./ActiveOrders";
import RestaurantActiveOrders from "./RestaurantActiveOrders";
import dishesForUserView from "./dishesForUserView";
import tryStripeCheckout from "./tryStripeCheckout";

const initialState = {
    latitude: null,
    longitude: null,
    userId: null, //doubles as a User's Email address or a restaurant's Id
    accountType: null, //identifies if account is user, restaurant, or delivery
    userSelectedRestaurant: "", //id of restaurant the user is viewing
}

const reducer = (state=initialState, action) => {

    if(action.type==="setLocation"){
        state.latitude = action.newLatitude;
        state.longitude = action.newLongitude;
    }
    else if (action.type === "setUserId"){
        state.userId = action.userId;
        state.accountType = action.accountType;
    }
    else if (action.type === "signOut") {
        state.userId = null;
        state.accountType = null;
    }
    else if (action.type === "setUserSelectedRestaurant") {
        state.userSelectedRestaurant = action.newUserSelectedRestaurant;
    }

    return state;
}

const store = createStore(reducer)

const routing = (

    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={App} />
                <Route exact path="/ErrorPageForRestaurantRegistration" component={ErrorPageForRestaurantRegistration}/>
                <Route exact path="/Home" component={Home}/>
                <Route exact path="/tryStripeCheckout" component={tryStripeCheckout}/>
                <Route exact path="/LoginPage" component={LoginPage} />
                <Route exact path="/LoginForm" component={LoginForm} />
                <Route exact path="/RegisterForm" component={RegisterForm}/>
                <Route exact path="/tryingForRoutes" component={tryingForRoutes}/>
                <Route exact path="/LoginDashBoard" component={LoginDashBoard}/>
                <Route exact path="/OTPpage" component={OTPpage}/>
                <Route exact path="/dishesForUserView" component={dishesForUserView}/>
                <Route exact path="/ActiveOrders" component={ActiveOrders}/>
                <Route exact path="/paymentSystemForUsers" component={paymentSystemForUsers}/>
                <Route exact path="/MyCart" component={MyCart}/>
                <Route exact path="/chatFeature" component={chatFeature}/>
                <Route exact path="/userChatStartButton" component={userChatStartButton}/>
                <Route exact path="/restaurantChatStartButton" component={restaurantChatStartButton}/>
                <Route exact path="/RestaurantActiveOrders" component={RestaurantActiveOrders}/>
                <Route exact path="/DeliveryAgentOTPpage" component={DeliveryAgentOTPpage}/>
                <Route exact path="/errorPageForRegistration" component={errorPageForRegistration} />
                <Route exact path="/MySettingsPage" component={MySettingsPage}/>
                <Route exact path="/OTPResetPassword" component={OTPResetPassword}/>
                <Route exact path="/ResetPassword" component={ResetPassword}/>
                <Route exact path="/loginErrorPAge" component={loginErrorPAge} />
                <Route exact path="/SuccessfulRegistration" component={SuccessfulRegistration} />
                <Route exact path="/MyCurrentLocation" component={MyCurrentLocation}/>
                <Route exact path="/RestaurantDashboard" component={RestaurantDashboard}/>
                <Route exact path="/Trying" component={Trying}/>
                <Route exact path="/AppForShoppingCart" component={AppForShoppingCart}/>
                <Route exact path="/AddItemToMenu" component={AddItemToMenu}/>
                <Route exact path="/RestaurantRegister" component={RestaurantRegister} />
                <Route exact path="/DeliveryAgentDashboard" component={DeliveryAgentDashboard}/>
                <Route exact path="/DeliveryAgentRegistration" component={DeliveryAgentRegistration}/>
                <Route exact path="/RestaurantLogin" component={RestaurantLogin}/>
                <Route exact path="/successfullyChangedPasswordPage" component={successfullyChangedPasswordPage}/>
                <Route exact path="/UserSettingsPageAddresses" component={UserSettingsPageAddresses}/>
                <Route exact path="/RestaurantAddMenuForm" component={RestaurantAddMenuForm}/>
                <Route exact path="/RestaurantSettingsPage" component={RestaurantSettingsPage}/>
                <Route exact path="/RestaurantResetpassword" component={RestaurantResetpassword} />
                <Route exact path="/restaurantAddressesPage" component={restaurantAddressesPage}/>
                <Route exact path="/MyCurrentRestaurantLocation" component={MyCurrentRestaurantLocation} />
                <Route exact path="/ErrorPageForDeliveryAgentRegistration" component={ErrorPageForDeliveryAgentRegistration}/>
                <Route exact path="/DeliveryAgentLoginForm" component={DeliveryAgentLoginForm}/>
                <Route exact path="/DeliveryAgentLoginErrorPage" component={DeliveryAgentLoginErrorPage}/>
                <Route exact path="/DeliveryAgentOTPResetPassword" component={DeliveryAgentOTPResetPassword}/>
            </div>
        </Router>
    </Provider>

)

ReactDOM.render(routing, document.getElementById('root'));