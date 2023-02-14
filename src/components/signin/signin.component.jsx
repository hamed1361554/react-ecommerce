import { useEffect, useState } from 'react';

import { getRedirectResult } from 'firebase/auth';
import { auth,
    signInWithGooglePopup,
    signInWithGoogleRedirection,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './signin.styles.scss';


const defaultFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    // useEffect(() => {
    //     async function getAuth() {
    //         const { user } = await getRedirectResult(auth) || {};
    //         if (user) {
    //             await createUserDocumentFromAuth(user);
    //         }
    //     };
    //     getAuth();
    // }, []);

    const [formFields, setFormFields] = useState(defaultFields);
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFields);
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();
        }catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                  alert('incorrect password for email');
                  break;
                case 'auth/user-not-found':
                  alert('no user associated with this email');
                  break;
                default:
                  console.log(error);
              }
        }
    };

    const logGoogleUser = async (event) => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    return (
        <div className='signin-container'>
            <h2>Sign In Page</h2>
            <span>Already have an account?</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' required type="email" onChange={handleChange} name='email' value={email}></FormInput>
                
                <FormInput label='Password' required type="password" onChange={handleChange} name='password' value={password}></FormInput>
            
                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType='google' onClick={logGoogleUser}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;