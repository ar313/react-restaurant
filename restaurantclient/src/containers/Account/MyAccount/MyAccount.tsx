import React, { Component } from "react";
import { connect } from "react-redux";

interface IState {

}

interface IProps {

}

class MyAccount extends Component<IProps, IState> {


    render () {
        return (
            <div>
                My Account
            </div>
        )
    }

}

export default connect()(MyAccount);