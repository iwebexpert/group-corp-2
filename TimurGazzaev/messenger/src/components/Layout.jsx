import React, {useState} from 'react'
import './messenger.css'
import { Header } from './Header/Header'
import { ChatList } from './ChatList/ChatList'
import {MessagesBlock} from "./MessagesBlock/MessagesBlock"
import { Container, Grid } from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles"


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
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
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    drawerTop: {
        height: 53,
        paddingTop: 10
    },
    user: {
        marginLeft: 10
    },
    content: {
        flexGrow: 1,
        marginTop: 80,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 220,
    },
    messages: {
        height: 700
    },
    form: {
        margin: '30px auto 0',
    },
    name: {
        width: 140,
        marginRight: 20
    },
    text: {
        width: 500
    },
    button: {
        margin: '10px 0 0 440px'
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 220,
    },
}))

export const Layout = () => {
    const classes = useStyles()
    const [open, setOpen] = useState(true)

    const handleDrawerToggle = () => {
        setOpen(!open)
    }

    return (
        <>
            <Header classes={classes} open={open} handleDrawerToggle={handleDrawerToggle}/>
            <Container>
                <Grid container spacing={2}>
                    <ChatList classes={classes} open={open} handleDrawerToggle={handleDrawerToggle}/>
                    <MessagesBlock classes={classes} open={open}/>
                </Grid>
            </Container>
        </>
    )
}
