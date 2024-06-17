import styled from 'styled-components';

export const Content = styled.div`
    background: white;
    padding: 100px 150px;
    max-height: fit-content;
    margin: 0;
`;

export const Container = styled.div`
    height: fit-content;
    max-width: 100%;
    display: block;
    box-sizing: border-box;
    padding: 50px 0;
    background: red;
`;

export const Titulo = styled.h1`
    display: block;
    padding-right: 30%;
    margin-bottom: 10px;
`;

export const SubTitulo = styled.h3`
    display: block;
    padding-right: 30%;
`;

export const Descricao = styled.span`
    display: block;
    justify-self: right;
    padding-right: 30%;
`;

export const ContainerOpcoes = styled.div`
    display: block;
    background: green;
`;

export const ListaOpcoes = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ItemOpcoes = styled.li`
    cursor: pointer;

    padding: 7px;
    justify-content: center;
    align-items: center;
    display: flex;
    background: blue;
    margin: 0 auto;
    border-radius: 7px;
    border: solid 1px #ddd;

    &:hover {
        background: rgba(0, 0, 0, 0.1);
    }
`;

export const InfoOpcao = styled.div`
    padding-left: 7px;
`;

export const TituloOpcao = styled.h4`
    display: block;
`;

export const TextoOpcao = styled.span`
    display: block;
    font-size: 15px;
`;

export const LinhaHorizontal = styled.hr`
    margin: 10px 0;
`;
