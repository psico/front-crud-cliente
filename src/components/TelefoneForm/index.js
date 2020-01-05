import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import "./telefoneForm.css";

import axios from 'axios';

class TelefoneForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ddi: '',
            ddd: '',
            telefone: '',
            idUsuario: '',
            idTipoTelefone: 1,
            tiposTelefone: []
        }

        // this.parentStateChange = this.parentStateChange.bind(this);
        // this.telefoneChange = this.telefoneChange.bind(this);

        this.handleChange = this.handleChange.bind(this);
    }

    // parentStateChange() {
    //     this.props.telefoneChange(this.state);
    // }

    componentDidMount() {
        let state = this.state;
        state.tiposTelefone = [];

        fetch("http://localhost:8080/tipoTelefone")
            .then(res => res.json())
            .then(result => {
                console.log(result);
                result.map(tipoTelefone => {
                    state.tiposTelefone.push({
                        idTipoTelefone: tipoTelefone.idTipoTelefone,
                        descricao: tipoTelefone.descricao
                    })
                })

                this.setState(state);
            })
    }

    handleChange(e) {
        // e.preventDefault();
        this.props.telefoneFormState(this.state);
    }

    render() {
        return (<div className="bloco_row">
            <label>DDI:</label>
            <input type="text" placeholder="DDI"
                   value={this.state.ddi}
                   onChange={(e) =>
                       this.setState({ddi: e.target.value})
                   }/>
            <label>DDD:</label>
            <input type="text" placeholder="DDD"
                   value={this.state.ddd}
                   onChange={(e) =>
                       this.setState({ddd: e.target.value})
                   }/>
            <label>Número:</label>
            <input type="text" placeholder="Número"
                   value={this.state.telefone}
                   onChange={(e) =>
                       this.setState({telefone: e.target.value})
                   }/>
            <label>Tipo:</label><br/>
            <select value={this.state.idTipoTelefone}
                    onChange={(e) =>
                        this.setState({idTipoTelefone: e.target.value})
                    }>
                {this.state.tiposTelefone.map((tipoTelefone) =>
                    <option key={tipoTelefone.idTipoTelefone}
                            value={tipoTelefone.idTipoTelefone}>{tipoTelefone.descricao}</option>)}
            </select><br/>

            <button onClick={(e) => this.handleChange(e)}>Adicionar Telefone</button>
        </div>);
    }
}

export default withRouter(TelefoneForm)
