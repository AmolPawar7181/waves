import React, {useState} from 'react';
import {Link, withRouter} from 'react-router-dom';

import {connect, useDispatch} from 'react-redux';
import {logoutUser} from '../../../actions/user_actions';
import {Redirect} from 'react-router-dom';


function Header({user,history}) {
  const dispatch = useDispatch();
  const [toHome, settoHome] = useState(false);
	const [page, setPage] = useState([
		{
			name: 'Home',
			linkTo: '/',
			public: true
		},

		{
			name: 'Guitars',
			linkTo: '/shop',
			public: true
		}
	]);

	const [user_, setUser_] = useState([
		{
			name: 'My cart',
			linkTo: '/user/cart',
			public: false
		},
		{
			name: 'My account',
			linkTo: '/user/dashboard',
			public: false
		},
		{
			name: 'Log in',
			linkTo: '/register_login',
			public: true
		},
		{
			name: 'Log out',
			linkTo: '/user/logout',
			public: false
		}
	]);

	const logoutHandler = () => {
		dispatch(logoutUser()).then(response => {
			if (response.payload.success) {
        history.push('/');
			}
		});
	};

	const defaultLink = (item, i) =>
		item.name === 'Log out' ? (
			<div className='log_out_link' key={i} onClick={() => logoutHandler()}>
				{item.name}
			</div>
		) : (
			<Link to={item.linkTo} key={i}>
				{item.name}
			</Link>
		);

	const cartLink = (item, i) => {
		let _user = user.userData;

		return (
			<div className='cart_link' key={i}>
				<span>{_user.cart ? _user.cart.length : 0}</span>
				<Link to={item.linkTo}>{item.name}</Link>
			</div>
		);
	};

	const showLinks = type => {
		let list = [];

		if (user.userData) {
			type.forEach(item => {
				if (!user.userData.isAuth) {
					if (item.public) {
						list.push(item);
					}
				} else {
					if (item.name !== 'Log in') {
						list.push(item);
					}
				}
			});
		}

		return list.map((item, i) => {
			if (item.name !== 'My cart') {
				return defaultLink(item, i);
			} else {
				return cartLink(item, i);
			}
		});
	};

	return (
		<header className='bck_b_light'>
			<div className='container'>
				<div className='left'>
					<div className='logo'>WAVES</div>
				</div>
				<div className='right'>
					<div className='top'>{showLinks(user_)}</div>
					<div className='bottom'>{showLinks(page)}</div>
				</div>
			</div>
		</header>
	);
}

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

export default connect(mapStateToProps)(withRouter(Header));
