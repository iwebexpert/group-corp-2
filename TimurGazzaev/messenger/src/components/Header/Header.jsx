import React from 'react'
import {AppBar, Toolbar, IconButton, Typography} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import clsx from "clsx"

export const Header = ({classes, open, handleDrawerToggle}) => {
    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    Мессенджер
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
