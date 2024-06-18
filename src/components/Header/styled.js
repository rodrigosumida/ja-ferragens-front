import styled from 'styled-components';

export const Nav = styled.nav`
    background: #121212;
    display: flex;
    align-items: center;
    max-width: 100%;
    height: fit-content;
`;

export const NavList = styled.ul`
    display: flex;
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

export const ImgItem = styled.li`
    a {
        display: flex;
    }
`;

export const Logo = styled.img`

`;

export const ListItem = styled.li`
    display: flex;
    align-items: center;
    max-width: fit-content;

    a {
        display: flex;
        color: white;
        font-weight: bold;
        font-size: 17px;
        width: 100%;
        height: 100%;
        padding: 0 15px;
        align-items: center;
    }

    &:hover {
        background: rgba(255, 255, 255, 0.1);
    }
`;
