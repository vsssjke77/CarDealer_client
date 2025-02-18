import React, {createContext} from 'react';

import App from './App';
import UserStore from "./store/UserStore";
import CarStore from "./store/CarStore";
import PartStore from "./store/PartStore";
import MaintenanceStore from "./store/MaintenanceStore";
import BrandStore from "./store/BrandStore";
import {createRoot} from "react-dom/client";
import ReserveStore from "./store/reserveStore";
import ModelStore from "./store/modelStore";

const container = document.getElementById('root');
const root = createRoot(container);
export const Context = createContext(null);


root.render(
    <Context.Provider value={{
        user: new UserStore(),
        brand: new BrandStore(),
        model: new ModelStore(),
        car: new CarStore(),
        reserve: new ReserveStore(),
        part: new PartStore(),
        maintenance: new MaintenanceStore(),


    }}>

        <App/>
    </Context.Provider>,

);