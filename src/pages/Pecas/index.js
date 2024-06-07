import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MaterialReactTable } from 'material-react-table';
import {
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
import { Delete, Edit } from '@mui/icons-material';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';

import { Tabela } from './styled';

import api from '../../api/axios';

const Pecas = () => {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [tableData, setTableData] = useState({});
    const [validationErrors, setValidationErrors] = useState({});

    const user = useSelector(state => state.userType.user);

    useEffect(() => {
        (async () => {
            await api.get('/peca/listar')
            .then(res => {
                setTableData(res.data);
            })
            .catch(err => console.log(err))
        })();
    }, []);



    const handleCreateNewRow = async (values) => {
        if (!values.codigo) {
            alert('Código da peça é obrigatório');
            return false;
        }
        if (!values.nome) {
            alert('Nome da peça é obrigatório');
            return false;
        }
        if (!values.qnt_estoque) {
            alert('A quantidade atual em estoque é obrigatória');
            return false;
        }
        delete values._id;
        await api.post('/peca/inserir', values)
        .then(res => {
            tableData.push(res.data);
            setTableData([...tableData]);
        })
        .catch(err => console.log(err));
        return true;
    };

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
            tableData[row.index] = values;
            await api.put('/peca/atualizar/' + values._id, values)
            .then(res => {
                setTableData([...tableData]);
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
                const response = await api.delete('/peca/delete/' + row.getValue('_id'));
                tableData.splice(row.index, 1);
                setTableData([...tableData]);
            } catch (error) {
                if (error.response) {
                    console.log(error.response.status);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            }
        }, [tableData],
    );

    const getCommonEditTextFieldProps = useCallback(
        (cell) => {
            return {
                error: !!validationErrors[cell.id],
                helperText: validationErrors[cell.id],
                onBlur: (event) => {
                    const isValid =
                        cell.column.id === 'codigo'
                        ? validateRequired(event.target.value) : true
                        && cell.column.id === 'nome'
                        ? validateRequired(event.target.value) : true
                        && cell.column.id === 'qnt_estoque'
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
                accessorKey: 'nome',
                header: 'Nome',
                size: 140,
                muiEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'qnt_estoque',
                header: 'Quantidade em estoque',
                size: 140,
                muiEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
        ], [getCommonEditTextFieldProps],
    );

  return (
    <Tabela>
        <MaterialReactTable
            displayColumnDefOptions={{
                'mrt-row-actions': {
                    size: 120,
                },
            }}
            columns={columns}
            data={tableData}
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
                </Box>
            )}
            renderTopToolbarCustomActions={() => (
                <Button
                    sx={{
                        margin: 1
                    }}
                    color='warning'
                    onClick={() => setCreateModalOpen(true)}
                    variant="contained"
                >
                    Criar Nova Peça
                </Button>
            )}
        />
        <CreateNewAccountModal
            columns={columns}
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onSubmit={handleCreateNewRow}
            
        />
    </Tabela>
  );
};

export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
    const [values, setValues] = useState(() =>
            columns.reduce((acc, column) => {
                acc[column.accessorKey ?? ''] = '';
                return acc;
        }, {}),
    );

    const handleSubmit = async () => {
        const invalid = await onSubmit(values);
        if (invalid) {
            onClose();
        }
    };

    return (
        <Dialog open={open}>
        <DialogTitle textAlign="center">Criar Nova Peça</DialogTitle>
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
                        column.header !== 'ID' ?
                            <TextField
                                key={column.accessorKey}
                                label={column.header}
                                name={column.accessorKey}
                                onChange={(e) =>
                                setValues({ ...values, [e.target.name]: e.target.value })
                                }
                            /> : <></>
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

export default Pecas;
