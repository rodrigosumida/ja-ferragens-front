import React from "react";
import { Route, Routes } from 'react-router-dom';

import Index from '../pages/Index'
import Pecas from '../pages/Pecas';
import Ferramentas from '../pages/Ferramentas';
import Solicitacoes from '../pages/Solicitacoes';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/pecas' element={<Pecas />} />
            <Route path='/ferramentas' element={<Ferramentas />} />
            <Route path='/solicitacoes' element={<Solicitacoes />} />
        </Routes>
    )
}