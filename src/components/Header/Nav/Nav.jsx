
import React from "react";
import { Link } from "react-router-dom";
import './Nav.css'

const Nav = () => {
	return <nav className="nav-link active">
		<ul>
			<li><Link to="/">Home</Link></li>
      <li><a href="/searchdebounce">Search Debounce</a></li>
			<li><a href="/listall">List</a></li>
		</ul>
		
	</nav>;
};

export default Nav;
