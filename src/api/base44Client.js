export const base44 = {
  auth: {
    async loginViaEmailPassword(email, password) {
      return { user: { email } };
    },
    async loginWithProvider(provider, returnTo) {
      window.location.href = returnTo || '/';
    },
    async register({ email, password }) {
      return { status: 'ok' };
    },
    async verifyOtp({ email, otpCode }) {
      return { access_token: 'mock_token' };
    },
    async resendOtp(email) {
      return { status: 'ok' };
    },
    async requestPasswordReset(email) {
      return { status: 'ok' };
    },
    async resetPassword({ token, password }) {
      return { status: 'ok' };
    },
    setToken(token) {
      localStorage.setItem('auth_token', token);
    }
  }
};
