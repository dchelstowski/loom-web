import React from 'react'
import ReactDom from 'react-dom'
import FeatureBlock from './Features'
import DeviceBlock from './Devices'

export default React.createClass ({
	getFeatures: function(finished) {
		this.serverRequest = $.get('/api/features', function (result) {
			this.setState({
	    		features: result[0].features
	    	}, finished());
	    }.bind(this));
	},
	getInitialState: function() {
		return {
			features: []
		}
	},
	render: function() {
		return (
			<div>
				<div className="page-header">
					<h2>Features</h2>
					<p>View all of the features and scenarios from the selected project.</p>
				</div>
				<div className="page-content">
					<FeatureBlock
						getFeatures={this.getFeatures}
						features={this.state.features}
						selectable={false}>
					</FeatureBlock>
				</div>
			</div>
		);
	}
});