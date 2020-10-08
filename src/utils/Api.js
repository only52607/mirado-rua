let serverUrl = 'http://localhost'

let baseURL = serverUrl + '/api/v1'
let axiosInstance = axios.create({
	baseURL,
	timeout: 1000,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
})
axiosInstance.baseURL = baseURL
axiosInstance.serverUrl = serverUrl

axiosInstance.interceptors.request.use((config) => {
	config.headers.Authorization = localStorage.authorization
	return config;
})

axiosInstance.interceptors.response.use((response) => {
    var token = response.headers.authorization
    if (token) {
	   localStorage.authorization = token
    }
    return response
})

export default axiosInstance