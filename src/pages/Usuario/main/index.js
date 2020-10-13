import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 
export default class Main extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            usuario: [],
            erro: null
        };
    }
 
    componentDidMount() {
        fetch(`http://localhost:3003/sistema/usuarios`)
            .then(usuario =>
                usuario.json().then(usuario => this.setState({ usuario }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { usuario } = this.state;
        return (
 
        <div className = "usuario-list">
            <Link to ={'/criarUsuario'}><button type="button" class="btn btn-secondary">Cadastrar usuario</button></Link>
<br />
            <br />

            <div class="article">
                {usuario.map((usuario, index) =>
                    <article key={usuario.id}>
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card title">{usuario.nome}</h5>
                            <p class="card-text">Para mais informações acesse o link abaixo.</p>
                            <p><Link to={`/usuarios/${usuario.id}`}> Mais informações</Link></p>
                        </div>
                    </div>
                    </article>
                )}
            </div>
                
        </div>
        )
    };
}
