import axios from 'axios'

export default class AuthService {
	login(email, password) {
		return axios.post('http://localhost:8000/api/login',{
			email, password 
		}).then(response => {
			// console.log(response.data.token);
			window.localStorage.setItem('loginToken', response.data.token)
			const TOKEN = `Bearer ${window.localStorage.getItem('loginToken')}`

			axios.defaults.headers.common['Authorization'] = TOKEN
			console.log(axios.defaults.headers)
		})
	}	

	isAuthenticated(){
		return !!window.localStorage.getItem('loginToken');
	}

	logout(){
		window.localStorage.removeItem('loginToken');
		delete axios.defaults.headers.common['Authorization']
	}
}

export const authService = new AuthService();