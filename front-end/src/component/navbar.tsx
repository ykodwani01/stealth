import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/navbar.css'
// Define the type for each individual link
interface LinkItem {
  name: string;
  to: string;
}

// Define the type for the Navbar props
interface NavbarProps {
  brandName: string;
  links: LinkItem[]; // Use LinkItem[] for the links array
}

// Corrected links array using LinkItem objects
const links: LinkItem[] = [
  { name: 'Home', to: '/home' },
  { name: 'About', to: '/about' },
  { name: 'Contact', to: '/contact' },
  { name: 'Logout', to: '/logout' },
];

const Navbar: React.FC<NavbarProps> = ({ brandName }) => {

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>{brandName}</h1>
      </div>
      <div className="navbar-links">
        {links.map((link, index) => (
          <Link key={index} to={link.to} className="navbar-link">
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
