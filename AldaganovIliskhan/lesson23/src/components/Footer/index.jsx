import React from 'react'
import { Container, Grid } from '@material-ui/core'

import './Footer.scss'

export const Footer = () => {
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <header className="footer">
                        2020
        </header>
                </Grid>
            </Grid>
        </Container>
    )
}
