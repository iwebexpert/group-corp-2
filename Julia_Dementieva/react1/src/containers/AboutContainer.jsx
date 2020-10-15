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
    }

    render(){
        return <About {...this.props} isLoading={this.props.isLoading} />
    }
}

export const AboutContainer = connect(mapStateToProps('AboutContainer'), mapDispatchToProps('AboutContainer'))(AboutContainerClass);