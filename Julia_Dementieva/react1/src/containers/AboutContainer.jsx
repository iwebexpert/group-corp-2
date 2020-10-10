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
        return <About {...this.props} />
    }
}

export const AboutContainer = connect(mapStateToProps('AboutContainer'), mapDispatchToProps('AboutContainer'))(AboutContainerClass);