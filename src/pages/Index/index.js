import ConstructionIcon from '@mui/icons-material/Construction';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import SettingsIcon from '@mui/icons-material/Settings';

import {
    Container,
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
    TituloOpcao
} from "./styled";

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
                            <SettingsIcon />
                            <InfoOpcao>
                                <TituloOpcao>Peças</TituloOpcao>
                                <TextoOpcao>Cadastro e informações</TextoOpcao>
                            </InfoOpcao>
                        </ItemOpcoes>
                        <ItemOpcoes>
                            <PlumbingIcon />
                            <InfoOpcao>
                                <TituloOpcao>Ferramentas</TituloOpcao>
                                <TextoOpcao>Cadastro e informações</TextoOpcao>
                            </InfoOpcao>
                        </ItemOpcoes>
                        <ItemOpcoes>
                            <ConstructionIcon />
                            <InfoOpcao>
                                <TituloOpcao>Conjuntos</TituloOpcao>
                                <TextoOpcao>Cadastro e informações</TextoOpcao>
                            </InfoOpcao>
                        </ItemOpcoes>
                        <ItemOpcoes>
                            <NoteAddIcon />
                            <InfoOpcao>
                                <TituloOpcao>Solicitações</TituloOpcao>
                                <TextoOpcao>Cadastro e informações</TextoOpcao>
                            </InfoOpcao>
                        </ItemOpcoes>
                    </ListaOpcoes>
                </ContainerOpcoes>
            </Container>
        </Content>
    )
}

export default Index;