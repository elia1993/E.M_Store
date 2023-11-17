import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import styled from 'styled-components';
import { ButtonContainer } from './Button';
import { ProductContext } from '../context';

export default class Navbar extends Component {
  render() {
    return (
    <ProductContext.Consumer>
      {(context) => {
        const { user } = context;

        if (user) {
          console.log('User Object:', user);
        }

        return (
          <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
            <Link to='/'>
              <img src={logo} alt="store" className="navbar-brand" />
            </Link>
            <div className="navbar-brand animated-text">
              <Link to="/" className="nav-link">
                E.M store
              </Link>
            </div>
            <div style={{ position: 'relative', left: '35%', marginLeft: 'auto' }} className="">
              {user ? (
                <div className="nav-link" style={{ marginRight: '20px' }}>
                  Welcome {user.username}
                </div>
              ) : (
                <Link to="/login" className="nav-link ">
                  Login
                </Link>
              )}
            </div>
            <Link to="/cart" className="ml-auto">
              <ButtonContainer>
                <i className="fas fa-cart-plus">my cart</i>
              </ButtonContainer>
            </Link>
          </NavWrapper>
        );
      }}
    </ProductContext.Consumer>
    );
  }
}

const NavWrapper = styled.nav`
  background: var(--mainBlue);
  .nav-link {
    color: var(--mainWhite);
    font-size: 1.3 rem;
    text-transform: capitalize;
  }
  .animated-text {
    transition: transform 0.3s ease-in-out;
  }

  .animated-text:hover {
    animation: scaleAnimation 1s ease-in-out infinite alternate;
  }

  @keyframes scaleAnimation {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.1);
    }
  }
`;
