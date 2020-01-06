import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import "./telefoneForm.css";

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

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let state = this.state;
        state.tiposTelefone = [];

        fetch("http://localhost:8080/tipoTelefone")
            .then(res => res.json())
            .then(result => {
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
        this.props.telefoneFormState(this.state);
    }

    render() {
        return (<div className="bloco_row">
            <label>DDI:</label>
            <input type="text" placeholder="DDI"
                   value={this.state.ddi}
                   className="ddd"
                   onChange={(e) =>
                       this.setState({ddi: e.target.value})
                   }/>&nbsp;&nbsp;
            <label>DDD:</label>
            <input type="text" placeholder="DDD"
                   value={this.state.ddd}
                   className="ddd"
                   onChange={(e) =>
                       this.setState({ddd: e.target.value})
                   }/>&nbsp;&nbsp;
            <label>Número:</label>
            <input type="text" placeholder="Número"
                   value={this.state.telefone}
                   onChange={(e) =>
                       this.setState({telefone: e.target.value})
                   }/>&nbsp;&nbsp;
            <label>Tipo:</label>
            <select value={this.state.idTipoTelefone}
                    onChange={(e) =>
                        this.setState({idTipoTelefone: e.target.value})
                    }>
                {this.state.tiposTelefone.map((tipoTelefone) =>
                    <option key={tipoTelefone.idTipoTelefone}
                            value={tipoTelefone.idTipoTelefone}>{tipoTelefone.descricao}</option>)}
            </select><br/>

            <div className="botao" onClick={(e) => this.handleChange(e)}>Adicionar Telefone</div>
        </div>);
    }
}

export default withRouter(TelefoneForm)
