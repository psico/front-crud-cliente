import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import "./cliente.css";
import axios from "axios";
import StatusLogin from "../StatusLogin";

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
                        cpf: cliente.cpf,
                        endereco: this.requestEndereco(cliente.idUsuario),
                        telefones: this.requestTelefones(cliente.idUsuario)
                    })

                    state.clientes.reverse();
                    this.setState(state);
                })
            })
    }

    requestEndereco = async (idUsuario) => {
        let endereco = {};
        await axios.get("http://localhost:8080/usuario/endereco/" + idUsuario.toString())
            .then(result => {
                endereco.logradouro = result.data.logradouro;
                endereco.bairro = result.data.bairro;
                endereco.localidade = result.data.localidade;
                endereco.uf = result.data.uf;

                return endereco;
            })
            .catch(error => endereco)
    }

    requestTelefones = async (idUsuario) => {
        let telefones = [];
        let response = await fetch("http://localhost:8080/usuario/telefone/" + idUsuario.toString())
            .then(res => res.json())
            // .then(result => {
            //     telefones.push({
            //         id: result.idTelefone,
            //         ddd: result.ddd,
            //         ddi: result.ddi,
            //         telefone: result.telefone,
            //         idTipoTelefone: result.idTipoTelefone,
            //         idUsuario: result.idUsuario
            //     })
            //
            //     return telefones;
            // })
            .catch(error => telefones)

        return response;
    }

    logout = async () => {
        localStorage.removeItem("idUsuario");
        localStorage.removeItem("nome");
        localStorage.removeItem("idPerfil");

        this.props.history.push('/');
    }

    excluir = idUsuario => {
        axios.delete('http://localhost:8080/usuario/' + idUsuario);

        let clientes = this.state.clientes.filter(cliente => cliente.idUsuario !== idUsuario);
        this.setState({clientes: clientes});
    }

    render() {
        return (
            <div>
                <div className="bloco">
                    <div className="titulo">
                        <h1>Lista de Clientes</h1>&nbsp;
                        <Link className="botao" to="/cliente/form">Novo Cliente</Link>
                    </div>
                    <StatusLogin/>
                </div>

                {this.state.clientes.map((cliente) => {
                    return (
                        <div className="bloco" key={cliente.idUsuario}>
                            <span> <strong>Nome:</strong> {cliente.nome}</span>
                            <span> <strong>CPF:</strong> {cliente.cpf}</span>
                            {/*<span> <strong>Endereço:</strong> {cliente.endereco.logradouro}</span>*/}
                            {/*<span> <strong>Telefones:</strong> {cliente.telefones.map(telefone =>*/}
                            {/*    <p>+{telefone.ddi} ({telefone.ddd}) {telefone.telefone}</p>*/}
                            {/*)}</span>*/}

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
