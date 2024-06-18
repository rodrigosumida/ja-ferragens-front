import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Autocomplete,
    Button,
    Stack,
    TextField
} from '@mui/material';

import api from '../../api/axios';

import { Container, Content } from "./styled";

const FerramentaEditar = () => {
    const { id, qnt } = useParams();
    const navigate = useNavigate();

    const [ferramenta, setFerramenta] = useState({});
    const [pecas, setPecas] = useState([]);

    const [pecasValues, setPecasValues] = useState([]);

    const getPecasList = async () => {
        await api.get('/peca/listar')
        .then(res => {
            res.data.map(item => item.label = item.nome);
            setPecas(res.data);
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        (async () => {
            setPecasValues(new Array(parseInt(qnt)).fill(''));
            await getPecasList();

            await api.get(`/ferramenta/buscar/${id}`)
            .then(res => {
                setFerramenta(res.data);
                console.log(res.data);
            })
            .catch(err => console.log(err))
        })();
    }, [id, qnt]);

    const handleAtualizacao = async (values) => {
        await api.put(`/ferramenta/atualizar/${id}`, values)
        .catch(err => console.log(err));

        navigate('../ferramentas');
    };

    const handleCancela = async () => {
        navigate('../ferramentas');
    };

    return (
        <Content>
            <Container>
                <Form
                    pecas={pecas}
                    pecasValues={pecasValues}
                    setPecasValues={setPecasValues}
                    ferramenta={ferramenta}
                    onSubmit={handleAtualizacao}
                    onClose={handleCancela}
                />
            </Container>
        </Content>
    );
}

export const Form = ({ pecas, pecasValues, setPecasValues, ferramenta, onSubmit, onClose }) => {
    const [values, setValues] = useState({});

    useEffect(() => {
        setValues((prevValues) => ({ ...prevValues, pecas: pecasValues }));
    }, [pecasValues]);

    const handleSubmit = async () => {
        console.log(values);

        if (!values.codigo) {
            alert('Código da ferramenta é obrigatório');
            return false;
        }
        if (!values.nome) {
            alert('Nome da ferramenta é obrigatório');
            return false;
        }
        if (!values.pecas || values.pecas.length < 1) {
            alert('Preencha corretamente o campo das peças');
            return false;
        }

        let vazio = false;

        values.pecas.forEach(peca => {
            if (vazio) return;
            if (!peca.peca || !peca.quantidade) {
                vazio = true;
                alert('Preencha corretamente o campo das peças');
                return;
            }
        });

        if (vazio) return;

        await onSubmit(values);
    };

    const handleCancela = () => {
        onClose();
    }

    return (
        <>
            <form onSubmit={(e) => e.preventDefault()}>
                <Stack
                    sx={{
                        width: '100%',
                        minWidth: { xs: '300px', sm: '360px', md: '400px' },
                        gap: '1.5rem',
                        margin: '5px 0'
                    }}
                >
                    <TextField
                        key='codigo'
                        label='Código'
                        name='codigo'
                        placeholder={ferramenta.codigo}
                        onChange={(e) => {
                            setValues({ ...values, codigo: e.target.value })
                            console.log(e.target.value, values)
                        }}
                    />
                    <TextField
                        key='nome'
                        label='Nome'
                        name='nome'
                        placeholder={ferramenta.nome}
                        onChange={(e) => {
                            setValues({ ...values, nome: e.target.value })
                        }}
                    />
                    {pecasValues.map((peca, index) => (
                        <>
                            <h3 style={{ margin: "5px" }}>Peca {index + 1}</h3>
                            <Autocomplete
                                key={index}
                                disablePortal
                                id='combo-box-demo'
                                name={'pecas.peca'}
                                options={pecas}
                                renderInput={(params) => <TextField {...params} label={`Peça ${index + 1}`} />}
                                onChange={(e, value) => {
                                    try {
                                        const newPecas = [...pecasValues];
                                        newPecas[index] = { ...newPecas[index], peca: value._id };
                                        setPecasValues(newPecas);
                                    } catch (err) {
                                        setValues({ ...values, [e.target.name]: '' })
                                        console.log(err);
                                    }
                                }}
                            />
                            <TextField
                                label={`Quantidade`}
                                type="number"
                                onChange={(e) => {
                                    try {
                                        if (e.target.value < 1) e.target.value = null;
                                        const newQuantidade = [...pecasValues];
                                        newQuantidade[index] = { ...newQuantidade[index], quantidade: parseInt(e.target.value) };
                                        setPecasValues(newQuantidade);
                                    } catch (err) {
                                        setValues({ ...values, [e.target.name]: '' })
                                        console.log(err);
                                    }
                                }}
                            />
                        </>
                    ))}
                </Stack>
            </form>
            <Button style={{ margin: '10px' }} onClick={handleCancela}>Cancelar</Button>
            <Button style={{ margin: '10px', float: "right" }} color="warning" variant="contained" onClick={handleSubmit}>
               Salvar
            </Button>
        </>
    )
}

export default FerramentaEditar;