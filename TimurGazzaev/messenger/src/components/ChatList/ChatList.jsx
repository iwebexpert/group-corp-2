import React from 'react'
import {Drawer, Divider, List, ListItem, ListItemText, Menu, TextField, Button} from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import {makeStyles, useTheme} from "@material-ui/core/styles"
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import AddIcon from '@material-ui/icons/Add'
import GroupIcon from '@material-ui/icons/Group'
import {NavLink, useHistory} from "react-router-dom"

export const useStyles = makeStyles((theme) => ({
    drawer: {
        width: 240,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 240,
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
    }
}))

export const ChatList = ({chats, addChat, open, handleDrawerToggle}) => {
    const theme = useTheme()
    const history = useHistory()
    const classes = useStyles()

    const [anchorEl, setAnchorEl] = React.useState(null)
    const [chatName, setChatName] = React.useState(null)
    const menuOpen = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleInputChange = (event) => {
        setChatName(event.target.value)
    }

    const createChart = () => {
        addChat(chatName)
        setChatName('')
        setAnchorEl(null)
        history.push(`/chats/${chats.length}`)
    }

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerTop}>
                <IconButton onClick={handleDrawerToggle}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                {chats.length && chats.map((chat, index) => (
                        <ListItem button key={index} className={classes.chatItem} >
                            <NavLink to={`/chats/${chat.id}`} activeClassName={classes.activeChat} className={classes.chat}>
                            {chat.type ? <GroupIcon color="primary"/> : <AccountBoxIcon color="primary"/>}
                            <ListItemText className={classes.user} primary={chat.title} />
                            </NavLink>
                        </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem button onClick={handleMenu}>
                    <div className={classes.addChartItem}>
                        <AddIcon/>
                        <ListItemText className={classes.user} primary={'Add chat'} />
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
                        label="Title"
                        name="title"
                        onChange={handleInputChange}
                        value={chatName || ''}
                        variant="outlined"
                        autoFocus
                    />
                    <Button onClick={createChart} className={classes.addChartButton} variant="contained" color="primary">Create chat</Button>
                </Menu>
            </List>
        </Drawer>
    )
}
