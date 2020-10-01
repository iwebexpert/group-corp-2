import React from 'react'
import {Drawer, Divider, List, ListItem, ListItemText} from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import {useTheme} from "@material-ui/core/styles"
import AccountBoxIcon from '@material-ui/icons/AccountBox'

export const ChatList = ({classes, open, handleDrawerToggle}) => {
    const theme = useTheme()
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
                {['Егор Аввакумов', 'Михаил Алексеев', 'Екатерина Гордон', 'Алексей Кудимов', 'Александра Иванова'].map((text, index) => (
                    <ListItem button key={text}>
                        <AccountBoxIcon color="primary"> </AccountBoxIcon>
                        <ListItemText className={classes.user} primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}
