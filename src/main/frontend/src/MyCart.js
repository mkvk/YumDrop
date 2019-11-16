import React, { Component } from "react";
import './MySettingsPage.css';
import {connect} from "react-redux";
import './LoginDashBoardCSS.css';
import StripeCheckout from "react-stripe-checkout";


const mapStateToProps = (state)=>{
    return {
        userEmailId: state.userId
    }
}

function handleToken(token){
    console.log(token)
}
class MySettingsPage extends Component{
    state = {
        dataReceived: [],
        userName: "",
        userEmailId:  "",
        userPhoneNumber: ""
    }
    returnToLoginDahboard = () => {
        this.props.history.push('/errorPageForRegistration');
    }
    forwardToMyCurrentLocation = () => {
        this.props.history.push('/MyCurrentLocation');
    }

    forwardToPaymentPage = () => {
        this.props.history.push('/paymentSystemForUsers')
    }


    forwardToSettingsAddresses = () => {
        this.props.history.push('/UserSettingsPageAddresses')
    }

    settingsPage = () => {
        this.props.history.push('/MySettingsPage')
    }

    goBackToLoginDashboard = () => {
        this.props.history.push('/LoginDashboard')
    }

    componentDidMount() {
        let currentComponent = this;
        console.log(currentComponent.state.userEmailId);
        console.log(this.props.userEmailId);
        console.log(currentComponent.props.userEmailId)
        fetch('/getUserDataForMyCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                userEmail: currentComponent.props.userEmailId
            }),
        }).then(function(response) {
            console.log("returned");
            console.log(response);
            return response.json();
        }).then(function(data) {
            console.log(data);
            console.log(data.itemName);
            const userName = data.userName;
            console.log("Will mount username", userName);
            currentComponent.setState({
                itemName: data.itemName,
                itemQuantity: data.itemQuantity,
            });
            console.log(currentComponent.state.itemQuantity);
        })
    }

    handleTokenAPI = (token) => {
        console.log("Insdie this");
        console.log(token);
        console.log(token.card);
        console.log("Later")
        token = token.json();
        console.log(token.card);
        console.log(token.email);
        console.log(token.brand);
        console.log(token.country);
        console.log(token.cvc_check);
        console.log(token.exp_month);
        console.log(token.exp_year);
        console.log(token.funding);
        console.log(token.last4);
        console.log("End")
    }


    render() {
        let trying = this.state.data;
        console.log(trying);
        console.log(this.state.trying);
        console.log(this.state.userName);
        console.log("hey trying to run this");
        return (
            <div>
                <header>
                    <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
                    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
                    <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
                    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"/>
                    <link href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
                    <script src="//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
                    <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
                    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
                    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
                    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

                    <nav className=" navbar navbar-expand-lg navbar-dark ">
                        <div className="container">
                            <a className="navbar-brand " href="#" onClick={this.goBackToLoginDashboard}>YumDrop</a>
                            <div className="collapse navbar-collapse" id="navBarLinks">
                                <ul className="navbar-nav mr-auto">

                                    <li className="nav-item">
                                        <a className="nav-link"><i
                                            className="fa fa-fw fa-user" onClick={this.goBackToLoginDashboard}/>Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link"><i
                                            className="fa fa-fw fa-user"/>Cart</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link"   onClick={this.settingsPage} ><span>Settings</span></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                </header>
                <p>{this.props.userEmailId}</p>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-lg-4 pb-5">

                            <div className="author-card pb-3">
                                <div className="author-card-cover"
                                >
                                </div>
                                <div className="author-card-profile">
                                    <div className="author-card-avatar"><img
                                        src="https://www.caretechfoundation.org.uk/wp-content/uploads/anonymous-person-221117.jpg" />
                                    </div>

                                </div>
                            </div>
                            <div className="wizard">
                                <nav className="list-group list-group-flush">
                                    <a className="list-group-item" href="#">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div><i className="fe-icon-shopping-bag mr-1 text-muted"></i>
                                                <div className="d-inline-block font-weight-medium text-uppercase">Orders
                                                    List
                                                </div>
                                            </div>

                                        </div>
                                    </a><a className="list-group-item active" href="#"><i
                                    className="fe-icon-user text-muted" onClick={this.settingsPage}></i>Profile Settings</a><a
                                    className="list-group-item" href="#" onClick={this.forwardToSettingsAddresses}><i className="fe-icon-map-pin text-muted"></i>Addresses</a>

                                </nav>
                            </div>
                        </div>

                        <div className="col-lg-8 pb-5">
                            <form className="row">
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label htmlFor="account-fn">Item Name</label>
                                        <input className="form-control" type="text" id="account-fn"
                                               placeholder={this.state.itemName}/>
                                    </div>
                                </div>

                                <div className="col-md-2">
                                    <div className="form-group">
                                        <label htmlFor="account-email">Quantity</label>
                                        <input className="form-control" type="email" id="account-email" placeholder={this.state.userEmailId}
                                               disabled=""/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group" id="RemoveButton">
                                        <button className="delete btn btn-danger" title="Delete" data-toggle="tooltip"><i
                                            className="material-icons">Remove</i></button>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <hr className="mt-2 mb-3"/>
                                    <div className="d-flex flex-wrap justify-content-between align-items-center">
                                        <div className="custom-control custom-checkbox d-block">
                                            <input className="custom-control-input" type="checkbox"
                                                   id="subscribe_me" checked=""/>

                                        </div></div>


                                </div>
                            </form>
                            <div className="container">
                                <div className="rounded-circle">

                                    <StripeCheckout stripeKey="pk_live_qksmj6ho2DblvlfR5PNKgzea00zC51Ydfw"
                                                    amount={this.state.totalPrice}
                                                    token={this.handleTokenAPI}
                                                    name={this.state.restaurantName}


                                    />
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

        );
    }

}

export default connect(mapStateToProps) (MySettingsPage);