import React, {useState} from 'react'
import {Drawer, Divider, List, ListItem, ListItemText, Menu, TextField, Button} from "@material-ui/core"
import {useHistory} from 'react-router-dom'
import IconButton from "@material-ui/core/IconButton"
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import {makeStyles, useTheme} from "@material-ui/core/styles"
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import GroupIcon from '@material-ui/icons/Group'
import {nanoid} from 'nanoid'

export const useStyles = makeStyles((theme) => ({
    drawer: {
        width: 270,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 270,
    },
    drawerPaperDark: {
        width: 270,
        backgroundColor: '#171717',
        color: '#fff'
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
        padding: '5px 10px',
        display: "flex",
        justifyContent: "space-between"
    },
    activeChat: {
        backgroundColor: '#b8b8b8',
        padding: '5px 10px',
        display: "flex",
        '&:hover': {
            backgroundColor: '#b8b8b8'
        }
    },
    activeChatDark: {
        backgroundColor: '#232227',
        padding: '5px 10px',
        display: "flex",
        '&:hover': {
            backgroundColor: '#232227'
        }
    },
    chat: {
        display: "flex",
        alignItems: "center",
        padding: 5,
        width: '100%'
    },
    user: {
        marginLeft: 10,
        marginRight: 10,
        alignItems: "center",
        display: "flex"
    },
    userDark: {
        marginLeft: 10,
        marginRight: 10,
        display: "flex",
        alignItems: "center",
        color: '#bbb'
    },
    notification: {
        backgroundColor: "red",
        width: 10,
        height: 10,
        marginLeft: 10,
        borderRadius: 25
    },
    deleteIco: {
        cursor: 'pointer',
        width: 18,
        '&:hover': {
            fill: '#f00'
        }
    },
    addChartItem: {
        display: "flex",
        alignItems: "center"
    },
    addChart: {
        padding: 5,
    },
    addChartInput: {
        display: "block",
        margin: 10
    },
    addChartButton: {
        display: "block",
        margin: '0 10px'
    }
}))

export const ChatList = ({chats, chatId, addChat, deleteChat, redirect, open, handleDrawerToggle, darkTheme}) => {
    const theme = useTheme()
    const classes = useStyles()
    const history = useHistory()

    const [anchorEl, setAnchorEl] = useState(null)
    const [chatName, setChatName] = useState(null)
    const menuOpen = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleInputChange = (event) => {
        setChatName(event.target.value)
    }

    const handleChatChoose = (chatId) => {
        if(!history.location.pathname.includes('/chats/')) {
            history.push(`/chats/${chatId}`)
        }
        redirect(chatId)
    }

    const createChat = () => {
        let id = nanoid()
        if (chatName) {
            setChatName('')
            setAnchorEl(null)
            addChat(id, chatName)
            redirect(id)
        } else {
            alert('Введите название чата')
        }
    }

    const handleDeleteChat = (title, chatId) => {
        deleteChat(chatId)
        redirect(chats[0].id)
    }

    const onKeyPress = (event) => {
        if (event.keyCode === 13) {
            createChat()
        }
    }

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{paper: darkTheme ? classes.drawerPaperDark : classes.drawerPaper}}
        >
            <div className={classes.drawerTop}>
                <IconButton onClick={handleDrawerToggle}>
                    {theme.direction === 'ltr'
                        ? darkTheme ? <ChevronLeftIcon color='primary'/> : <ChevronLeftIcon/>
                        : darkTheme ? <ChevronRightIcon color='primary'/> : <ChevronRightIcon/>}
                </IconButton>
            </div>
            <Divider/>
            <List>
                {chats.length && chats.map((chat) => (
                    <ListItem button key={chat.id} className={chatId === chat.id.toString() ?
                        darkTheme ? classes.activeChatDark : classes.activeChat : classes.chatItem}>
                        <div onClick={() => handleChatChoose(chat.id)} className={classes.chat}>
                            {chat.type ? <GroupIcon color="primary"/> : <AccountBoxIcon color="primary"/>}
                            <div className={darkTheme ? classes.userDark : classes.user}>
                                <ListItemText primary={chat.title}/>
                                {chat.onFire && <div className={classes.notification}> </div>}
                            </div>
                        </div>
                        <CloseIcon onClick={() => handleDeleteChat(chat.title, chat.id)} className={classes.deleteIco}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                <ListItem button onClick={handleMenu}>
                    <div className={classes.addChartItem}>
                        <AddIcon/>
                        <ListItemText className={classes.user} primary={'Add chat'}/>
                    </div>
                </ListItem>
                <Menu
                    className={classes.addChart}
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
                    <TextField
                        className={classes.addChartInput}
                        onKeyDown={onKeyPress}
                        label="Title"
                        name="title"
                        onChange={handleInputChange}
                        value={chatName || ''}
                        variant="outlined"
                        autoFocus
                    />
                    <Button onClick={createChat} className={classes.addChartButton} variant="contained"
                            color="primary">Create chat</Button>
                </Menu>
            </List>
        </Drawer>
    )
}
