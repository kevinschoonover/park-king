export const auth = {
  isAuthenticated() {
    return localStorage.getItem('authenticated') == 'true'
  },
  authenticate() {
    localStorage.setItem('authenticated', true);
  },
  signOut() {
    localStorage.setItem('authenticated', false);
  }
};


