import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import "./clienteForm.css";
import axios from 'axios';
import TelefoneForm from "../TelefoneForm";

class ClienteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            cpf: '',
            endereco: {
                cep: '',
                logradouro: '',
                bairro: '',
                cidade: '',
                uf: 'AC',
                complemento: ''
            },
            ufs: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE',
                'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'],
            telefones: []
        };

        this.cadastrar = this.cadastrar.bind(this);

        this.telefoneFormState = this.telefoneFormState.bind(this);

        this.persistirEndereco = this.persistirEndereco.bind(this);
        this.persistirTelefone = this.persistirTelefone.bind(this);
    }

    telefoneFormState(stateTelefone) {
        console.log(this.state);
        this.state.telefones.push(stateTelefone);
        // this.state.apply()

        // this.setState((state) => {
        //     // Important: read `state` instead of `this.state` when updating.
        //     return {count: state.count + 1}
        // });
    }

    cadastrar = async (e) => {
        e.preventDefault();
        let usuario = {};

        // console.log(this.state);

        if (this.state.nome !== "" &&
            this.state.cpf !== "") {

            axios.post('http://localhost:8080/usuario', {
                id: null,
                nome: this.state.nome,
                cpf: this.state.cpf,
                senha: "default",
                idPerfil: 3
            })
                .then(usuario => {
                    this.usuario = usuario.data;

                    this.persistirEndereco(usuario);
                    this.persistirTelefone(usuario)
                });

            // this.props.history.push('/cliente');
        } else {
            this.setState({
                alert: 'Preencha todos os campos!'
            })
        }
    };

    persistirEndereco(usuario) {
        axios.post('http://localhost:8080/endereco', {
            id: null,
            cep: this.state.endereco.cep,
            logradouro: this.state.endereco.logradouro,
            bairro: this.state.endereco.bairro,
            cidade: this.state.endereco.cidade,
            uf: this.state.endereco.uf,
            complemento: this.state.endereco.complemento,
            idUsuario: this.usuario.idUsuario
        })
            .then(endereco => {
                // console.log(endereco);
                // alert('Endereço salvo com sucesso');
            });
    }

    persistirTelefone(usuario) {
        this.state.telefones.map(telefone => {

        axios.post('http://localhost:8080/telefone', {
            id: null,
            ddd: telefone.ddd,
            ddi: telefone.ddi,
            telefone: telefone.telefone,
            idTipoTelefone: telefone.idTipoTelefone,
            idUsuario: this.usuario.idUsuario
        })
            .then(telefone => {
                console.log(telefone);
                alert('Telefone salvo com sucesso');
            });
        });
    }

    render() {
        let endereco = {...this.state.endereco};
        let telefones = {...this.state.telefones};

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
                    <h1>Usuário</h1><br/>

                    <label>Nome:</label><br/>
                    <input type="text" placeholder="Nome do Cliente"
                           value={this.state.nome} autoFocus
                           onChange={(e) => this.setState({nome: e.target.value})}/><br/>
                    <label>CPF:</label><br/>
                    <input type="text" placeholder="CPF do cliente"
                           value={this.state.cpf}
                           onChange={(e) => this.setState({cpf: e.target.value})}/><br/>

                    <h1>Endereço</h1><br/>

                    <label>CEP:</label><br/>
                    <input type="text" placeholder="Informe o CEP"
                           value={this.state.endereco.cep}
                           onChange={(e) => {
                               endereco.cep = e.target.value;
                               this.setState({endereco})
                           }}/><br/>
                    <label>Logradouro:</label><br/>
                    <input type="text" placeholder="Informe o logradouro"
                           value={this.state.endereco.logradouro}
                           onChange={(e) => {
                               endereco.logradouro = e.target.value;
                               this.setState({endereco})
                           }}/><br/>
                    <label>Bairro:</label><br/>
                    <input type="text" placeholder="Informe o bairro"
                           value={this.state.endereco.bairro}
                           onChange={(e) => {
                               endereco.bairro = e.target.value;
                               this.setState({endereco})
                           }}/><br/>
                    <label>Cidade:</label><br/>
                    <input type="text" placeholder="Informe o cidade"
                           value={this.state.endereco.cidade}
                           onChange={(e) => {
                               endereco.cidade = e.target.value;
                               this.setState({endereco})
                           }}/><br/>
                    <label>UF:</label><br/>
                    <select value={this.state.endereco.uf}
                            onChange={(e) => {
                                endereco.uf = e.target.value;
                                this.setState({endereco})
                            }}>{this.state.ufs.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
                    </select><br/>
                    <label>Complemento:</label><br/>
                    <input type="text" placeholder="Informe o complemento (Opcional)"
                           value={this.state.endereco.complemento}
                           onChange={(e) => {
                               endereco.complemento = e.target.value;
                               this.setState({endereco})
                           }}/><br/>

                    <h1>Telefone</h1><br/>

                    <TelefoneForm telefoneFormState={this.telefoneFormState} />

                    <h2>Telefone Adicionados</h2>
                    {this.state.telefones.map((telefone) =>
                        <div key={telefone.telefone}>+{telefone.ddi} ({telefone.ddd}) {telefone.telefone}</div>)
                    }

                    <button type="submit">Salvar</button>
                </form>
            </div>
        )
    }
}

export default withRouter(ClienteForm)
