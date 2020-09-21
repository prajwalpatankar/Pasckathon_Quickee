import axios from 'axios'

export const register = newUser => {
  return axios
    .post('/register', {
      username: newUser.username,
      password: newUser.password
    })
    .then(response => {
      console.log('Registered')
    })
}