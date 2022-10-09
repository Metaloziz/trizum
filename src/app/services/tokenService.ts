class TokenService {
  getLocalRefreshToken() {
    const temp = localStorage.getItem('user_secret');
    const user = temp ? JSON.parse(temp) : temp;
    return user?.refreshToken;
  }

  getLocalAccessToken() {
    const temp = localStorage.getItem('user_secret');
    return temp && JSON.parse(temp);
  }

  updateLocalAccessToken(token: string) {
    // const temp = localStorage.getItem('user_secret');
    // const user: UserStorageT = temp ? JSON.parse(temp) : '';
    // user = token;
    localStorage.setItem('user_secret', JSON.stringify(token));
  }

  getUser() {
    const user = localStorage.getItem('user_secret');
    return user ? JSON.parse(user) : '';
  }

  setUser(user: string) {
    localStorage.setItem('user_secret', JSON.stringify(`Bearer ${user}`));
  }

  removeUser() {
    localStorage.removeItem('user_secret');
  }
}

export default new TokenService();
