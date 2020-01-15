import React, {Fragment} from 'react';

import Header from '../Other/Header';
import LinkToLogReg from '../Other/LinkToLogReg';
import Main  from './Main';

export default function Home() {
    return (
        <Fragment>
            <Header />
            <LinkToLogReg />
            <Main />
        </Fragment>
    )
}
