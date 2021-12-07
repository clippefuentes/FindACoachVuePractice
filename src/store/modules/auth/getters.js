export default {
  userId: state => state.userId,
  token: state => state.token,
  isAuthenticated: state => {
    return !!state.token
  },
  didAutoLogout: state => state.didAutoLogout,
}