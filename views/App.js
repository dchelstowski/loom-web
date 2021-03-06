import React from 'react'
import { render } from 'react-dom'
import NavLink from './NavLink'
import Features from './Features'
import Devices from './Devices'

export default React.createClass({
	render() {
		return (
			<div className="app">
				<div className="app-header">
					<ul className="nav nav-tabs" role="nav">
						<li className="nav-top nav-home"><NavLink to="/" onlyActiveOnIndex><img className="logo" src={'assets/loomgreen.png'} width="50px" height="50px"/><p className="app-title">Loom</p></NavLink></li>
						<li className="nav-top"><NavLink to="/settings">Settings</NavLink></li>
						<li className="nav-top"><NavLink to="/features">Features</NavLink></li>
						<li className="nav-top"><NavLink to="/devices">Devices</NavLink></li>
						<li className="nav-top"><NavLink to="/run">Run Tests</NavLink></li>
						</ul>
				</div>
				<div className="page">
					{this.props.children}
				</div>
			</div>
		)
	}
})