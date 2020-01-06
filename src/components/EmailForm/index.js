import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import "./emailForm.css";

class EmailForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            descricao: '',
            principal: '',
            idUsuario: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        // e.preventDefault();
        this.props.emailFormState(this.state);
    }

    render() {
        return (<div className="bloco_row">
            <label>E-mail:</label>
            <input type="text" placeholder="Informe o seu e-mail"
                   value={this.state.descricao}
                   onChange={(e) =>
                       this.setState({descricao: e.target.value})
                   }/>

            <div className="botao" onClick={(e) => this.handleChange(e)}>Adicionar Email</div>
        </div>);
    }
}

export default withRouter(EmailForm)
