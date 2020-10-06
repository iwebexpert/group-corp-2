import React, {useState} from 'react'
import {AppBar, Toolbar, IconButton, Typography, Menu, MenuItem} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import clsx from "clsx"
import {AccountCircle} from "@material-ui/icons"
import {Link} from "react-router-dom"
import {makeStyles} from "@material-ui/core/styles"

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${240}px)`,
        marginLeft: 240,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    headWrap: {
        display: "flex",
        justifyContent: "space-between",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    burgerBlock: {
        display: "flex",
        alignItems: "center"
    },
    profileBlock: {

    },
    profileBlockWrap: {
        display: "flex",
        alignItems: "center"
    }
}))

export const Header = ({open, setOpen, profile}) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const menuOpen = Boolean(anchorEl)
    const classes = useStyles()

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
                        onClick={() => setOpen(!open)}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>Messenger</Typography>
                </div>
                <div className={classes.profileBlock}>
                    <div className={classes.profileBlockWrap}>
                        <Typography variant="h6" noWrap>{profile && `${profile.name} ${profile.surName}`}</Typography>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
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
                            Settings
                        </MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    )
}
