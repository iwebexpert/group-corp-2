import React from 'react';
import {Container, Grid} from '@material-ui/core';
import './Profile.css'

export function Profile(){
    return (
        <Container fixed>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                {/* <img src='../img/BL.jpg'/> */}
                <img src='https://i.pinimg.com/736x/2b/64/e6/2b64e653aa2cb07fc425a2cc88a81b59.jpg'/>
              </Grid>
              <Grid item xs={8}>
                <h3>My name is Jeffrey Lebowski.</h3>
                <p>But you can call me "The Dude".</p>
                <p>I'm 48 y.o.</p>
                <p>I'm still living in California, L.A.</p>
                <p>My hobbies are playing bowling and drinking "White russian".</p>
                <p> Also I like codding</p>
                <h4>My skills:</h4>
                <ul>
                  <li>HTML</li>
                  <li>CSS</li>
                  <li>JS</li>
                  <li>React</li>
                  <li>Node.js</li>
                  <li>Python</li>
                  <li>Database</li>
                </ul>
              </Grid>
            </Grid>
        </Container>
    )
}