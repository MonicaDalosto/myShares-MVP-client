import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken, selectUser } from '../store/user/selectors';
import { logOut } from '../store/user/slice';
import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const isAdmin = !user ? false : user.isAdmin;

  return (
    <Nav>
      <Logo>
        <NavLink to={isAdmin ? '/dashboard' : '/'}>
          <li>
            myShares<span>BV</span>
          </li>
        </NavLink>
      </Logo>
      <Hamburger onClick={() => setOpen(!open)}>
        <span />
        <span />
        <span />
      </Hamburger>
      {!token ? (
        <Menu open={open}>
          <MenuLink>
            <NavLink to="/login">
              <li>Login</li>
            </NavLink>
          </MenuLink>
        </Menu>
      ) : !isAdmin ? (
        <Menu open={open}>
          <MenuLink>
            <NavLink to="/">
              <li>Dashboard</li>
            </NavLink>
          </MenuLink>
          <MenuLink>
            <NavLink to="/employee-password">
              <li>Settings</li>
            </NavLink>
          </MenuLink>
          <MenuLink onClick={() => dispatch(logOut())}>
            <li>Logout</li>
          </MenuLink>
        </Menu>
      ) : (
        <Menu open={open}>
          <MenuLink>
            <NavLink to="/">
              <li>My Dashboard</li>
            </NavLink>
          </MenuLink>
          <MenuLink>
            <NavLink to="/employee-password">
              <li>My Settings</li>
            </NavLink>
          </MenuLink>
          <MenuLink>
            <NavLink to="/dashboard">
              <li>Dashboard</li>
            </NavLink>
          </MenuLink>
          <MenuLink>
            <NavLink to="/employee">
              <li>Employee</li>
            </NavLink>
          </MenuLink>
          <MenuLink>
            <NavLink to="/contract">
              <li>Contract</li>
            </NavLink>
          </MenuLink>
          <MenuLink>
            <NavLink to="/company">
              <li>Company</li>
            </NavLink>
          </MenuLink>
          <MenuLink onClick={() => dispatch(logOut())}>
            <li>Logout</li>
          </MenuLink>
        </Menu>
      )}
    </Nav>
  );
};

const MenuLink = styled.ul`
  padding: 1rem 2rem;
  text-align: center;
  cursor: pointer;

  a {
    text-decoration: none;
  }

  li {
    list-style: none;
    transition: all 0.5s ease-in;
    color: #ececec;
    font-size: 0.9rem;
  }

  &:hover li {
    color: var(--color-nav-hover);
    // text-decoration: underline;
  }
`;

const Nav = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: var(--color-primary);
  -webkit-box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
  box-shadow: 0 0.75rem 1.5remrgba (18, 38, 63, 0.03);
`;

const Logo = styled.ul`
  padding: 1rem 0;
  a {
    text-decoration: none;
  }
  li {
    font-weight: 800;
    font-size: 1.7rem;
    color: var(--color-secondary);
    list-style: none;
    transition: all 0.3s ease-in;
  }
  span {
    font-weight: 300;
    font-size: 1.3rem;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    height: 2px;
    width: 25px;
    background-color: var(--color-secondary);
    margin-bottom: 4px;
    border-radius: 5px;
  }

  @media (max-width: 1050px) {
    display: flex;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 1050px) {
    overflow: hidden;
    flex-direction: column;
    width: 100%;
    max-height: ${({ open }) => (open ? '300px' : '0')};
    transition: max-height 0.3s ease-in;
  }
`;
