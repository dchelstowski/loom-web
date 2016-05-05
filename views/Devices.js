import React from 'react'
import ReactDom from 'react-dom'

var Device = React.createClass({
	handleClick: function() {
		$.ajax({
			url: '/api/cukes',
			dataType: "json",
			type: 'POST',
			data: {"runId" : "12334324", "command" : "cucumber", "status" : "pending", "device" : this.props.device._id},
			success: function() {
				console.log("CUKE SENT");
			}
		});
	},
	render: function() {
		var selectDevice;
		if (this.props.selectable) {
			selectDevice = <input type="checkbox" className={"select select-item sel-dev-" + this.props.device.udid} />
		}
		return (
			<div>
				<div className="panel panel-default device-list">
					<div className={"panel-heading device-header-" + this.props.device.platformName.toLowerCase()}>
						<h2 className={"device-status " + this.props.device.status}>&#8226;</h2>
						{selectDevice}
						<a href={"#device-"+this.props.device.udid} className="device-title-info" data-toggle="collapse" className="expand-collapse">
							<h2 className={"device-type-" + this.props.device.platformName.toLowerCase()}>{this.props.device.platformName}</h2>
							<h4 className="device-name">{this.props.device.deviceName}</h4>
							<span className="caret white large" />
						</a>
					</div>
					<div className="panel-body collapse" id={"device-"+this.props.device.udid}>
						<div className="run-tests"><button className="btn btn-default" onClick={this.handleClick}>Run tests</button></div>
						<p className="device-info"><b>Version:</b> {this.props.device.platformVersion}</p>
						<p className="device-info"><b>UDID:</b> {this.props.device.udid}</p>
						<p className="device-info"><b>Status:</b> {this.props.device.status}</p>
					</div>
				</div>
			</div>
		);
	}
});

var DeviceList = React.createClass({
	render: function() {
		var selectable = this.props.selectable;
		var devices = this.props.devices.map(function(device) {
			return (
				<Device selectable={selectable} device={device} key={device._id}>
				</Device>
			);
		});
		return (
			<div className="deviceList">
				{devices}
			</div>
		);
	}
});

export default React.createClass({
	getDefaultProps : function() {
		return {
			"selectable" : false,
			"collapsed" : false
		};
	},
	loadFeaturesFromServer: function() {
		this.serverRequest = $.get('/api/devices', function (result) {
			this.setState({
				devices : result
			});
		}.bind(this));
	},
	getInitialState: function() {
		return {devices: []};
	},
	componentDidMount: function() {
		this.loadFeaturesFromServer();
		this.interval = setInterval(this.loadFeaturesFromServer, 5000);
	},
	componentWillUnmount: function() {
		clearInterval(this.interval);
	},
	render: function() {
		if (this.props.collapsed) {
			return (
				<div className="deviceBlock">
					<a href="#deviceList" data-toggle="collapse">
						<h2 className="page-title device-title">Device List</h2>
						<span className="caret black xl" />
					</a>
					<div className="collapse" id="deviceList">
		            <DeviceList selectable={this.props.selectable} devices={this.state.devices}>
		            </DeviceList>
		            </div>
	      		</div>
			);
		} else {
			return (
				<div className="deviceBlock">
					<h2>Device List</h2>
		            <DeviceList selectable={this.props.selectable} devices={this.state.devices}>
		            </DeviceList>
	      		</div>
			);
		}
	}
})