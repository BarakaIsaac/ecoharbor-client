export const handleTokens = (response) => {
    const accessToken = response.headers['access-token'];
    const client = response.headers['client'];
    const uid = response.headers['uid'];

    if (accessToken && client && uid) {
        localStorage.setItem('access-token', accessToken);
        localStorage.setItem('client', client);
        localStorage.setItem('uid', uid);
    }
};

export  const saveTokens = (response) => {
    const accessToken = response.headers['access-token'];
    const client = response.headers['client'];
    const uid = response.headers['uid'];

    // Save the tokens in local storage
    localStorage.setItem('access-token', accessToken);
    localStorage.setItem('client', client);
    localStorage.setItem('uid', uid);
};