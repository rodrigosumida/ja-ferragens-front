import styled from 'styled-components';

export const Nav = styled.nav`
    background: #121212;
    display: flex;
    align-items: center;
    max-width: 100%;
    height: fit-content;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    justify-content: space-between;
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
        color: #000;
        font-weight: bold;
        height: 100%;
        font-size: 15px;
        background: #FFF;
        border-radius: 4px;
    }

    a:hover {
        transition: 0.7s;
        transform: scale(1.2)
    }
`;

export const ImgItem = styled.li`
    a {
        display: flex;
    }
`;

export const Logo = styled.img`
    width: 12em;
    margin-left: 10px;
    margin-right: 10px;
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
        height: 35%;
        padding: 10px 15px;
        align-items: center;
    }

    a:hover {
        border-bottom: 1px solid #fff;
        transition: 1.5s;
    }
`;
