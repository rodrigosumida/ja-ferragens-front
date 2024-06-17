import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MaterialReactTable } from 'material-react-table';
import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    TextField,
    Tooltip,
} from '@mui/material';
import { Check, Close, Delete, Edit } from '@mui/icons-material';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';

import { Tabela } from './styled';

import api from '../../api/axios';

const Solicitacoes = () => {
    const [createModalOpen, setCreateModalOpen] = useState(false);

    const [tableAbertaData, setTableAbertaData] = useState([]);
    const [tableConcluidaData, setTableConcluidaData] = useState([]);
    const [tableRejeitadaData, setTableRejeitadaData] = useState([]);

    const [ferramentaData, setFerramentaData] = useState([]);
    const [ferramentaValues, setFerramentaValues] = useState([]);

    const [pecasList, setPecasList] = useState([]);

    const [validationErrors, setValidationErrors] = useState({});

    const user = useSelector(state => state.userType.user);

    const getFerramentaList = async () => {
        await api.get('/ferramenta/listar')
        .then(res => {
            res.data.map(item => item.label = item.nome);
            setFerramentaData(res.data);
        })
        .catch(err => console.log(err));
    }

    const filtrarAbertas = (dados) => {
        const dadosFiltrados = [];
        dados.forEach(dado => {
            if (dado.status === 'AGUARDANDO APROVAÇÃO' || dado.status === 'APROVADA') {
              dadosFiltrados.push(dado);
            }
        });
        return dadosFiltrados;
    }

    const filtrarConcluidas = (dados) => {
        const dadosFiltrados = [];
        dados.forEach(dado => {
            if (dado.status === 'CONCLUÍDA') {
              dadosFiltrados.push(dado);
            }
        });
        return dadosFiltrados;
    }

    const filtrarRejeitadas = (dados) => {
        const dadosFiltrados = [];
        dados.forEach(dado => {
            if (dado.status === 'REPROVADA' || dado.status === 'CANCELADA') {
              dadosFiltrados.push(dado);
            }
        });
        return dadosFiltrados;
    }

    useEffect(() => {
        (async () => {
            await getFerramentaList();

            await api.get('/solicitacao/listar')
            .then(res => {
                setTableAbertaData(filtrarAbertas(res.data));
                setTableConcluidaData(filtrarConcluidas(res.data));
                setTableRejeitadaData(filtrarRejeitadas(res.data));
            })
            .catch(err => console.log(err))
        })();
    }, []);

    const handleCreateNewRow = async (values) => {
        if (!values.codigo) {
            alert('Código da solicitacao é obrigatório');
            return false;
        }
        if (!values.ferramentas || values.ferramentas.length < 1) {
            alert('Preencha corretamente o campo das ferramentas');
            return false;
        }

        let vazio = false;

        values.ferramentas.forEach(ferramenta => {
            if (!ferramenta.ferramenta || !ferramenta.quantidade) {
                vazio = true;
                alert('Preencha corretamente o campo das ferramentas');
                return false;
            }
        });

        if (vazio) {
            return false;
        }

        values.data_entrada = new Date();
        values.status = "AGUARDANDO APROVAÇÃO";
        
        console.log(values);
        delete values._id;
        await api.post('/solicitacao/inserir', values)
        .then(res => {
            tableAbertaData.push(res.data);
            console.log(tableAbertaData);
            setTableAbertaData([...tableAbertaData]);
        })
        .catch(err => console.log(err));
        return true;
    };

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
            tableAbertaData[row.index] = values;
            await api.put('/solicitacao/atualizar/' + values._id, values)
            .then(res => {
                setTableAbertaData([...tableAbertaData]);
            })
            .catch(err => console.log(err));
            exitEditingMode();
        }
    };

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    const handleDeleteRow = useCallback(
        async (row) => {
            if (
                !window.confirm(`Confirma exclusão da peça ${row.getValue('codigo')}?`)
            ) {
                return;
            }
                
            try {
                // eslint-disable-next-line no-unused-vars
                const response = await api.delete('/solicitacao/delete/' + row.getValue('_id'));
                tableAbertaData.splice(row.index, 1);
                setTableAbertaData([...tableAbertaData]);
            } catch (error) {
                if (error.response) {
                    console.log(error.response.status);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            }
        }, [tableAbertaData],
    );

    const handleAprovacao = async (row) => {
        if (!window.confirm(`Confirma a aprovação da solicitação ${row.getValue('codigo')}?`)) {
            return;
        }

        try {
            await api.put(`/solicitacao/atualizar/${row.getValue('_id')}`, { status: 'APROVADA' });
            // eslint-disable-next-line no-restricted-globals
            location.reload();
        } catch (error) {
            console.log(error);
        };
    };

    const handleReprovacao = async (row) => {
        const justificativa = window.prompt(`Digite o motivo da reprovação da solicitação ${row.getValue('codigo')}:`);
        if (!justificativa) {
            alert('Insira a justificativa!');
            return;
        }

        try {
            await api.put(`/solicitacao/atualizar/${row.getValue('_id')}`, { status: 'REPROVADA', justificativa });
            // eslint-disable-next-line no-restricted-globals
            location.reload();
        } catch (error) {
            console.log(error);
        };
    };

    const handleConclusao = async (row) => {
        if (!window.confirm(`Confirma a conclusão da solicitação ${row.getValue('codigo')}?`)) {
            return;
        }

        try {
            setPecasList([]);
            row.getValue('ferramentas').forEach(ferramentaSolicitacao => {
                const ferramentaEl = ferramentaData.find(ferramenta => ferramenta._id === ferramentaSolicitacao.ferramenta);
                ferramentaEl.pecas.forEach(peca => {
                    const pecaExiste = pecasList.find(pecaQuantidade => pecaQuantidade.peca === peca.peca);
                    if (!!pecaExiste) {
                        pecaExiste.quantidade += peca.quantidade * ferramentaSolicitacao.quantidade;
                    } else {
                        pecasList.push({ peca: peca.peca, quantidade: peca.quantidade * ferramentaSolicitacao.quantidade });
                    }
                });
            });
            console.log(pecasList);
            pecasList.forEach(async peca => {
                await api.put(`/peca/atualizarestoque/${peca.peca}`, { quantidade: peca.quantidade });
            });
            
            await api.put(`/solicitacao/atualizar/${row.getValue('_id')}`, { status: 'CONCLUÍDA' });
            // eslint-disable-next-line no-restricted-globals
            location.reload();
        } catch (error) {
            console.log(error);
        };
    };

    const handleCancelamento = async (row) => {
        const justificativa = window.prompt(`Digite o motivo do cancelamento da solicitação ${row.getValue('codigo')}:`);
        if (!justificativa) {
            alert('Insira a justificativa!');
            return;
        }

        try {
            await api.put(`/solicitacao/atualizar/${row.getValue('_id')}`, { status: 'CANCELADA', justificativa });
            // eslint-disable-next-line no-restricted-globals
            location.reload();
        } catch (error) {
            console.log(error);
        };
    };

    const getCommonEditTextFieldProps = useCallback(
        (cell) => {
            return {
                error: !!validationErrors[cell.id],
                helperText: validationErrors[cell.id],
                onBlur: (event) => {
                    const isValid =
                        cell.column.id === 'codigo'
                        ? validateRequired(event.target.value) : true
                    if (!isValid) {
                        setValidationErrors({
                        ...validationErrors,
                        [cell.id]: `O campo "${cell.column.columnDef.header}" é obrigatório`,
                        });
                    } else {
                        delete validationErrors[cell.id];
                        setValidationErrors({ ...validationErrors });
                    }
                },
            };
        },
        [validationErrors],
    );

    const columns = useMemo(
        () => [
            {
                accessorKey: '_id',
                header: 'ID',
                enableColumnOrdering: false,
                enableEditing: false,
                enableSorting: false,
                size: 80,
            },
            {
                accessorKey: 'codigo',
                header: 'Código',
                size: 140,
                muiEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'ferramentas',
                header: 'Ferramentas',
                size: 140,
                muiEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
                Cell: ({ cell }) => {
                    const ferramentaFormatada = [];

                    cell.getValue().forEach(ferramentaRes => {
                        const nomeFerramenta = ferramentaData.filter(ferramenta => (ferramenta._id === ferramentaRes.ferramenta));

                        if (nomeFerramenta.length < 1) {
                            ferramentaFormatada.push(`FERRAMENTA NÃO CADASTRADA x${ferramentaRes.quantidade}`);
                        } else {
                            ferramentaFormatada.push(`${nomeFerramenta[0].nome} x${ferramentaRes.quantidade}`);
                        }
                    })

                    return ferramentaFormatada.join(', ');
                },
            },
            {
                accessorKey: 'data_entrada',
                header: 'Data da solicitação',
                size: 140,
                muiEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
                Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString(),
                enableEditing: false,
            },
            {
                accessorKey: 'status',
                header: 'Status',
                size: 140,
                muiEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
                enableEditing: false,
            },
        ], [getCommonEditTextFieldProps, ferramentaData],
    );

    const columnsRej = useMemo(
        () => [
            {
                accessorKey: '_id',
                header: 'ID',
                enableColumnOrdering: false,
                enableEditing: false,
                enableSorting: false,
                size: 80,
            },
            {
                accessorKey: 'codigo',
                header: 'Código',
                size: 140,
            },
            {
                accessorKey: 'ferramentas',
                header: 'Ferramentas',
                size: 140,
                Cell: ({ cell }) => {
                    const ferramentaFormatada = [];

                    cell.getValue().forEach(ferramentaRes => {
                        const nomeFerramenta = ferramentaData.filter(ferramenta => (ferramenta._id === ferramentaRes.ferramenta));

                        if (nomeFerramenta.length < 1) {
                            ferramentaFormatada.push(`FERRAMENTA NÃO CADASTRADA x${ferramentaRes.quantidade}`);
                        } else {
                            ferramentaFormatada.push(`${nomeFerramenta[0].nome} x${ferramentaRes.quantidade}`);
                        }
                    })

                    return ferramentaFormatada.join(', ');
                }
            },
            {
                accessorKey: 'data_entrada',
                header: 'Data da solicitação',
                size: 140,
                Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString()
            },
            {
                accessorKey: 'status',
                header: 'Status',
                size: 140,
            },
            {
                accessorKey: 'justificativa',
                header: 'Justificativa',
                size: 140
            }
        ], [ferramentaData],
    );

    return (
        <>
            <h2 style={{ color: 'white' }}>Solicitações abertas</h2>
            <Tabela>
                <MaterialReactTable
                    displayColumnDefOptions={{
                        'mrt-row-actions': {
                            size: 120,
                        },
                    }}
                    columns={columns}
                    data={tableAbertaData}
                    editingMode="modal"
                    initialState={{ columnVisibility: { _id: false } }}
                    enableColumnOrdering
                    enableEditing
                    localization={MRT_Localization_PT_BR}
                    onEditingRowSave={handleSaveRowEdits}
                    onEditingRowCancel={handleCancelRowEdits}
                    renderRowActions={({ row, table }) => (
                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                            {user !== 'ADMIN' ? <></> : 
                            <>
                                <Tooltip arrow placement="left" title="Editar Solicitação">
                                    <IconButton onClick={() => table.setEditingRow(row)}>
                                        <Edit />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip arrow placement="right" title="Deletar Solicitação">
                                    <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                                        <Delete />
                                    </IconButton>
                                </Tooltip>
                            </>}
                            
                            {row.getValue('status') !== 'AGUARDANDO APROVAÇÃO' || (user !== 'ADMIN' && user !== 'APROVADOR') ? <></> :
                            <>
                                <Tooltip arrow placement="right" title="Aprovar solicitação">
                                    <IconButton color="success" onClick={() => handleAprovacao(row)}>
                                        <Check />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip arrow placement="right" title="Reprovar solicitação">
                                <IconButton color="error" onClick={() => handleReprovacao(row)}>
                                    <Close />
                                </IconButton>
                                </Tooltip>
                            </>}
                            {row.getValue('status') !== 'APROVADA' || (user !== 'ADMIN' && user !== 'APROVADOR') ? <></> :
                            <>
                                <Tooltip arrow placement="right" title="Concluir solicitação">
                                    <IconButton color="success" onClick={() => handleConclusao(row)}>
                                        <Check />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip arrow placement="right" title="Cancelar solicitação">
                                <IconButton color="error" onClick={() => handleCancelamento(row)}>
                                    <Close />
                                </IconButton>
                                </Tooltip>
                            </>}
                        </Box>
                    )}
                    renderTopToolbarCustomActions={() => (
                        <Button
                            sx={{
                                margin: 1
                            }}
                            color='warning'
                            onClick={() => {
                                const qnt_ferramentas = parseInt(prompt("Quantos tipos de ferramentas essa solicitação possui?"));

                                if (!qnt_ferramentas || qnt_ferramentas < 1) {
                                    alert("Valor inválido!");
                                    return;
                                }

                                setFerramentaValues(new Array(qnt_ferramentas).fill(''));
                                setCreateModalOpen(true);
                            }}
                            variant="contained"
                        >
                            Criar Nova Solicitação
                        </Button>
                    )}
                />
                <CreateNewAccountModal
                    columns={columns}
                    open={createModalOpen}
                    onClose={() => setCreateModalOpen(false)}
                    onSubmit={handleCreateNewRow}
                    ferramentas={ferramentaData}
                    ferramentaValues={ferramentaValues}
                    setFerramentaValues={setFerramentaValues}
                />
            </Tabela>

            <h2 style={{ color: 'white' }}>Solicitações concluídas</h2>
            <Tabela>
                <MaterialReactTable
                    columns={columns}
                    data={tableConcluidaData}
                    editingMode="modal"
                    initialState={{ columnVisibility: { _id: false } }}
                    enableColumnOrdering
                    localization={MRT_Localization_PT_BR}
                />
            </Tabela>

            <h2 style={{ color: 'white' }}>Solicitações rejeitadas</h2>
            <Tabela>
                <MaterialReactTable
                    columns={columnsRej}
                    data={tableRejeitadaData}
                    editingMode="modal"
                    initialState={{ columnVisibility: { _id: false } }}
                    enableColumnOrdering
                    localization={MRT_Localization_PT_BR}
                />
            </Tabela>
        </>
    );
};


