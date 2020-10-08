import React from 'react';
import {connect} from 'react-redux';

import {Header} from '../components/Header';
import {mapStateToProps} from '../mapForConnect/mapStateToProps';
import {mapDispatchToProps} from '../mapForConnect/mapDispatchToProps';


class HeaderContainerClass extends React.Component {
    
    componentDidMount(){
        if(this.props.infoPerson == null){
            this.props.aboutLoadAction();
        }
        console.log('header',this.props.infoPerson);
    }

    render(){
        const {infoPerson} = this.props;

        return((infoPerson) ? <Header infoPerson={infoPerson} /> : <div>Данные о пользователе не получены</div>)
    }
}

export const HeaderContainer = connect(mapStateToProps('HeaderContainer'), mapDispatchToProps('HeaderContainer'))(HeaderContainerClass);