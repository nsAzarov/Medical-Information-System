import React, {Fragment} from 'react';

import Header from '../Master/Header';
import LinkToProfile from '../Master/LinkToProfile';
import Main  from './Main';
import Footer from '../Master/Footer';

export default function Home() {
    return (
        <Fragment>
            <Header />
            <LinkToProfile />
            <Main />
            <Footer />
        </Fragment>
    )
}
