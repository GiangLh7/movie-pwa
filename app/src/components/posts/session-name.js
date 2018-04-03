import React, {Component} from 'react';
import {connect} from 'react-redux';
const stateToProps = state => ({

});

const actionsToProps = dispatch => ({

});

class SessionName extends Component {
    constructor(props) {
        super(props);
        this.state = { editMode: false };
    }

    render() {

    }
}

export default connect(stateToProps, actionsToProps)(SessionName);