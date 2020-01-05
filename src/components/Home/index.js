import React, {Component} from 'react';
import './home.css';

class Home extends Component {
    render() {
        return (
            <div>
                <p>Bem-vindo ao projeto de exemplo Crud Cliente.</p>
                <p>Este projeto exemplica o uso de uma estrutura REST com REACT, as tecnólogias usadas foram:</p>
                <p>
                    - Banco de dados: PostGreSQL e Power Architect (Modelagem).<br/>
                    - Backend: Java, Springboot, JPA, Liquibases.<br/>
                    - Frontend: Javascript, React, Axios.
                </p>

                <p>
                    Explicando algumas escolhas:<br/>
                    - Por que não react-native? Para ganhar tempo no desenvolvimento e não ter que se preocupar com
                    maquinas virtuais e compatibilidade e também por que não foi pedido.<br/>
                    - Por que o BD PostgreSQL? É um dos mais simples e rapidos de configurar sem surpresas, seja na
                    instalação seja para configurar o backend.
                </p>
            </div>
        );
    }
}

export default Home;
