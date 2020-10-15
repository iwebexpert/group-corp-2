import React from 'react'
import {AppBar, Toolbar, IconButton, Typography, Switch} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import clsx from "clsx"
import {AccountCircle} from "@material-ui/icons"
import {Link, NavLink} from "react-router-dom"
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
        width: `calc(100% - ${270}px)`,
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
    rightBlock: {
        display: "flex",
        alignItems: "center",
        width: 300,
        justifyContent: "space-between"
    },
    profileBlock: {},
    profileBlockWrap: {
        display: "flex",
        alignItems: "center",
        color: '#fff'
    }
}))

export const Header = ({open, setOpen, profile, darkTheme, setDarkTheme}) => {
    const classes = useStyles()

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar className={classes.headWrap}>
                <div className={classes.burgerBlock}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setOpen(!open)}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap>Messenger</Typography>
                </div>
                <div className={classes.rightBlock}>
                    <Switch color="default" checked={darkTheme} onChange={() => setDarkTheme()} />
                    <NavLink to="/profile" className={classes.profileBlock}>
                        <div className={classes.profileBlockWrap}>
                            <Typography variant="h6" noWrap>{profile && `${profile.name} ${profile.surName}`}</Typography>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                        </div>
                    </NavLink>
                </div>
            </Toolbar>
        </AppBar>
    )
}
