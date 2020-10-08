import React from 'react';
import {connect} from 'react-redux';

import {About} from '../pages/About';


import {mapStateToProps} from '../mapForConnect/mapStateToProps';
import {mapDispatchToProps} from '../mapForConnect/mapDispatchToProps';

class AboutContainerClass extends React.Component {
    
    componentDidMount(){
        if(this.props.infoPerson == null){
            this.props.aboutLoadAction();
        }
        console.log('about',this.props.infoPerson);
        
    }

    render(){
        const {infoPerson} = this.props;

        return(infoPerson ? <About infoPerson={infoPerson} /> : <div>Данные о пользователе не получены</div>)
    }
}

export const AboutContainer = connect(mapStateToProps('AboutContainer'), mapDispatchToProps('AboutContainer'))(AboutContainerClass);
// function mapStateToProps(state, ownProps){
//     const {loading, entries} = state.about;

//     let infoPerson = null;

//     if(loading){
//         infoPerson = entries;
//     }

//     return {
//         infoPerson
//     };
// }

// function mapDispatchToProps(dispatch){
//     return {
//         aboutLoadAction: () => dispatch(aboutLoadAction()),
//     }
// }


