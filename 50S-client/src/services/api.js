import axios from "axios";

// Check if the user has a token and if is true set Autorization to the header, otherwise delete the Authorization
export function setTokenHeader(token){
    if(token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

// Make request to the api
export function apiCall(method, path, data = null){
    const result =  new Promise((resolve, reject) => {
        return axios[method](path, data).then(res => {
            return resolve(res.data)
        }).catch(err => {
            return reject(err.response.data.error)
        })
    })
    return result
}

export function apiCallGet(path){
    const result =  new Promise((resolve, reject) => {
        return axios.get(path).then(res => {
            return resolve(res.data)
        }).catch(err => {
            return reject(err.response.data.error)
        })
    })
    return result
}