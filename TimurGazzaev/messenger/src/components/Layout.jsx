import React, {useState} from 'react'
import './messenger.css'
import { Header } from './Header/Header'
import { ChatList } from './ChatList/ChatList'
import {MessagesBlock} from "./MessagesBlock/MessagesBlock"
import { Container} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import {Error} from "./Error/Error"
import {Profile} from "./Profile/Profile"
import {chats} from '../helpers/chatsData'
import {profile} from '../helpers/profile'

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
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    drawerTop: {
        height: 53,
        paddingTop: 10
    },
    chatItem: {
        padding: 0
    },
    chat: {
        display: "flex",
        alignItems: "center",
        padding: '10px 16px',
        width: '100%'
    },
    activeChat: {
        backgroundColor: '#b8b8b8',
        padding: '10px 16px 10px 26px',
    },
    user: {
        marginLeft: 10
    },
    addChartItem: {
        display: "flex",
        alignItems: "center"
    },
    addChart: {
        padding: 10
    },
    addChartInput: {
        display: "block",
        margin: 10
    },
    addChartButton: {
        display: "block",
        margin: '0 10px'
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
        margin: '10px 0 0 510px'
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 220,
    },
    profileCart: {
        margin: '100px auto',
        width: 300,
    },
    info: {
        marginTop: 32
    },
    infoValue: {
        fontWeight: "bold"
    }
}))

export const Layout = () => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [chatsData, setChatsData] = useState(chats)

    const handleDrawerToggle = () => {
        setOpen(!open)
    }

    const addChat = (chatName) => {
        setChatsData(prev => [...prev, {id: chatsData.length, title: chatName, type: 1, messages: []}])
    }

    const addMessage = (currentChat, author, message, time) => {
        let newArr = [...chatsData]
        newArr[currentChat].messages.push({id: newArr[currentChat].messages.length, author: author, text: message, time: time})
        setChatsData(newArr)
    }

    return (
        <BrowserRouter>
            <Header classes={classes} open={open} setOpen={setOpen} handleDrawerToggle={handleDrawerToggle}/>
            <Container>
                <ChatList chats={chatsData} addChat={addChat} classes={classes} open={open} setOpen={setOpen} handleDrawerToggle={handleDrawerToggle}/>
                <Switch>
                    <Route path = '/chats/:id([0-9]+)' render={(props) => <MessagesBlock {...props} chats={chatsData} addMessage={addMessage} classes={classes} open={open}/>} exact/>
                    <Route path = '/profile' exact>
                        <Profile classes={classes} data={profile[0]}/>
                    </Route>
                    <Route path = '/' exact> </Route>
                    <Route path = '*'>
                        <Error/>
                    </Route>
                </Switch>
            </Container>
        </BrowserRouter>
    )
}
