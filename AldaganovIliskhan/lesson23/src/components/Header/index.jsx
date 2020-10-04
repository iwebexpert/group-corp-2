import { Button, Container, Grid } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import './Header.scss'
export const Header = () => {
    let history = useHistory();
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <header className="header">
                        <h1>THE MESSANGER</h1>
                        <Button variant="contained" onClick={() => history.push('/profile')} color="primary" style={{ marginLeft: '10px' }}>Профиль</Button>
                    </header>
                </Grid>
            </Grid>
        </Container>



    )
}
