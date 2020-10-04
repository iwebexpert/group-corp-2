import React from 'react'
import {Drawer, Divider, List, ListItem, ListItemText, MenuItem, Menu, TextField, Button} from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import {useTheme} from "@material-ui/core/styles"
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import AddIcon from '@material-ui/icons/Add'
import GroupIcon from '@material-ui/icons/Group'
import {Link, NavLink} from "react-router-dom"

export const ChatList = ({chats, addChat, classes, open, handleDrawerToggle}) => {
    const theme = useTheme()

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
                {chats.map((chat, index) => (
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
                <ListItem button >
                    <div className={classes.addChartItem} onClick={handleMenu}>
                        <AddIcon/>
                        <ListItemText className={classes.user} primary={'Add chat'} />
                    </div>
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
                            value={chatName}
                            variant="outlined"
                            autoFocus
                        />
                        <Button onClick={createChart} className={classes.addChartButton} variant="contained" color="primary">Create chat</Button>
                    </Menu>
                </ListItem>
            </List>
        </Drawer>
    )
}
