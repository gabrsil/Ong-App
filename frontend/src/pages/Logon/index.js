import React, {useState} from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import './styles.css'
import api from '../../services/api'


import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon() {

    const [id, setId] = useState('');

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try{
            const response = await api.post('sessions', { id })
            
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        }catch(err) {   
            alert('Falha no Login')
        }
        
    }

    return(

        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt=""/>
                <form action="" onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>
                    <input 
                    type="text" 
                    placeholder="Sua ID"
                    value={id}
                    onChange={e => setId(e.target.value)}
                    />

                    <button className="button">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt=""/>
        </div>

    );
}