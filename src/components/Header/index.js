import React from 'react';
import { Link } from 'react-router-dom';

import logo from './logo_ferragens_negrao.png';
import MenuUser from '../MenuUser';

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
          <Link to="/conjunto">
            Conjuntos
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/ferramentas">
            Ferramentas
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/solicitacoes">
            Solicitações
          </Link>
        </NavItem>
      </NavList>

      <MenuUser />
      <AccountItem>
        <Link to="/login">
          <span>Login</span>
        </Link>
      </AccountItem>
    </Nav>
  );
}
