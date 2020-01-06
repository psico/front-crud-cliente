import React, {Component} from "react";
import {withRouter} from "react-router-dom";

class StatusLogin extends Component {
    render() {
        return (
            <div className="titulo">
                {(localStorage.getItem("nome") !== null) ?
                    <div>
                        <br/>
                        <p>Logado com: {localStorage.getItem("nome")}</p>
                        <div className="botao" onClick={() => this.logout()}>Deslogar</div>
                    </div>
                    :
                    <p>Sem usuario logado</p>
                }
            </div>
        );
    }
}

export default withRouter(StatusLogin)
