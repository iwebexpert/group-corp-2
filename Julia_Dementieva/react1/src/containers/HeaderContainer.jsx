import React from 'react';
import {connect} from 'react-redux';

import {Header} from '../components/Header';
import {aboutLoadAction} from '../actions/about';

class HeaderContainerClass extends React.Component {
    
    componentDidMount(){
        this.props.aboutLoadAction();
    }

    render(){
        const {infoPerson} = this.props;

        return((infoPerson) ? <Header infoPerson={infoPerson} /> : <div>Данные о пользователе не получены</div>)
    }
}

function mapStateToProps(state, ownProps){
    const {loading, entries} = state.about;

    let infoPerson = null;

    if(loading){
        infoPerson = entries;
    }
    
    return {
        infoPerson
    };
}

function mapDispatchToProps(dispatch){
    return {
        aboutLoadAction: () => dispatch(aboutLoadAction()),
    }
}


export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(HeaderContainerClass);