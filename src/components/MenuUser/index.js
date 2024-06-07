import * as React from 'react';
import { useDispatch } from 'react-redux';

import * as actions from '../../store/modules/userType/actions';

import { Button, Menu, MenuItem } from '@mui/material';

export default function MenuUser() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickAdmin = () => {
    dispatch(actions.changeUserAdmin());
    setAnchorEl(null);
  };

  const handleClickAprovador = () => {
    dispatch(actions.changeUserAprovador());
    setAnchorEl(null);
  };

  const handleClickSolicitante = () => {
    dispatch(actions.changeUserSolicitante());
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Mudar usuário
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClickAdmin}>Admin</MenuItem>
        <MenuItem onClick={handleClickAprovador}>Aprovador</MenuItem>
        <MenuItem onClick={handleClickSolicitante}>Solicitante</MenuItem>
      </Menu>
    </div>
  );
}