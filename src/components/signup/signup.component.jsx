import { useState } from "react";

import { createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './signup.styles.scss';

const defaultFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFields);
    const {displayName, email, password, confirmPassword} = formFields;
    //console.log(formFields);

    const resetForm = () => {
        setFormFields(defaultFields);
    };

    const handleChange = async (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        //const {displayName, email, password, confirmPassword} = Object.fromEntries(Object.values(event.target).map(el => [el.name, el.value]));
        if (password !== confirmPassword) {
            alert('Password Mismatch!');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetForm();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="signup-container">
            <h2>Don't have an account?</h2>
            <span>Sign Up</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' required type="text" onChange={handleChange} name='displayName' value={displayName}></FormInput>
                
                <FormInput label='Email' required type="email" onChange={handleChange} name='email' value={email}></FormInput>
                
                <FormInput label='Password' required type="password" onChange={handleChange} name='password' value={password}></FormInput>
                
                <FormInput label='Confirm Password' required type="password" onChange={handleChange} name='confirmPassword' value={confirmPassword}></FormInput>
                
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;