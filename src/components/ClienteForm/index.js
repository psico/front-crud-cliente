import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import "./clienteForm.css";
import axios from 'axios';
import TelefoneForm from "../TelefoneForm";
import EmailForm from "../EmailForm";
import InputMask from "react-input-mask";
import StatusLogin from "../StatusLogin";

class ClienteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValido: false,
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
            telefones: [],
            emails: []
        };

        this.validaForm = this.validaForm.bind(this);
        this.cadastrar = this.cadastrar.bind(this);

        this.telefoneFormState = this.telefoneFormState.bind(this);
        this.emailFormState = this.emailFormState.bind(this);

        this.persistirEndereco = this.persistirEndereco.bind(this);
        this.persistirTelefone = this.persistirTelefone.bind(this);
        this.persistirEmail = this.persistirEmail.bind(this);
    }

    telefoneFormState(stateTelefone) {
        let state = this.state;
        state.telefones.push(stateTelefone);
        this.setState(state);
    }

    emailFormState(stateEmail) {
        let state = this.state;
        state.emails.push(stateEmail);
        this.setState(state);
    }

    validaForm() {
        let alertMensagem = '';

        if (this.state.nome === "" ||
            this.state.cpf === "" ||
            this.state.endereco.cep === "" ||
            this.state.endereco.bairro === "" ||
            this.state.endereco.logradouro === "" ||
            this.state.endereco.cidade === "" ||
            this.state.endereco.uf === ""
        ) {
            alertMensagem += "\n - Existe campos obrigatórios não preenchidos.";
        }

        if (this.state.nome.length < 3 || this.state.nome.length > 100) {
            alertMensagem += "\n - O tamanho do campo nome é invalido.";
        }

        if (this.state.cpf.length !== 14) {
            alertMensagem += "\n - CPF com tamanho invalido.";
        }

        if (this.state.telefones.length === 0) {
            alertMensagem += "\n - Adicione ao menos 1 telefone.";
        }

        if (this.state.emails.length === 0) {
            alertMensagem += "\n - Adicione ao menos 1 e-mail.";
        }

        if (alertMensagem !== '') {
            this.setState({formValido: false});
            alert(alertMensagem);
            return false;
        } else {
            this.setState({formValido: true});
            return true;
        }
    }

    cadastrar = async (e) => {
        e.preventDefault();

        if (this.validaForm()) {

            axios.post('http://localhost:8080/usuario', {
                id: null,
                nome: this.state.nome,
                cpf: this.state.cpf.replace("-", "").split(".").join(""),
                senha: "default",
                idPerfil: 3
            })
                .then(usuario => {
                    this.usuario = usuario.data;

                    this.persistirEndereco(usuario);
                    this.persistirTelefone(usuario);
                    this.persistirEmail(usuario);

                    alert('Dados salvos com sucesso')
                    window.location.href = 'http://localhost:3000/cliente';
                });

            // alert('Dados salvos com sucesso')
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
            cep: this.state.endereco.cep.replace("-", ""),
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
                telefone: telefone.telefone.replace(" ", "").replace("-", ""),
                idTipoTelefone: telefone.idTipoTelefone,
                idUsuario: this.usuario.idUsuario
            })
                .then(telefone => {
                    // console.log(telefone);
                    // alert('Telefone salvo com sucesso');
                });
        });
    }

    persistirEmail(usuario) {
        let emailPrincipal = true;

        this.state.emails.map(email => {
            axios.post('http://localhost:8080/email', {
                id: null,
                descricao: email.descricao,
                principal: emailPrincipal,
                idUsuario: this.usuario.idUsuario
            })
                .then(email => {
                    // console.log(email);
                    // alert('E-mail salvo com sucesso');
                });
            emailPrincipal = false;
        });
    }

    consultarCep = (cep) => {
        let state = {...this.state};
        let endereco = {...this.state.endereco};

        let cepFormatado = cep.replace("-", "");
        if (cepFormatado.length === 8) {
            axios.get("https://viacep.com.br/ws/" + cepFormatado.toString() + "/json/")
                .then(result => {
                    endereco.logradouro = result.data.logradouro;
                    endereco.bairro = result.data.bairro;
                    endereco.localidade = result.data.localidade;
                    endereco.uf = result.data.uf;

                    state.endereco = endereco;
                    this.setState(state);
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    render() {
        let endereco = {...this.state.endereco};

        if (localStorage.getItem("idPerfil") !== "1") {
            return (
                <div>
                    <div className="bloco">Você não tem permissão de acesso.</div>
                </div>);
        } else {

            return (
                <div>
                    <div className="bloco">
                        <div className="titulo">
                            <h1>Cadrasto de Clientes</h1>&nbsp;
                            <Link className="botao" to="/cliente">Voltar</Link>
                        </div>
                        <StatusLogin/>
                    </div>

                    <form onSubmit={this.cadastrar} className="bloco">
                        <h1>Usuário</h1><br/>

                        <label>Nome:</label><br/>
                        <input type="text" minLength="3" maxLength="100" placeholder="Nome do Cliente"
                               value={this.state.nome} autoFocus
                               onChange={(e) => this.setState({nome: e.target.value})}/><br/>
                        <label>CPF:</label><br/>
                        <InputMask mask="999.999.999-99" type="text" placeholder="CPF do cliente"
                                   value={this.state.cpf}
                                   onChange={(e) => this.setState({cpf: e.target.value})}/><br/>

                        <br/><br/>
                        <h1>Endereço</h1><br/>

                        <label>CEP:</label><br/>
                        <InputMask mask="99999-999" type="text" placeholder="Informe o CEP"
                                   value={this.state.endereco.cep}
                                   onChange={(e) => {
                                       endereco.cep = e.target.value;
                                       this.setState({endereco})
                                   }}
                                   onBlur={(e) => this.consultarCep(e.target.value)}
                        /><br/>
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

                        <br/><br/>
                        <h1>Telefone</h1><br/>

                        <TelefoneForm telefoneFormState={this.telefoneFormState}/>

                        <h2>Telefone Adicionados</h2>
                        {this.state.telefones.length === 0 ?
                            <div>Nenhum telefone adicionado</div>
                            : this.state.telefones.map((telefone) =>
                                <div key={telefone.telefone}>+{telefone.ddi} ({telefone.ddd}) {telefone.telefone}</div>)
                        }

                        <br/><br/>
                        <h1>E-Mail</h1><br/>

                        <EmailForm emailFormState={this.emailFormState}/>
                        <h2>E-mails Adicionados</h2>
                        {this.state.emails.length === 0 ?
                            <div>Nenhum e-mail adicionado</div>
                            :
                            this.state.emails.map(email =>
                                <div key={email.descricao}>{email.descricao}</div>
                            )}

                        <br/><br/><br/>
                        <button type="submit">Salvar</button>
                    </form>
                </div>
            )

        }
    }
}

export default withRouter(ClienteForm)
