import React from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          Vidly
        </Link>

        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          <div className='navbar-nav'>
            <NavLink className='nav-link' aria-current='page' to='/movies'>
              Movies
            </NavLink>
            <NavLink className='nav-link' to='/customers'>
              Customers
            </NavLink>
            <NavLink className='nav-link' to='/rentals'>
              Rentals
            </NavLink>
            {!user && (
              <React.Fragment>
                <NavLink className='nav-link' to='/login'>
                  Login
                </NavLink>
                <NavLink className='nav-link' to='/register'>
                  Register
                </NavLink>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <NavLink className='nav-link' to='/profile'>
                  {user.name}
                </NavLink>
                <NavLink className='nav-link' to='/logout'>
                  Logout
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
