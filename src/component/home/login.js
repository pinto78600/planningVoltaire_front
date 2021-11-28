import React, { useState } from 'react';

import '../index.scss';

const Login = () => {
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleLogin = e => {
        e.preventDefault();
        if(process.env.REACT_APP_API_PASSWORD === pseudo && process.env.REACT_APP_API_PASSWORD === password){
            setError('');
            return window.location='/calendar'
        }else setError("Erreur de pseudo ou du mot de passe")
    }

    return (
        <div className='containerLogin' >
            <h1>Garage Voltaire</h1>
            <div className='formLogin' >
                <form action='' onSubmit={handleLogin} id='sign-up-form' >
                    <h2>Se connecter</h2>
                    <label htmlFor='email'>Pseudo</label>
                    <br/>
                    <input type='text' name='pseudo' id='pseudo' 
                        onChange={e => setPseudo(e.target.value)} value={pseudo} placeholder="Ecrire pseudo..." />
                    <div className='email error'></div>
                    <br/>
                    <label htmlFor='password'>Mot de passe</label>
                    <br/>
                    <input type='password' name='password' id='password' 
                        onChange={e => setPassword(e.target.value)} value={password} placeholder="Ecrire mot de passe..."/>
                    <p style={{color : 'red'}} >{error}</p>
                    <br/>
                    <input className= 'btnFormLogin' type='submit' value='Connecter' />
                </form>
            </div>
        </div>
    );
};

export default Login;