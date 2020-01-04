import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import "./cliente.css";

class Cliente extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nome: localStorage.nome,
            clientes: []
        };

        this.logout = this.logout.bind(this);
    }

    async componentDidMount() {
        let state = this.state;
        state.clientes = [];

        fetch("http://localhost:8080/usuario")
            .then(res => res.json())
            .then(result => {
                console.log(result);
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

    render() {
        return (
            <div id="header-usuario">
                <div className="user-info">
                    <h1>Olá {this.state.nome}</h1>
                    <Link to="/cliente/form">Novo Cliente</Link>
                </div>
                {/*<p>Logado com: {firebase.getCurrent()}</p>*/}
                <button onClick={() => this.logout()}>Deslogar</button>

                <section id="cliente">
                    {this.state.clientes.map((cliente) => {
                        return (
                            <article key={cliente.idUsuario}>
                                <header>
                                    <div className="title">
                                        <strong>{cliente.nome}</strong>
                                        <span>Autor: {cliente.cpf}</span>
                                    </div>
                                </header>
                                {/*<img src={post.image} alt="Capa do post"/>*/}
                                {/*<footer>*/}
                                {/*    <p>{post.descricao}</p>*/}
                                {/*</footer>*/}
                            </article>
                        )
                    })}
                </section>
            </div>
        )
    }
}

export default withRouter(Cliente)
