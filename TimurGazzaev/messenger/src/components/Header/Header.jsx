import React, {useState} from 'react'
import {AppBar, Toolbar, IconButton, Typography, Menu, MenuItem} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import clsx from "clsx"
import {AccountCircle} from "@material-ui/icons"
import {Link} from "react-router-dom"

export const Header = ({classes, open, setOpen, handleDrawerToggle}) => {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const menuOpen = Boolean(anchorEl)

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuItem = () => {
        setAnchorEl(null)
        setOpen(false)
    }

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar className={classes.headWrap}>
                <div  className={classes.burgerBlock}>
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
                        Messenger
                    </Typography>
                </div>
                <div className={classes.profileBlock}>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={menuOpen}
                        onClose={() => setAnchorEl(null)}
                    >
                        <MenuItem onClick={handleMenuItem}>
                            <Link to='/profile'>Profile</Link>
                        </MenuItem>
                        <MenuItem>
                            My account
                        </MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    )
}
