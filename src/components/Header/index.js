import React from 'react';
import { Link } from 'react-router-dom';

import logo from './logo_ferragens_negrao.png';
import MenuUser from '../MenuUser';

import { AccountItem, ImgItem, ListItem, Logo, Nav, NavList } from './styled';

export default function Header() {
  return (
    <Nav>
      <NavList>
        <ImgItem>
          <Link to='/'><Logo src={logo}/></Link>
        </ImgItem>
        <ListItem>
          <Link to='/pecas'>Peças</Link>
        </ListItem>
        <ListItem>
          <Link to='/ferramentas'>Ferramentas</Link>
        </ListItem>
        <ListItem>
          <Link to='/conjuntos'>Conjuntos</Link>
        </ListItem>
        <ListItem>
          <Link to='/solicitacoes'>Solicitações</Link>
        </ListItem>
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
