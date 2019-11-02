import React, { Component } from "react";
import "./App.css";
import LoginPage from "./LoginPage";
import './LoginFormCSS.css'
import "bootstrap/dist/css/bootstrap.min.css";
import {Modal, Button, Dropdown, DropdownButton} from "react-bootstrap";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
class App extends Component {
    state = {
        loginSelect: false,
        userLoginOption: false,
        restaurantLoginOption: true,
        deliveryAgentLoginOption: false,
        closeAllOptionsOfSelectionForm: false,
        restaurantPrimaryEmailId: "",
        restaurantId: "",
        restaurantPassword: "",
        redirect: false,
        forgotPasswordSelect: false,
        emailSelectForgotPassword: false,
        restaurantTemporaryPassword: ""
    };


    login = () => { debugger;
        fetch('/restaurantLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                user_name: this.state.userName,
                userPassword: this.state.userPassword
            }),
        }).then(res => {

            alert("Entered");
            alert(res.status);
            alert(res)
            if (res.status !== 200) {
                this.setState({redirect: true, restaurantRegister: false});
                this.forwardToLoginErrorPage();
                alert("Hey going to Error page");
            }else {
                this.setState({redirect: true, restaurantRegister: false});
                this.forwardToLoginDashboard();
                alert("Hey going to Login Dashboard page");
            }


        })

    }

    passwordChange  = () => { debugger;
        fetch('/setNewRestaurantPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                userEmail: this.state.userEmail,
                temporaryPassword: this.state.userTemporaryPassword,
                newPassword: this.state.userPassword
            }),
        }).then(res => {

            alert("Entered");
            alert(res.status);
            alert(res)
            if (res.status !== 200) {
                this.setState({redirect: true, userRegister: false});
                this.forwardToLoginErrorPage();
                alert("Hey going to Error page");
            }else {
                this.setState({redirect: true, userRegister: false, emailSelectForgotPassword: false, forgotPasswordSelect: true});
                this.forwardToSuccessfullyChangedPasswordPage();
                alert("Hey going to Login Dashboard page");
            }


        })

    }

    forgotPasswordAPI = () => { debugger;
        fetch('/forgotRestaurantPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                userEmail: this.state.userEmail
            }),
        }).then(res => {

            alert("Entered");
            alert(res.status);
            if (res.status !== 200) {
                this.setState({redirect: true, userRegister: false});
                this.forwardToLoginErrorPage();
                alert("Hey going to Error page");
            }else {
                this.setState({redirect: true, userRegister: false, emailSelectForgotPassword: false, forgotPasswordSelect: true});
                alert("Hey going to Login Dashboard page");
            }


        })

    }

    forwardToLoginErrorPage = () => {
        this.props.history.push("/loginErrorPAge")
    }

    forwardToSuccessfullyChangedPasswordPage = () => {
        this.props.history.push("/successfullyChangedPasswordPage");
    }






    forwardToRegister = () => {
        this.props.history.push('/RegisterForm')
    }

    forwardToLoginDashboard = () => {
        this.props.history.push('/RestaurantDashboard')
    }

    forwardToLoginForm = () => {
        this.props.history.push('/LoginForm')
    }


    handleRestaurantPassword = (event) => {
        this.setState({restaurantPassword: event.target.value})
    }


    handleRestaurantLoginOption = () => {
        this.setState({ loginSelect: false, selectLoginOption:false, deliveryAgentLoginOption: false, restaurantLoginOption: true  });
    }

    handleRestaurantTemporaryPassword = (event) => {
        this.setState({restaurantTemporaryPassword : event.target.value})
    }

    closeAllOptionsOfSelectionForm= () => {
        this.setState({ userLoginOption: false, loginSelect:false, restaurantLoginOption: false, deliveryAgentLoginOption: false, forgotPasswordSelect: false, emailSelectForgotPassword: false  });
    }

    handleForgotPasswordChange = () => {
        this.setState({userLoginOption: false, loginSelect:false, restaurantLoginOption: false, deliveryAgentLoginOption: false, emailSelectForgotPassword: true  });
    }



    handleRestaurantPasswordChange =  (event) => {
        this.setState({
            restaurantPassword: event.target.value,
        });
    };

    handleRestaurantEmailIDChange =  (event) => {
        this.setState({
            restaurantPrimaryEmailId: event.target.value,
        });
    };

    handleRestaurantID = (event) => {
        this.setState({
            restaurantId: event.target.value
        })
    }


    render() {

        return( <div className="App">
            <header>
                <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet"
                      id="bootstrap-css"/>
                <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"/>
                <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet"
                      id="bootstrap-css"/>
                <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"/>
                <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"/>
                <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet"
                      id="bootstrap-css"/>
                <script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"/>
                <script src="//code.jquery.com/jquery-1.11.1.min.js"/>
                <nav className=" navbar navbar-expand-lg navbar-dark ">
                    <div className="container">
                        <a className="navbar-brand " href="#">YumDrop</a>
                        <div className="collapse navbar-collapse" id="navBarLinks">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link" onClick={this.forwardToLoginForm}><i
                                        className="fa fa-fw fa-user"/>Login</a>
                                </li>
                                <li className="nav-item" id="SignUpID">
                                    <a className="nav-link" onClick={this.forwardToRegister}>Sign Up</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="view rgba-black-light">
                <br/><br/><br/>
                <div className="">
                    <li>
                        <p id="para"> Are you hungry?</p>
                    </li>
                    <ul className="list-unstyled">
                        <br/><br/><br/><br/>
                        <li>
                            <div className="form-row" data-wow-delay="0.4s">
                                <div className="col-md-5" id="firstbar">
                                    <div className="md-form">
                                        <select className="form-control" id="exampleFormControlSelect1">
                                            <option>Bloomington, Indiana</option>
                                            <option>Indianapolis, Indiana</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="md-form">
                                        <input type="text"
                                               placeholder="Search for food, cuisines, restaurants here.."
                                               id="form5" className="form-control validate"/>

                                    </div>
                                </div>
                                <div className="col-md-1" id="buttonOrder">
                                    <div className="md-form">
                                        <button className="btn btn-lg btn-danger">Search</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <Modal
                show={this.state.restaurantLoginOption}
                onHide={this.closeAllOptionsOfSelectionForm}
                animation={false}
                centered id="modal"
            >
                <div className="container">
                    <div className="row">
                        <div className="main">
                            <div className="login-form">
                                <form onSubmit={this.login.bind(this)}>
                                    <h2 className="text-center">Restaurant Login</h2>
                                    <div className="social-btn text-center">
                                    </div>
                                    <div className="form-group">
                                        <input value={this.state.restaurantPrimaryEmailId}
                                               onChange={this.handleRestaurantEmailIDChange} type="text"
                                               className="form-control" placeholder="Email ID"
                                               pattern="[a-z][A-Z]"
                                               required="required"/>
                                    </div>
                                    <div className="form-group">
                                        <input value={this.state.restaurantId}
                                               onChange={this.handleRestaurantID} type="text"
                                               className="form-control" placeholder="Restaurant ID"
                                               pattern="[a-z][A-Z]"
                                               required="required"/>
                                    </div>

                                    <div className="form-group">
                                        <input value={this.state.restaurantPassword}
                                               onChange={this.handleRestaurantPassword} type="password"
                                               className="form-control" placeholder="Password"
                                               pattern="[a-z][A-Z]"
                                               required="required"/>
                                    </div>
                                    <div className="col-md-12 offset-7 form-group">
                                        <a href="#" onClick={this.handleForgotPasswordChange}>Forgot Password?</a>
                                    </div>

                                    <div className="form-group">
                                        <button onClick={this.login.bind(this)} type="submit"
                                                className="btn btn-primary btn-lg btn-block login-btn">Login
                                        </button>
                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>

            </Modal>



            <Modal
                show={this.state.emailSelectForgotPassword}
                onHide={this.closeAllOptionsOfSelectionForm}
                animation={false}
                centered id="modal"
            >
                <div className="container">
                    <div className="row">
                        <div className="main">
                            <div className="login-form">
                                <form onSubmit={this.forgotPasswordAPI.bind(this)}>
                                    <h2 className="text-center">Enter your Email ID</h2>
                                    <div className="form-group">
                                        <input value={this.state.userEmail}
                                               onChange={this.handleUserEmailIDChange} type="text"
                                               className="form-control" placeholder="Email ID"
                                               pattern="[a-z][A-Z]"
                                               required="required"/>
                                    </div>

                                    <div className="form-group">
                                        <button onClick={this.forgotPasswordAPI.bind(this)} type="submit"
                                                className="btn btn-primary btn-lg btn-block login-btn">Submit
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>

            </Modal>


            <Modal
                show={this.state.forgotPasswordSelect}
                onHide={this.closeAllOptionsOfSelectionForm}
                animation={false}
                centered id="modal"
            >
                <div className="container">
                    <div className="row">
                        <div className="main">
                            <div className="login-form">
                                <form onSubmit={this.passwordChange.bind(this)}>
                                    <h2 className="text-center">Change Password</h2>

                                    <div className="form-group">
                                        <input value={this.state.restaurantTemporaryPassword}
                                               onChange={this.handleRestaurantTemporaryPassword} type="password"
                                               className="form-control" placeholder="Temporary Password"
                                               pattern="[a-z][A-Z]"
                                               required="required"/>
                                    </div>
                                    <div className="form-group">
                                        <input value={this.state.restaurantPassword}
                                               onChange={this.handleRestaurantPassword} type="password"
                                               className="form-control" placeholder="Password"
                                               pattern="[a-z][A-Z]"
                                               required="required"/>
                                    </div>

                                    <div className="form-group">
                                        <button onClick={this.passwordChange.bind(this)} type="submit"
                                                className="btn btn-primary btn-lg btn-block login-btn">Submit
                                        </button>
                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>

            </Modal>




            <div className="how-section1">
                <div className="row">
                    <div className="col-md-6 how-img">
                        <img src="https://previews.123rf.com/images/juliasart/juliasart1708/juliasart170800074/83585916-colorful-cafe-isometric-restaurant-building-cartoon-vector-icon-flat-isometric-design-.jpg"
                             className="rounded-circle img-fluid" alt=""/>
                    </div>
                    <div className="col-md-6">
                        <h4>Local favorites</h4>
                        <h4 className="subheading">Satisfy any craving with delivery from popular neighborhood restaurants and chains. Reorder go-tos or find something new.</h4>

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <h4>Delivery to your doorstep</h4>
                        <h4 className="subheading">Get great food delivered or save time and money and preorder for pick up. Either way, order tracking and updates keep you in the know.</h4>

                    </div>
                    <div className="col-md-6 how-img">
                        <img src="https://cdn4.vectorstock.com/i/1000x1000/05/13/man-holding-pizza-box-and-courier-bag-vector-17210513.jpg"
                             className="rounded-circle img-fluid" alt=""/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 how-img">
                        <img src="https://cdn5.vectorstock.com/i/1000x1000/37/04/food-delivery-icon-image-vector-16143704.jpg"
                             className="rounded-circle img-fluid" alt=""/>
                    </div>
                    <div className="col-md-6">
                        <h4>Pickup or delivery from restaurants near you</h4>

                        <p className="text-muted">Explore restaurants that deliver near you, or try yummy takeout fare. With a place for every taste, it’s easy to find food you crave, and order online or through the YumDrop app. Find great meals fast with lots of local menus. Enjoy eating the convenient way with places that deliver to your door..</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <h4>Easy Pay</h4>
                        <p className="text-muted">Pay for food with one click of a button.
                            Multiple payment options. Choose a payment method that works best for you</p>
                    </div>
                    <div className="col-md-6 how-img">
                        <img src="https://www.trzcacak.rs/myfile/full/377-3774169_payment-channel-payment-channel-payment-channel-payment-bank.png"
                             className="rounded-circle img-fluid" alt=""/>
                    </div>
                </div>
            </div>
        </div>);
    }
}
export default App;