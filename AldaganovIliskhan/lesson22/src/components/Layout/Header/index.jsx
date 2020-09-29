import { Container, Grid } from '@material-ui/core'
import React from 'react'
import './Header.scss'
export const Header = () => {
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <header className="header">
                        THE MESSANGER
        </header>
                </Grid>
            </Grid>
        </Container>



    )
}
