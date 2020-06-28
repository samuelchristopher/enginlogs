import React, { Component } from 'react'
import './App.css'
import { withFirebase } from '../Firebase'
import firebase from 'firebase/app'
import 'firebase/auth'
import AddInitial from '../addInitial'
import Details from '../booking/details'
import Cart from '../booking/cart'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Display from '../items/display'
import Header from  '../skeleton/header'
import Categories from '../items/categories'
import Messages from './messages'
import HomePage from '../pages/home'
import withAuthProtection from './withAuthProtection'
import Nav from '../skeleton/Nav'
import SignIn from '../pages/auth/SignIn'
import SignUp from '../pages/auth/SignUp'
import { SIGN_UP, SIGN_IN } from '../../constants/routes'

class App extends Component {
	constructor() {
		super()
		this.state = {
			selectedItems: {},
			collectionDate: '',
			collectionTime: '',
			returnDate: '',
			returnTime: '',
			email: '',
			items: {},
			loading: false,
			message: '',
			showMessage: false,
			authUser: null
		}
		this.selectItem = this.selectItem.bind(this)
		this.setBookingDetails = this.setBookingDetails.bind(this)
		this.setMessage = this.setMessage.bind(this)
	}

	componentDidMount() {
		this.setState({ loading: true })

		this.props.firebase.initial().on('value', snap => {
			this.setState({
				loading: false,
				items: snap.val()
			})
		})

		this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
			authUser
				? this.setState({ authUser })
				: this.setState({ authUser: null })
		})
	}

	componentWillUnmount() {
		this.listener()
	}

	selectItem(key, quantity) {
		this.setState({
			selectedItems: {
				...this.state.selectedItems,
				[key]: quantity
			}
		})
	}

	setBookingDetails(collectionDate, collectionTime, returnDate, returnTime, email) {
		this.setState({
			collectionDate,
			returnDate,
			email,
			collectionTime,
			returnTime
		})
	}

	setMessage(message) {
		this.setState({
			message,
			showMessage: true
		})
		setTimeout(() => this.setState({ showMessage: false }), 5000)
	}

	render() {
		let {
			selectedItems,
			collectionDate,
			collectionTime,
			returnTime,
			returnDate,
			email,
			items,
			loading,
			authUser
		} = this.state
		let haveDateRange = collectionDate && returnDate

		const ProtectedAdd = withAuthProtection('/')(AddInitial)

		return (
			<Router>
				<div className="app">
					<Header />
					<Nav authUser={authUser}/>
					<Messages showMessage={this.state.showMessage} message={this.state.message}/>
					<Switch>
						<Route path="/add" render={props => (<ProtectedAdd {...props} user={this.state.user} setMessage={this.setMessage}/>)} />
						<Route path={SIGN_IN} component={SignIn}/>
						<Route path={SIGN_UP} component={SignUp}/>
						<Route path="/details">
							<Details
								selectedItems={selectedItems}
								collectionDate={collectionDate}
								returnDate={returnDate}
								email={email}
								setBookingDetails={this.setBookingDetails}
								setMessage={this.setMessage}
							/>
						</Route>
						<Route path="/cart">
							<Cart
								selectItem={this.selectItem}
								selectedItems={selectedItems}
								collectionDate={collectionDate}
								returnDate={returnDate}
								haveDateRange={haveDateRange}
								items={items}
								loading={loading}
								email={email}
								setMessage={this.setMessage}
								collectionTime={collectionTime}
								returnTime={returnTime}
							/>
						</Route>
						<Route path="/bookings">
							<div>show bookings</div>
						</Route>
						<Route path="/view/sports">
							<Display items={items} category="sports" selectable={false} />
						</Route>
						<Route path="/view/electronics">
							<Display
								items={items}
								category="electronics"
								selectable={false}
							/>
						</Route>
						<Route path="/view/camp">
							<Display items={items} category="camp" selectable={false} />
						</Route>
						<Route path="/view/misc">
							<Display items={items} category="misc" selectable={false} />
						</Route>
						<Route path="/loan/sports">
							<Display
								collectionDate={collectionDate}
								returnDate={returnDate}
								selectItem={this.selectItem}
								selectable={true}
								category="sports"
								items={items}
							/>
						</Route>
						<Route path="/loan/electronics">
							<Display
								collectionDate={collectionDate}
								returnDate={returnDate}
								selectItem={this.selectItem}
								selectable={true}
								category="electronics"
								items={items}
							/>
						</Route>
						<Route path="/loan/camp">
							<Display
								collectionDate={collectionDate}
								returnDate={returnDate}
								selectItem={this.selectItem}
								selectable={true}
								category="camp"
								items={items}
							/>
						</Route>
						<Route path="/loan/misc">
							<Display
								collectionDate={collectionDate}
								returnDate={returnDate}
								selectItem={this.selectItem}
								selectable={true}
								category="misc"
								items={items}
							/>
						</Route>
						<Route path="/loan">
							<Categories isLoan={true} />
						</Route>
						<Route path="/view">
							<Categories isLoan={false} />
						</Route>

						<Route path="/loan">
							<Display
								collectionDate={collectionDate}
								returnDate={returnDate}
								selectItem={this.selectItem}
								selectable={true}
							/>
						</Route>
						<Route path="/success">
							<p>Successful booking! thanks!</p>
						</Route>
						<Route path="/dashboard">
							<p>dashboard</p>
						</Route> 
						<Route path="/">
							<div className="app__homeButtonsContainer">
								<HomePage />
								{/* <Link className="app__homeButton" to="/view">
									view
								</Link>
								<Link className="app__homeButton" to="/details">
									loan
								</Link> */}
							</div>
						</Route>
					</Switch>
				</div>
			</Router>
		)
	}
}

export default withFirebase(App)
