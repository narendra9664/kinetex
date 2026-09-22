export const appParams = {
  appId: "futuristic-kinetix-motion-lab",
  token: typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null,
};
