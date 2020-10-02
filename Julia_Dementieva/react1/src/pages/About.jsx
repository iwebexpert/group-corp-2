import React, { Component } from 'react'
import {Paper} from '@material-ui/core';
import './About.css'
export class About extends Component {
    constructor(props){
        super(props);
        this.style = 
        {
            width: '100%',
            marginTop: '25px',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirectiom: 'colomn',
            height: '500px',
        }
    }

    render() {
        console.log(this.props)
        return (<>
            <div style={this.style}>
                
                <Paper elevation={3} style={{width: "35%", backgroundRepeat: 'no-repeat',
                backgroundImage: "url('https://lh3.googleusercontent.com/proxy/8hQqiCgfTJu53B_hZGovmYp8fxvNpMKvDXxojR9Mjls7URhmwHWofnzGkl3AhV1vQ40VySpyFAtzbKiVXgpKvaZfK1pkrSiJq4qcoF--gYieCTwxOcJJ255iRXAEuB3NQNgGCb3g3aN4tlBfFcfOYObmcp855ueCjtvfipBhKT0LkmhQIe6vbVf3guTuyomuIi9h6P3LqeFNxmtueOP87v5AS_DS96w4e0pgjOT4cbYIkYnQIHa9x4A6H6KLsV_JDxV1R0xRE_QaE2DzZMHIo3SoMvyW7tjRgYLRgxQos0xr451Io_qv6v9ndM6p39KrVJJwVmYeb3VDAjV47zIzI8sitcbBRR8-VFz4Y1g4cUjC')"}}>
                    
                
                </Paper>
                <Paper elevation={3} style={{width: "64%"}}>
                    <div className='infoUser'> 
                        <h1>Логин: {this.props.person.name}</h1>
                        <h1>Возраст: {this.props.person.age}</h1>
                        <h1>Город: {this.props.person.city}</h1>

                    </div>
                </Paper>
                    
            </div> 
        
        </>
        )
    }
}

