import axios from './axios'


export const registerUserRequest = async (user) => axios.post(`/user/registerUser`, user)

export const loginUserRequest = async (user) => axios.post(`/user/login`, user)

export const getUserProfileRequest = async (token, id) => axios.get(`/user/profile/${token}`, id)

export const updatePasswordRecoveryRequest = async (user) => axios.put(`/user/updatePasswordRecovery`, user)

export const searchRecoveryRequest = async (email) => axios.post(`/user/sendEmail/email`, email)

export const verifyUserTokenRequest = async(token) =>axios.get(`/user/verify/${token}`)
// export const verifyUserTokenRequest = async(token) =>axios.get(`/user/verify?token=${token}`)

export const verifyUserRoleTokenRequest = async(token) =>axios.get(`/user/verifyUser/${token}`)