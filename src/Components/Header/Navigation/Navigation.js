// Librairies
import React from 'react';
import classes from './Navigation.module.css';
import routes from '../../../Config/routes';

// Composants
import NavigationItem from './NavigationItem/NavigationItem';

function Navigation() {
    return (
        <ul className={classes.Navigation}>
            <NavigationItem exact to={routes.HOME}>
                Accueil
            </NavigationItem>
            <NavigationItem to={routes.ARTICLES}>Articles</NavigationItem>
            <NavigationItem to={routes.CONTACT}>
                Contact
            </NavigationItem>
        </ul>
    );
}

export default Navigation;
