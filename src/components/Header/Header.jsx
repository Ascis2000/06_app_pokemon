
import React from "react";
import Nav from './Nav'
import "./Header.css"

function Header() {
  return (
    <header style={{ padding: "1rem", backgroundColor: "#f0f0f0" }}>
      <h1>Pokédex</h1>
      <Nav></Nav>
    </header>
    
  );
}

export default Header;
