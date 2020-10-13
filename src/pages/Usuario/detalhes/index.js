import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Usuario extends Component {
    state = {
        usuario: {},
    };
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`http://localhost:3003/sistema/usuarios/${id}`)
            .then(usuario =>
                usuario.json().then(usuario => this.setState({ usuario }))
            )
            .catch(erro => this.setState({ erro }));
    }

 
    render() {
        const { usuario, index } = this.state;
 
        if (usuario.ativo) {
            usuario.ativo = "Ativo";
        } else {
            usuario.ativo = "Inativo";
        }
 
        return (
            <div className="usuario-info">
                <div class="media">
                    <div class="icon">                    
                    <svg width="90px" height="90px" viewBox="0 0 16 16" class="bi bi-person-badge" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 0 1 4.5 0h7A2.5 2.5 0 0 1 14 2.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2.5zM4.5 1A1.5 1.5 0 0 0 3 2.5v10.795a4.2 4.2 0 0 1 .776-.492C4.608 12.387 5.937 12 8 12s3.392.387 4.224.803a4.2 4.2 0 0 1 .776.492V2.5A1.5 1.5 0 0 0 11.5 1h-7z"/>
                        <path fill-rule="evenodd" d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                    </div>
                        <div class="media-body">
                            <h5 class="mt-0">{usuario.nome}</h5>
                            <h1> Estado do Usuário: {usuario.ativo} </h1>
                            <h1> Salário: {usuario.salario} </h1>
                            <h1> Data de Nascimento: {usuario.dataNascimento} </h1>   
                        </div>
                </div>              
                <br />

                <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-secondary"><Link to={`/usuarios`}> VOLTAR </Link></button>
                <button type="button" class="btn btn-secondary"><Link to={`/editarUsuario/${usuario.id}`}> EDITAR </Link></button>
                <button type="button" class="btn btn-secondary"><Link to={`/deletarUsuario/${usuario.id}`}> DELETAR </Link></button>
                </div>
                              
            </div>
        );
    }
}
