import React, { Component } from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import ErrorBoundry from './ErrorBoundary'
import { robots } from './robots';
import './App.css';

class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: [],
	        searchfield: ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(users => {this.setState({ robots: users})});
}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value });
	}

	render() {
		const { robots, searchfield } = this.state
	     const filteredRobots = robots.filter(robots =>{
			return robots.name.toLowerCase().includes(searchfield.toLowerCase());
		})
	     return !robots.length ? 
	     <h1>Loading</h1>:
	     	(
		<div className= 'tc'>
		 <h1 className='f1'>RoboFriends</h1>
		 <SearchBox searchChange={this.onSearchChange}/>
		 <Scroll>
		 <ErrorBoundry>
		 <CardList robots={filteredRobots} />
		 </ErrorBoundry>
		 </Scroll>
	</div>
		);
}
}

export default App;