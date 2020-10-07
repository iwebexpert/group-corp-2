import React from 'react';
import {connect} from 'react-redux';

import {About} from '../pages/About';
import {aboutLoadAction} from '../actions/about';

class AboutContainerClass extends React.Component {
    
    componentDidMount(){
        this.props.aboutLoadAction();
    }

    render(){
        const {infoPerson} = this.props;

        return(infoPerson ? <About infoPerson={infoPerson} /> : <div>Данные о пользователе не получены</div>)
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


export const AboutContainer = connect(mapStateToProps, mapDispatchToProps)(AboutContainerClass);