export const auth = {
  userID() {
    const user = this.user();
    if (user) {
      return user.id
    }
  },
  user() {
    return JSON.parse(localStorage.getItem('user'))
  },
  isAuthenticated() {
    return localStorage.getItem('authenticated') === 'true'
  },
  authenticate(user) {
    localStorage.setItem('authenticated', true);
    localStorage.setItem('user', JSON.stringify(user));
  },
  signOut() {
    localStorage.setItem('authenticated', false);
  }
};


