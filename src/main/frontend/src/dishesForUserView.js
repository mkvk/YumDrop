import React from "react";
import {connect} from "react-redux";
import StarRatingComponent from "react-star-rating-component";


class dishesForUserView extends React.Component{
    state = {
        dishesForUserDisplay: [],
        restaurantDetails: [],
        rating: 3,
        restaurantName: "",
        restaurantPrimaryEmailId: "",
        numberOfUsers: ""
    }


    componentWillMount() {
        let currentComponent = this;
        console.log(this.props.restaurantId);
        console.log(this.props.emailId);
        fetch('/getAllRestaurantDishes',{
            method: 'POST',
            redirect: 'follow',
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                restaurantId: "abc12",})})
            .then(res => {
                console.log(res)
                return res.json()
            }).then(response => {
            currentComponent.setState({
                dishesForUserDisplay: response
            })
            console.log(response)}).then(res => {
            fetch('/getRestaurantDataForUserView',{
                method: 'POST',
                redirect: 'follow',
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    restaurantId: "abc12",})})
                .then(res => {
                    console.log(res)
                    return res.json()
                }).then(response => {
                currentComponent.setState({
                    restaurantDetails: response
                })
                console.log(currentComponent.state.restaurantDetails)
                console.log(currentComponent.state.restaurantDetails.restaurantRatings)
                console.log(currentComponent.state.restaurantDetails.restaurantDetails)
                console.log(currentComponent.state.restaurantDetails.restaurantName)
                console.log();
                currentComponent.setState({
                    numberOfUsers: currentComponent.state.restaurantDetails.restaurantRatings.numberOfUsers
                })
                console.log(currentComponent.state.numberOfUsers)
                console.log(currentComponent.state.restaurantDetails.restaurantRatings.overallRating)
                console.log(currentComponent.state.restaurantDetails.restaurantRatings.numberOfUsers)
        })
    })}


    forwardToSettingsPage = () => {
        this.props.history.push('/MySettingsPage');
    }

    forwardToMyCart = () => {
        this.props.history.push('/MyCart')
    }

    onClick= (event) => {
        this.forwardToSettingsPage();
    }

    signOut = () => {
        this.props.signOut();
        this.props.history.push('/');
    }

    handleClick(item) {
        console.log(item);
        console.log(this.props.emailId)

        console.log(item.dishPrice)
        fetch('/addItemToMyCart',{
            method: 'POST',
            redirect: 'follow',
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                userEmail: this.props.emailId,
                dishName: item.dishName,
                restaurantId: "abc12",
                dishPrice : item.dishPrice,
                dishQuantity : 1
            })})
            .then(res => {
                console.log(res)
                return res.json()
            })
    }

    goBackToLoginDashboard = () => {
        this.props.history.push('/LoginDashboard')
    }


    render() {
        let mapDishesForUserView = this.state.dishesForUserDisplay.map((d,itemName)=>
        {
            return(

                <tr key={itemName}>
                    <td><img src="http://placehold.it/100x100" alt="..."
                             className="img-responsive"/></td>
                    <td>{d.dishName}</td>
                    <td>{d.dishDescription}
                    </td>
                    <td>{d.dishPrice}</td>
                    <td className="td-actions">

                        <div className="col-md-8 col-sm-8 col-xs-8">
                            <a href="#" className="btn btn-success btn-product" onClick={this.handleClick.bind(this, d)}><span
                                className="glyphicon glyphicon-shopping-cart" > Add to Cart</span></a>
                        </div>
                    </td>
                </tr>





            )
        })
        return(
            <div>
                <head>
                    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
                    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
                    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                </head>
                <header>
                    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
                    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
                    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
                    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
                    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
                    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
                    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>


                    <nav className=" navbar navbar-expand-lg navbar-dark ">
                        <div className="container">
                            <a className="navbar-brand " href="#">YumDrop</a>
                            <div className="collapse navbar-collapse" id="navBarLinks">
                                <ul className="navbar-nav mr-auto">


                                    <li className="nav-item">
                                        <a className="nav-link"  onClick={this.goBackToLoginDashboard} ><span>home</span></a>
                                    </li>
                                    <li>
                                        <a className="nav-link" onClick={this.signOut}>Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
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
                                                <div className="d-inline-block font-weight-medium text-uppercase">{this.state.restaurantName}
                                                </div>
                                            </div>

                                        </div>
                                    </a>
                                    <a className="list-group-item" href="#" onClick={this.settingsPage}>
                                        <i className="fe-icon-user text-muted"></i>{this.state.restaurantPrimaryEmailId}
                                    </a>
                                    <a className="list-group-item" href="#" onClick={this.forwardToSettingsAddresses}>
                                        <i className="fe-icon-map-pin text-muted"></i><StarRatingComponent
                                        name="rate your food"
                                        starCount={5}
                                        value={this.state.rating}
                                    />
                                    </a>
                                    <a className="list-group-item active" href="#" onClick={this.forwardToMyCart}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div><i className="fe-icon-heart mr-1 text-muted"></i>
                                                <div className="d-inline-block font-weight-medium text-uppercase">No. of ratings: {this.state.numberOfUsers}
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </nav>
                            </div>
                        </div>

                        <div className="col-lg-8 pb-5">
                            <form className="row">
                                <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"/>
                                <div className="container">

                        <div className="widget-content">

                            <table className="table table-striped table-bordered">
                                <thead>
                                <tr>
                                    <th>Dish Image</th>
                                    <th>Dish Name</th>
                                    <th>Dish Description</th>
                                    <th>Dish Price</th>
                                    <th id="dishDisplayTable">Add to Cart</th>
                                </tr>
                                </thead>
                                <tbody>
                                {mapDishesForUserView}
                                </tbody>
                                <tfoot>
                                <tr>
                                    <tr className="visible-xs">
                                        <td className="text-center"><strong></strong></td>

                                    </tr>
                                </tr>
                                <tr>
                                    <td><a href="#" className="btn btn-warning"><i
                                        className="fa fa-angle-left" onClick={this.goBackToLoginDashboard}></i>Home Page</a></td>

                                    <td colSpan="2" className="hidden-xs"></td>
                                    <td></td><td></td>
                                    <td><a
                                        className="btn btn-success btn-block" onClick={this.forwardToMyCart}>My Cart <i className="fa fa-angle-right"></i></a>
                                    </td>
                                </tr>
                                </tfoot>
                            </table>

                        </div>

                                </div></form></div></div></div>
                </div>



        )
    }
}

const mapStateToProps = (state)=> {
    return {
        emailId: state.userId,
        restaurantId: state.userSelectedRestaurant
    }
}

const mapDispatchToProps = (dispatch)=> {
    return {
        setUserEmail: (evt) => dispatch({type: "setUserId", emailId: evt}),
        signOut: () => dispatch({type: "signOut"})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(dishesForUserView);