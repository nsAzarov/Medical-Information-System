import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import AddClinic from './Components/AddClinic';
import Clinic from './Components/Clinic';
import Home from './Components/Home';
import ScrollToTop from './Components/Master/ScrollToTop';

const Router = () => {
    return (
        <BrowserRouter>
            <ScrollToTop>
                <Route path="/" exact component={Home} />
                <Route path="/AddClinic" component={AddClinic} />
                <Route path="/Clinic/:id" component={Clinic} />
            </ScrollToTop>
        </BrowserRouter>
    )
}

export default Router;
