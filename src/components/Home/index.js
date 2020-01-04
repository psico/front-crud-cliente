import React, {Component} from 'react';
// import firebase from "../../firebase";
import './home.css';

class Home extends Component {

    state = {
        posts: []
    }

    componentDidMount() {
        // firebase.app.ref('posts').on('value', (snapshot) => {
        //     let state = this.state;
        //     state.posts = [];
        //     snapshot.forEach((childItem) => {
        //         state.posts.push({
        //             key: childItem.key,
        //             titulo: childItem.val().titulo,
        //             image: childItem.val().image,
        //             descricao: childItem.val().descricao,
        //             autor: childItem.val().autor,
        //         })
        //     })
        //
        //     state.posts.reverse();
        //     this.setState(state);
        // })

    }

    render() {
        return (
            <div>
                <p>Bem-vindo ao projeto de exemplo Crud Cliente.</p>
                <p>Este projeto exemplica o uso de uma estrutura REST com REACT, as tecnólogias usadas foram:</p>
                <p>
                    - Banco de dados: PostGreSQL e Power Architect (Modelagem).<br/>
                    - Backend: Java, Springboot, JPA, Liquibases.<br/>
                    - Frontend: Javascript, React.
                </p>

                <p>
                    Explicando algumas escolhas:<br />
                    - Por que não react-native? Para ganhar tempo no desenvolvimento e não ter que se preocupar com maquinas virtuais e compatibilidade e também por que não foi pedido.<br />
                    - Por que o BD PostgreSQL? É um dos mais simples e rapidos de configurar sem surpresas, seja na instalação seja para configurar o backend.
                </p>
            </div>
        );
    }
}

export default Home;