export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit, ferramentas, ferramentaValues, setFerramentaValues }) => {
    const [values, setValues] = useState(() =>
            columns.reduce((acc, column) => {
                acc[column.accessorKey ?? ''] = '';
                return acc;
        }, {}),
    );

    useEffect(() => {
        setValues((prevValues) => ({ ...prevValues, ferramentas: ferramentaValues }));
    }, [ferramentaValues]);

    const handleSubmit = async () => {
        const invalid = await onSubmit(values);
        if (invalid) {
            onClose();
        }
    };

    return (
        <Dialog open={open}>
        <DialogTitle textAlign="center">Criar Nova Solicitação</DialogTitle>
        <DialogContent>
            <form onSubmit={(e) => e.preventDefault()}>
                <Stack
                    sx={{
                        width: '100%',
                        minWidth: { xs: '300px', sm: '360px', md: '400px' },
                        gap: '1.5rem',
                    }}
                >
                    {columns.map((column) => (
                        column.header !== 'ID' &&
                        column.header !== 'Ferramentas' &&
                        column.header !== 'Data da solicitação' &&
                        column.header !== 'Status' ?
                    <TextField
                        key={column.accessorKey}
                        label={column.header}
                        name={column.accessorKey}
                        onChange={(e) =>
                            setValues({ ...values, [e.target.name]: e.target.value })
                        }
                    /> : <></>
                    ))}
                    {ferramentaValues.map((peca, index) => (
                    <>
                    <h3>Ferramenta {index + 1}</h3>
                        <Autocomplete
                            key={index}
                            disablePortal
                            id='combo-box-demo'
                            name={'ferramentas.ferramenta'}
                            onChange={(e, value) => {
                                try {
                                    const newFerramenta = [...ferramentaValues];
                                    newFerramenta[index] = { ...newFerramenta[index], ferramenta: value._id };
                                    setFerramentaValues(newFerramenta);
                                    console.log(values);
                                } catch (err) {
                                    setValues({ ...values, [e.target.name]: '' })
                                    console.log(err);
                                }
                            }}
                            options={ferramentas}
                            renderInput={(params) => <TextField {...params} label="Ferramenta" />}
                        />
                        <TextField
                            label="Quantidade"
                            type="number"
                            onChange={(e) => {
                                try {
                                    if (e.target.value < 1) e.target.value = null;
                                    const newQuantidade = [...ferramentaValues];
                                    newQuantidade[index] = { ...newQuantidade[index], quantidade: parseInt(e.target.value) };
                                    setFerramentaValues(newQuantidade);
                                    console.log(values);
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
        </DialogContent>
            <DialogActions sx={{ p: '1.25rem' }}>
                <Button onClick={onClose}>Cancelar</Button>
                <Button color="warning" onClick={handleSubmit} variant="contained">
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const validateRequired = (value) => {
    return !!value.length;
}

export default Solicitacoes;
