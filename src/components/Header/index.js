import React from 'react';
import { Link } from 'react-router-dom';

import logo from './logo_ferragens_negrao.png';

import { AccountItem, Logo, Nav, NavList, NavItem } from './styled';

export default function Header() {
  return (
    <Nav>
      <Link to="/">
        <Logo src={logo} alt="Logo Ferragens Negrão"/>
      </Link>

      <NavList>
        <NavItem>
          <Link to="/pecas">
            Peças
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/ferramentas">
            Ferramentas
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/requisicao">
            Requisições
          </Link>
        </NavItem>
      </NavList>
      <AccountItem>
        <Link to="/login">
          <span>Login</span>
        </Link>
      </AccountItem>
    </Nav>
  );
}
