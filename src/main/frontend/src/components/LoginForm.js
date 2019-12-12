import React, { Component } from 'react';
import { VERIFY_USER } from '../Events'
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";

class LoginForm extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	nickname:"",
	  	error:"",
		  chatForm: true
	  };
	}

	setUser = ({user, isUser})=>{

		if(isUser){
			this.setError("User name taken")
		}else{
			this.setError("")
			this.props.setUser(user)
		}
	}

	handleSubmit = (e)=>{
		e.preventDefault()
		const { socket } = this.props
		const { nickname } = this.state
		socket.emit(VERIFY_USER, nickname, this.setUser)
	}

	handleChange = (e)=>{
		this.setState({nickname:e.target.value})
	}

	setError = (error)=>{
		this.setState({error})
	}

	render() {	
		const { nickname, error } = this.state
		return (
			<div className="login">
				<Modal
					show={this.state.chatForm}
					onHide={this.closeAllOptionsOfSelectionForm}
					animation={false}
					centered id="modal"
				>
					<form onSubmit={this.handleSubmit} className="login-form" >

						<div className="container">
							<div className="row">
								<div className="main">
									<div className="login-form">
										<form nSubmit={this.handleSubmit} >
											<h2 className="text-center">Do you want to start a chat></h2>
											<h3>Please confirm</h3>

											<h4></h4>
							 					<div className="form-group">
												<input ref={(input)=>{ this.textInput = input }}
													   type="text"
													   value={nickname}
													   onChange={this.handleChange}
													   placeholder={this.props.userEmailId}
													/>
											</div>

											<div className="form-group">
												<button onSubmit={this.handleSubmit}  type="submit"
														className="btn btn-primary btn-lg btn-block login-btn">Confirm
												</button>
											</div>
										</form>

									</div>
								</div>
							</div>
						</div>


						<div className="error">{error ? error:null}</div>

					</form></Modal>


			</div>
		);
	}
}
const mapStateToProps = (state)=>{
	return {
		userEmailId: state.userId
	}
}

const mapDispatchToProps = (dispatch)=> {
	return {
		setUserEmail: (evt) => dispatch({type: "setUserId", emailId: evt}),
		signOut: () => dispatch({type: "signOut"})
	}
}

export default  connect(mapStateToProps, mapDispatchToProps) (LoginForm)