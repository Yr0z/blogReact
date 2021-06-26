// Librairies
import React, { useState } from 'react';
import classes from './Ajouter.module.css';

// Composants
import Input from '../../../Components/UI/Input/Input'

function Ajouter() {

    //State
    const [inputs, setInputs] = useState({
        titre: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Titre de l\'article'
            },
            value: '',
            label: 'Titre'
        },
        contenu: {
            elementType: 'textarea',
            elementConfig: {},
            value: '',
            label: 'Contenu de l\'artcile'
        }, 
        auteur: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Auteur de l\'article'
            },
            value: '',
            label: 'Auteur'
        },
        brouillon: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: true, displayValue: 'Brouillon'},
                    {value: false, displayValue: 'Publié'}
                ]
            },
            value: '',
            label: 'Etat'
        }
    });

    // Fonctions
    const inputChangedHandler = (event, id) => {
        const nouveauxInputs = {...inputs};
        nouveauxInputs[id].value = event.target.value;
        setInputs(nouveauxInputs);
    };

    // Variables
    const formElementsArray = [];
    for(let key in inputs) {
       formElementsArray.push({
            id: key,
            config: inputs[key]
       });
    }

    let form = (
        <form className={classes.Ajouter}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    id={formElement.id}
                    value={formElement.config.value}
                    label={formElement.config.label} 
                    type={formElement.config.elementType}
                    config={formElement.config.elementConfig} 
                    changed={(e)=> inputChangedHandler(e, formElement.id)}/>
            ))}
            <div className={classes.submit}>
                <input type='submit' value="Envoyer" />
            </div>
        </form>
    );

    return (
        <div className="container">
            <h1>Ajouter</h1>
            {form}
        </div>
    );
}

export default Ajouter;