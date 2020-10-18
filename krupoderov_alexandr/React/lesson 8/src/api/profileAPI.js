import * as axios from "axios";

export const profileAPI = {
	getProfile(){
		return axios.get('http://localhost:4000/profile').then(response => response.data);
	},
	setProfile(name, photoUrl){
		return axios.post('http://localhost:4000/profile', {name, photoUrl}).then(response => response.data);
	}
};
