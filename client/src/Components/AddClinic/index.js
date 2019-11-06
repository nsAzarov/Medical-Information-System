import React, {Fragment} from 'react';

import Header from '../Master/Header';
import Main  from './Main';
import Footer from '../Master/Footer';

export default function Home() {
    return (
        <Fragment>
            <Header />
            <Main />
            <Footer />
        </Fragment>
    )
}
