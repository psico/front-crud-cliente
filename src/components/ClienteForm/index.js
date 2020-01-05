import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import "./clienteForm.css";
import axios from 'axios';

class ClienteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            cpf: ''
        };

        this.cadastrar = this.cadastrar.bind(this);
    }

    componentDidMount() {
        // if (!firebase.getCurrent()) {
        //     this.props.history.push('/');
        //     return null;
        // }
    }

    cadastrar = async (e) => {
        e.preventDefault();

        if (this.state.nome !== "" &&
            this.state.cpf !== "") {

            axios.post('http://localhost:8080/usuario', {
                id: null,
                nome: this.state.nome,
                cpf: this.state.cpf,
                senha: "default",
                idPerfil: 3
            })
                .then(function (response) {
                    console.log('salvo com sucesso');
                    alert('salvo com sucesso');
                });
            // this.props.history.push('/cliente');
        } else {
            this.setState({
                alert: 'Preencha todos os campos!'
            })
        }
    };

    render() {
        return (
            <div>
                <div className="bloco">
                    <div className="titulo">
                        <h1>Cadrasto de Clientes</h1>
                        <Link to="/cliente">Voltar</Link>
                        {/*<p>Logado com: {firebase.getCurrent()}</p>*/}
                        {/*<button onClick={() => this.logout()}>Deslogar</button>*/}
                    </div>
                </div>

                <form onSubmit={this.cadastrar} className="bloco">

                    <label>Nome:</label><br/>
                    <input type="text" placeholder="Nome do Cliente" value={this.state.nome} autoFocus
                           onChange={(e) => this.setState({nome: e.target.value})}/><br/>

                    <label>CPF:</label><br/>
                    <input type="text" placeholder="CPF do cliente" value={this.state.cpf}
                           onChange={(e) => this.setState({cpf: e.target.value})}/><br/>

                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        )
    }
}

export default withRouter(ClienteForm)
