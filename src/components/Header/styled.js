import styled from 'styled-components';

export const Nav = styled.nav`
    background: #121212;
    display: flex;
    align-items: center;
    max-width: 100%;
    height: fit-content;
`;

export const Logo = styled.img`
    margin-right: 25px;
`;

export const NavList = styled.ul`
    display: flex;
`;

export const NavItem = styled.li`
    cursor: pointer;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    a {
        padding: 25px;
        display: block;
        color: #fff;
        font-weight: bold;
        height: 100%;
        font-size: 20px;
    }
`;

export const AccountItem = styled.div`
    margin-left: auto;
    margin-right: 25px;

    a {
        padding: 10px;
        display: block;
        color: #fff;
        font-weight: bold;
        height: 100%;
        font-size: 15px;
        background: #ed6c02;
        border-radius: 4px;
    }
`;
