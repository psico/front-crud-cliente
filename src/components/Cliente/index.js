import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import "./cliente.css";
import axios from "axios";

class Cliente extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nome: localStorage.nome,
            clientes: []
        };

        this.logout = this.logout.bind(this);
        this.excluir = this.excluir.bind(this);
    }

    async componentDidMount() {
        let state = this.state;
        state.clientes = [];

        fetch("http://localhost:8080/usuario")
            .then(res => res.json())
            .then(result => {
                result.map(cliente => {
                    state.clientes.push({
                        idUsuario: cliente.idUsuario,
                        nome: cliente.nome,
                        cpf: cliente.cpf
                    })
                })

                state.clientes.reverse();
                this.setState(state);
            })
    }

    logout = async () => {
        // await firebase.logout()
        //     .catch((error) => {
        //         console.log(error);
        //     });
        //
        // localStorage.removeItem("nome");

        this.props.history.push('/');
    }

    excluir = idUsuario => {
        axios.delete('http://localhost:8080/usuario/' + idUsuario);

        let clientes = this.state.clientes.filter(cliente => cliente.idUsuario !== idUsuario);
        this.setState({ clientes: clientes });
    }

    render() {
        return (
            <div>
                {/*<div className="user-info">*/}
                {/*    <h1>Olá {this.state.nome}</h1>*/}
                {/*</div>*/}

                <div className="bloco">
                    <div className="titulo">
                        <h1>Lista de Clientes</h1>&nbsp;
                        <Link className="botao" to="/cliente/form">Novo Cliente</Link>
                        {/*<p>Logado com: {firebase.getCurrent()}</p>*/}
                        {/*<button onClick={() => this.logout()}>Deslogar</button>*/}
                    </div>
                </div>

                {this.state.clientes.map((cliente) => {
                    return (
                        <div className="bloco" key={cliente.idUsuario}>
                            <span> <strong>Nome:</strong> {cliente.nome}</span>
                            <span> <strong>CPF:</strong> {cliente.cpf}</span>

                            <br/>
                            <div className="titulo">
                                <Link className="botao" to="/cliente/form">Editar</Link> &nbsp;
                                <div className="botao" onClick={() => this.excluir(cliente.idUsuario)}>Excluir</div>
                            </div>
                        </div>
                    )
                })}

            </div>
        )
    }
}

export default withRouter(Cliente)
