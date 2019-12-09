import React, {Fragment} from 'react';

import Header from '../Master/Header';
import LinkToLogReg from '../Master/LinkToLogReg';
import Main  from './Main';
import Footer from '../Master/Footer';

export default function Home() {
    return (
        <Fragment>
            <Header />
            <LinkToLogReg />
            <Main />
            <Footer />
        </Fragment>
    )
}
