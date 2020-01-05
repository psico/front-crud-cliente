import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
// import firebase from "../../firebase";
import "./login.css";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: false,
            idUsuario: null,
            nome: '',
            cpf: '',
            senha: '',
            idPerfil: null
        }

        this.entrar = this.entrar.bind(this);
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        //Verificar se tem alguem logado
        if (this.state.login === true) {
            return this.props.history.replace('/cliente')
        }
    }

    entrar(e) {
        e.preventDefault();
        this.login();
    }

    login = async () => {
        const {nome, senha} = this.state;

        try {
            fetch("http://localhost:8080/usuario")
                .then(res => res.json())
                .then(
                    (result) => {
                        result.map(usuario => {
                            //Validação simples para ver se usuário e senha conferem
                            if (usuario.nome === nome && usuario.senha === senha) {
                                this.setState({
                                    login: true,
                                    idUsuario: result.idUsuario,
                                    nome: result.nome,
                                    cpf: result.cpf,
                                    idPerfil: result.idPerfil,
                                });
                            }
                        });
                        if (this.state.login === false) {
                            alert("Login e senha não conferem");
                        } else {
                            this.props.history.replace('/cliente');
                        }
                    }
                )
                .then(result => {
                    if (result) {
                        alert("Login e senha não conferem");
                    }
                })
        } catch (error) {
            alert(error.message);
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.entrar} id="login">
                    <label>Nome:</label><br/>
                    <input type="nome" autoComplete="off" autoFocus value={this.state.nome}
                           onChange={(e => this.setState({nome: e.target.value}))} placeholder="Coloque o seu nome"
                    /><br/>
                    <label>Senha:</label><br/>
                    <input type="password" autoComplete="off" value={this.state.senha}
                           onChange={(e => this.setState({senha: e.target.value}))} placeholder="Sua senha"
                    /><br/>

                    <button type="submit">Entrar</button>

                    <Link to="/register">Ainda não possue uma conta?</Link>
                </form>
            </div>
        )
    }
}

export default withRouter(Login);
