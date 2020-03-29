import React, {useEffect} from 'react';
import { Link, useHistory} from 'react-router-dom'
import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api'

import './styles.css'
import { useState } from 'react';
 

export default function Routes() {

    const [incidents, setIncidents] = useState([]);

    const ongName =localStorage.getItem('ongName');
    const ongId =localStorage.getItem('ongId');
    
    const history = useHistory();

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch(err){
            alert('Erro ao deletar o caso')
        }
    }

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,

            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId])

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt=""/>
                <span>Bem Vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar Novo Caso</Link>
                <button onClick={handleLogout}>
                    <FiPower size={13} color="#E02041"/>
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
              {incidents.map(incident => (
                    <li key={incident.id}>
                    <strong>Caso:</strong>
                    <p>{incident.title}</p>

                    <strong>Descrição:</strong>
                    <p>{incident.description}</p>

                    <strong>Valor:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                    <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                        
                         </button>
                </li>
              ))}
            </ul>
        </div>
    );
}