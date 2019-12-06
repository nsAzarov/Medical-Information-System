import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import AddClinic from './Components/AddClinic';
import AddDoctor from './Components/AddDoctor';
import Clinic from './Components/Clinic';
import Doctor from './Components/Doctor';
import Profile from './Components/Profile';
import Home from './Components/Home';
import ScrollToTop from './Components/Master/ScrollToTop';

const Router = () => {
    return (
        <BrowserRouter>
            <ScrollToTop>
                <Route path="/" exact component={Home} />
                <Route path="/AddClinic" component={AddClinic} />
                <Route path="/Clinic/:id" component={Clinic} />
                <Route path="/AddDoctor" component={AddDoctor} />
                <Route path="/Doctor/:id" component={Doctor} />
                <Route path="/Profile" component={Profile} />
            </ScrollToTop>
        </BrowserRouter>
    )
}

export default Router;
