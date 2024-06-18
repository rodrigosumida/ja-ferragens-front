import ConstructionIcon from '@mui/icons-material/Construction';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import SettingsIcon from '@mui/icons-material/Settings';

import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { MaterialReactTable } from 'material-react-table';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';

import {
    Container,
    ContainerEstatisticas,
    ContainerOpcoes,
    Content,
    Descricao,
    InfoOpcao,
    ItemOpcoes,
    LinhaHorizontal,
    ListaOpcoes,
    SubTitulo,
    TextoOpcao,
    Titulo,
    TituloEstatistica,
    TituloOpcao
} from "./styled";

import api from '../../api/axios';

const Tabela = () => {
    const [tableData, setTableData] = useState({});

    useEffect(() => {
        (async () => {
            await api.get('/peca/listar_por_quantidade')
            .then(res => {
                console.log(res.data);
                setTableData(res.data);
            })
            .catch(err => console.log(err))
        })();
    }, []);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'nome',
                header: 'Nome da peça',
                size: 140
            },
            {
                accessorKey: 'qnt_estoque',
                header: 'Quantidade em estoque',
                size: 140
            },
        ], [],
    );

    return (
        <MaterialReactTable
            enableColumnActions={false}
            enableColumnFilters={false}
            enablePagination={true}
            enableSorting={false}
            enableDensityToggle={false}
            enableFullScreenToggle={false}
            enableHiding={false}
            enableFilters={false}
            initialState={{
                density: 'compact',
                pagination: {
                    pageIndex: 0,
                    pageSize: 5
                }
            }}
            muiTableHeadCellProps={{
                sx: {
                    border: '1px solid rgba(81, 81, 81, .5)',
                    fontStyle: 'italic',
                    fontWeight: 'normal',
                },
            }}
            muiTableBodyCellProps={{
                sx: {
                    border: '1px solid rgba(81, 81, 81, .5)',
                },
            }}
            columns={columns}
            data={tableData}
            localization={MRT_Localization_PT_BR}
        />
    );
};

const Index = () => {
    return (
        <Content>
            <Container>
                <Titulo>Bem-vindo a ferramenta de controle de estoque e gerenciamento de solicitações</Titulo>
                <Descricao>Navegue entre as páginas através da header ou clicando nas opções abaixo</Descricao>
            </Container>
            <Container>
                <SubTitulo>Páginas</SubTitulo>
                <LinhaHorizontal />
                <ContainerOpcoes>
                    <ListaOpcoes>
                        <ItemOpcoes>
                            <Link to='/pecas'>
                                <SettingsIcon />
                                <InfoOpcao>
                                    <TituloOpcao>Peças</TituloOpcao>
                                    <TextoOpcao>Cadastro e informações</TextoOpcao>
                                </InfoOpcao>
                            </Link>
                        </ItemOpcoes>
                        <ItemOpcoes>
                            <Link to='/ferramentas'>
                                <PlumbingIcon />
                                <InfoOpcao>
                                    <TituloOpcao>Ferramentas</TituloOpcao>
                                    <TextoOpcao>Cadastro e informações</TextoOpcao>
                                </InfoOpcao>
                            </Link>
                        </ItemOpcoes>
                        <ItemOpcoes>
                            <Link to='/conjuntos'>
                                <ConstructionIcon />
                                <InfoOpcao>
                                    <TituloOpcao>Conjuntos</TituloOpcao>
                                    <TextoOpcao>Cadastro e informações</TextoOpcao>
                                </InfoOpcao>
                            </Link>
                        </ItemOpcoes>
                        <ItemOpcoes>
                            <Link to='/solicitacoes'>
                                <NoteAddIcon />
                                <InfoOpcao>
                                    <TituloOpcao>Solicitações</TituloOpcao>
                                    <TextoOpcao>Cadastro e informações</TextoOpcao>
                                </InfoOpcao>
                            </Link>
                        </ItemOpcoes>
                    </ListaOpcoes>
                </ContainerOpcoes>
            </Container>
            <Container>
                <SubTitulo>Estatisticas</SubTitulo>
                <LinhaHorizontal />
                <ContainerEstatisticas>
                    <TituloEstatistica>Peças com menor quantidade no estoque: </TituloEstatistica>
                    <Tabela />
                </ContainerEstatisticas>
            </Container>
        </Content>
    )
}

export default Index;