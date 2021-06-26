// Librairies
import React from 'react';
import classes from './Layout.module.css';

// Composants
import Header from '../../Components/Header/Header';

function Layout(props) {
    return (
        <>
            <Header />

            {props.children}

            {/* Pied de page */}
        </>
    );
}

export default Layout;
