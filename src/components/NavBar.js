import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';


const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div >
      <Navbar color='dark' dark expand="md" id="navbar">
        <NavbarBrand  href="/">DMV Halal Reviews</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {/* <NavItem>
              <NavLink href="/">All Restaurants</NavLink>
            </NavItem> */}
            {/* <NavItem>
              <NavLink href="/addRestaurant">Add New</NavLink>
            </NavItem> */}

          </Nav>
         
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;