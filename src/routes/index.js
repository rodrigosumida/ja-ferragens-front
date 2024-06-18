import React from "react";
import { Route, Routes } from 'react-router-dom';

import Index from '../pages/Index'
import Pecas from '../pages/Pecas';
import Conjunto from '../pages/Conjunto';
import Ferramentas from '../pages/Ferramentas';
import FerramentaEditar from "../pages/FerramentaEditar";
import Solicitacoes from '../pages/Solicitacoes';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/pecas' element={<Pecas />} />
            <Route path='/conjuntos' element={<Conjunto />} />
            <Route path='/ferramentas' element={<Ferramentas />} />
            <Route path='/ferramentas/editar/:id/:qnt' element={<FerramentaEditar />} />
            <Route path='/solicitacoes' element={<Solicitacoes />} />
        </Routes>
    )
}