import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={headerStyle}>
      <h1>TodoList</h1>
      <Link to="/" style={linkStyle}>Todos</Link> | <Link to="/about" style={linkStyle}>About</Link> | <Link to="/users" style={linkStyle}>Users</Link>
    </header>
  )
}

const headerStyle = {
  background: '#333',
  color: '#fff',
  padding: '10px',
  textAlign: 'center',
}
const linkStyle = {
  textDecoration: 'none',
  color: '#fff',
}

export default Header;