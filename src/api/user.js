import axios from './axios'


export const registerUserRequest = async (user) => axios.post(`/user/registerUser`, user)

export const loginUserRequest = async (user) => axios.post(`/user/login`, user)

export const getUserProfileRequest = async (id) => axios.get(`/user/profile`, id)

export const updatePasswordRecoveryRequest = async (user) => axios.post(`/user/updatePasswordRecovery`, user)

export const searchRecoveryRequest = async (email) => axios.post(`/user/sendEmail/email`, email)

export const verifyUserTokenRequest = async() =>axios.get('/user/verify')

export const verifyUserRoleTokenRequest = async() =>axios.get('/user/verifyUser')