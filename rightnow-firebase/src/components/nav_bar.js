import React, { Component } from 'react';
import glamorous from 'glamorous';
import SignInModal from './login_modal/login_modal';
import RegisterModal from './register_modal/reg_modal';
import RegisterForm from './register_modal/reg_forms';

const NavContainer = glamorous.div({
	width: '100%',
	background: '#EBEBEB',
	display: 'flex',
	justifyContent: 'space-between'
});

const Logo = glamorous.div({
	color: '#F45B69',
	fontWeight: 600,
	fontSize: '3em',
	alignSelf: 'center',
	margin: '0.5% 1%',
	textShadow: '1px 1px gray'
});

const ButtonContainer = glamorous.div({
	width: '50%',
	display: 'flex',
	justifyContent: 'flex-end',
	marginRight: '1%'
});

const Button = glamorous.button({
	borderRadius: '7px',
	background: '#00c6fd',
	height: '65%',
	alignSelf: 'center',
	margin: '0 1%',
	padding: '0 3%',
	fontWeight: 600,
	fontSize: '1.3em',
	color: '#EBEBEB',
	':hover': {
		cursor: 'pointer',
		boxShadow: '2px 2px gray'
	}
});

const Menu = glamorous.div({
	display: 'inline-block',
	cursor: 'pointer',
	alignSelf: 'center',
	marginLeft: '20px'
});

const MenuLine = glamorous.div({
	width: '35px',
	height: '5px',
	background: 'black',
	margin: '6px 0'
});

export default class NavBar extends Component {
	constructor() {
		super();
		this.state = {
			displayLoginModal: false, // true for dev purposes. set to false prior to pull.
			displayRegModal: true, // true for dev purposes. set to false prior to pull.
			displayRegForm: false // true for dev purposes. set to false prior to pull.
		};
	}

	RegToLogModal = () => {
		this.setState({ displayRegModal: false });
		this.setState({ displayLoginModal: true });
	};

	CreateUserForm = () => {
		this.setState({ displayRegModal: false });
		this.setState({ displayRegForm: true });
	};

	render() {
		return (
			<NavContainer>
				<Logo>Right Now</Logo>
				<ButtonContainer>
					<Button onClick={() => this.setState({ displayRegModal: true })}>Sign Up</Button>
					<Button onClick={() => this.setState({ displayLoginModal: true })}>Login</Button>
					<Menu>
						<MenuLine />
						<MenuLine />
						<MenuLine />
					</Menu>
				</ButtonContainer>
				{this.state.displayLoginModal ? (
					<SignInModal closeModal={() => this.setState({ displayLoginModal: false })} />
				) : null}
				{this.state.displayRegModal ? (
					<RegisterModal
						closeModal={() => this.setState({ displayRegModal: false })}
						regToLog={() => this.RegToLogModal()}
					/>
				) : null}
				{this.state.displayRegForm ? (
					<RegisterForm closeModal={() => this.setState({ displayRegForm: false })} />
				) : null}
			</NavContainer>
		);
	}
}
