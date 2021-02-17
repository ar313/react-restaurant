import Cookies from 'js-cookie';
import JwtDecode from 'jwt-decode';
import React, { Component } from 'react';
import { connect, RootStateOrAny } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Header from '../../components/Header/Header';
import { ILinkType } from '../../shared/LinkGenerator';
import { authClearToken } from '../../store/auth/action';

interface IProps {
	links: Array<ILinkType>;
	children: React.ReactNode;
	token: string
	clearAuth: () => void;
}

class Layout extends Component<IProps, {}> {

	constructor(props: IProps) {
		super(props);
	}

	componentWillMount() {
		var cookieToken = Cookies.get('token')?? null;
		var accessToken =  cookieToken? cookieToken : '';
		
		if (accessToken.length === 0 && this.props.token.length !== 0) {
			this.props.clearAuth();
			return;
		}
	}

	render () {
		return (
			<React.Fragment>
				<Header links={this.props.links}></Header>
				{this.props.children}
			</React.Fragment>
		);
	}
}


const mapStateToProps = (state: RootStateOrAny) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		token: state.auth.token
	}
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
	return {
		clearAuth: () => dispatch(authClearToken()),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Layout);