import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';
import './index.css';
 
class CriarUsuario extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            usuario: {
                nome: "",
                salario: "",
                dataNascimento: "",
                ativo: "true"
            },
            erro: null,
            redirect: false
        };
    }
 
    exibeErro() {
        const { erro } = this.state;
 
        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }
 
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/usuarios" />;
        } else {
            return (
                <div class="form">
                <form onSubmit={this.handleSubmit}>
                    <fieldset>      
                    <legend class="title">Cadastrar usuário</legend>
                    
                    <div className="usuario-insert">
                        <div class="form-group row">
                            <label htmlFor="nome" class="col-sm-2 col-form-label">Nome:</label>
                            <div class="col-sm-10">
                                <input type="text" 
                                    class="form-control" 
                                    id="nome"
                                    name="nome"
                                    placeholder="Nome"
                                    minLength="3"
                                    maxLength="100"
                                    required
                                    value={this.state.usuario.nome}
                                    onChange={this.handleInputChange}/>
                            </div>
                        </div>
                    </div>

                    <div className="usuario-insert">
                        <div class="form-group row">
                            <label htmlFor="salario" class="col-sm-2 col-form-label">Salário:</label>
                            <div class="col-sm-10">
                                <input type="text" 
                                       class="form-control" 
                                       id="salario"
                                       name="salario"
                                       placeholder="Salário"
                                       required
                                       value={this.state.usuario.salario}
                                       onChange={this.handleInputChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="usuario-insert">
                        <div class="form-group row">
                            <label htmlFor="dataNascimento" class="col-sm-2 col-form-label">Data de Nascimento:</label>
                            <div class="col-sm-10">
                                <input type="date" 
                                       class="form-control" 
                                       id="dataNascimento"
                                       name="dataNascimento"
                                       placeholder="Data de Nascimento"
                                       required
                                       value={this.state.usuario.dataNascimento}
                                       onChange={this.handleInputChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="usuario-insert">
                            <div class="row">
                            <label htmlFor="nome" class="col-sm-2 col-form-label">Status:</label>
                            <div class="col-sm-10">
                                <div class="form-check">
                                <label class="lbl-input">
                                    <input class="form-check-input" 
                                        type="radio" 
                                        name="ativo" 
                                        id="gridRadios1" 
                                        value="true" 
                                        checked={this.state.usuario.ativo === "true"}
                                        onChange={this.handleInputChange}/>
                                        ATIVO
                                </label>
                                <label class="lbl-input">
                                <input class="form-check-input" 
                                        type="radio" 
                                        name="ativo" 
                                        id="gridRadios1" 
                                        value="false" 
                                        checked={this.state.usuario.ativo === "false"}
                                        onChange={this.handleInputChange}/>
                                        INATIVO
                                </label>
                                </div>
                                
                            </div>
                            
                        </div>
                        </div>
                        
                        <div class="btn-group2" role="group" aria-label="Basic example">
                        <button type="submit" class="btn btn-secondary">Cadastrar Usuário</button>
                        <button type="button" class="btn btn-secondary"><Link to={`/usuarios`}> Voltar </Link></button>
                        </div>
                    </fieldset>
                </form>
            </div>
            );
        }
    }
 
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
 
        this.setState(prevState => ({
            usuario: { ...prevState.usuario, [name]: value }
        }));
        console.log(value);
    };
 
    handleSubmit = event => {
        fetch("http://localhost:3003/sistema/usuarios", {
            method: "post",
            body: JSON.stringify(this.state.usuario),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));
 
        event.preventDefault();
    };
}
 
export default CriarUsuario;