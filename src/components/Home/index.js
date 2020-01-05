import React, {Component} from 'react';
import './home.css';

class Home extends Component {
    render() {
        return (
            <div id="home">
                <p>Bem-vindo ao projeto de exemplo <strong>CRUD Cliente</strong>.</p>
                <p>Este projeto exemplica o uso de uma estrutura REST com REACT, as tecnólogias usadas foram:</p>
                <ul>
                    <li><strong>Banco de dados:</strong> PostGreSQL e Power Architect (Modelagem).</li>
                    <li><strong>Backend:</strong> Java, Springboot, JPA, Liquibases.</li>
                    <li><strong>Frontend:</strong> Javascript, React, Axios.</li>
                </ul>

                <p>Explicando algumas escolhas:</p>
                <ul>
                    <li>Por que não react-native? <br/>
                        Para ganhar tempo no desenvolvimento e não ter que se preocupar com maquinas virtuais e
                        compatibilidade e também por que não foi pedido.
                    </li>
                    <li>Por que o BD PostgreSQL? <br/>
                        É um dos mais simples e rapidos de configurar sem surpresas, seja na instalação seja para
                        configurar o backend.
                    </li>
                </ul>
            </div>
        );
    }
}

export default Home;
