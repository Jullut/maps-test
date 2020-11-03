import React, { Component } from 'react';
import axios from 'axios';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
	width: '100%',
	height: '100%'
};

class Maps extends Component {
	constructor(props) {
		super(props);

		this.state = {
			markers: []
		};
	}

	displayMarkers = () => {
		return this.state.markers.map((marker, index) => {
			return (
				<Marker
					key={index}
					id={index}
					position={{
						lat: marker.latitude,
						lng: marker.longitude
					}}
					onClick={() => console.log('You clicked me!')}
				/>
			);
		});
	};

	async componentDidMount() {
		const markerRes = await axios({
			method: 'GET',
			url: 'https://protected-scrubland-72018.herokuapp.com/markers'
		});

		const markers = markerRes.data;

		this.setState({ markers });
	}

	componentDidUpdate() {
		setTimeout(() => {
			this.setState({
				markers: []
			});
		}, 3000);
	}

	render() {
		return (
			<div>
				<Map
					google={this.props.google}
					zoom={8}
					style={mapStyles}
					initialCenter={{ lat: 47.444, lng: -122.176 }}
				>
					{this.displayMarkers()}
				</Map>
			</div>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: 'AIzaSyBI3M9rRmBaCYLUGSKAByQDxPZGijpNoGo'
})(Maps);
