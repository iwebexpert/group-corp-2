import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import UserConfig from './UserConfig';

export default function UserMenu(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	let {author, photoUrl, setAuthor, setPhotoUrl} = props;
	return (
		<div>
			<Button aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick}>
				<SettingsIcon/>
			</Button>
			<Menu
				id='simple-menu'
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}>

				<MenuItem>
					<UserConfig setAuthor={setAuthor} setPhotoUrl={setPhotoUrl} author={author} photoUrl={photoUrl}/>
				</MenuItem>
			</Menu>
		</div>
	);
};