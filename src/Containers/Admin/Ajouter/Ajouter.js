// Librairies
import React, { useState } from 'react';
import classes from './Ajouter.module.css';
import axios from '../../../config/axios-firebase';
import routes from '../../../config/routes';

// Composants
import Input from '../../../Components/UI/Input/Input';

function Ajouter(props) {
    //States
    const [inputs, setInputs] = useState({
        titre: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: "Titre de l'article",
            },
            value: '',
            label: 'Titre',
            valid: false,
            validation: {
                required: true,
                minLength: 5,
                maxLength: 50,
            },
            touched: false,
            errorMessage: 'Le titre doit faire entre 5 et 10 caractères',
        },
        contenu: {
            elementType: 'textarea',
            elementConfig: {},
            value: '',
            label: "Contenu de l'artcile",
            valid: false,
            validation: {
                required: true,
            },
            touched: false,
            errorMessage: 'Le contenu ne doit pas être vide',
        },
        auteur: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: "Auteur de l'article",
            },
            value: '',
            label: 'Auteur',
            valid: false,
            validation: {
                required: true,
            },
            touched: false,
            errorMessage: 'Cet article doit avoir un auteur',
        },
        brouillon: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: true, displayValue: 'Brouillon' },
                    { value: false, displayValue: 'Publié' },
                ],
            },
            value: true,
            label: 'Etat',
            valid: true,
            validation: {},
        },
    });

    const [valid, setValid] = useState(false);

    // Fonctions
    const checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    };

    const inputChangedHandler = (event, id) => {
        // Change la valeur
        const nouveauxInputs = { ...inputs };
        nouveauxInputs[id].value = event.target.value;
        nouveauxInputs[id].touched = true;

        // Vérification de la valeur
        nouveauxInputs[id].valid = checkValidity(
            event.target.value,
            nouveauxInputs[id].validation,
        );

        setInputs(nouveauxInputs);

        // Vérification du formulaire
        let formIsValid = true;
        for (let inputs in nouveauxInputs) {
            formIsValid = nouveauxInputs[inputs].valid && formIsValid;
        }
        setValid(formIsValid);
    };

    const formHandler = event => {
        event.preventDefault();

        const article = {
            titre: inputs.titre.value,
            contenu: inputs.contenu.value,
            auteur: inputs.auteur.value,
            brouillon: inputs.brouillon.value,
        };

        axios
            .post('/articles.json', article)
            .then(response => {
                console.log(response);
                props.history.replace(routes.ARTICLES);
            })
            .catch(error => {
                console.log(error);
            });
    };

    // Variables
    const formElementsArray = [];
    for (let key in inputs) {
        formElementsArray.push({
            id: key,
            config: inputs[key],
        });
    }

    let form = (
        <form className={classes.Ajouter} onSubmit={e => formHandler(e)}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    id={formElement.id}
                    value={formElement.config.value}
                    label={formElement.config.label}
                    type={formElement.config.elementType}
                    config={formElement.config.elementConfig}
                    valid={formElement.config.valid}
                    touched={formElement.config.touched}
                    errorMessage={formElement.config.errorMessage}
                    changed={e => inputChangedHandler(e, formElement.id)}
                />
            ))}
            <div className={classes.submit}>
                <input type="submit" value="Ajouter un article" disabled={!valid} />
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
