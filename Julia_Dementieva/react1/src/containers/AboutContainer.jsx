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
    console.log(state)
    const load = state.about.loading;
    const person = state.about.entries;
    console.log('AboutMap', load )

    let infoPerson = null;

    if(load){
        infoPerson = person;
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