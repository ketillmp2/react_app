import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

//FIXME: УЕБАШИТЬ ПОРТ И ПОСТАВИТЬ /api
const API_ROOT = 'http://localhost:22206';

const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
    if (token) {
        req.set('Authorization', `Basic ${token}`);
    }
};

const requests = {
    get: url =>
        superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody).catch(err => console.log(err)),
    post: (url, body) =>
        superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
};

const Points = {
    all: () =>
        requests.get('/points'),
    recalculated: (r) =>
        requests.get(`/points/recalculate?r=${r}`),
    new: (x, y, r) =>
        requests.post('/points', {x: x, y: y, r: r})
};

const Auth = {
    login: (username, password) =>
        requests.post('/login', { username: username, password: password }),
    logout: () =>
        requests.post('/logout'),
};

export default {
    Points,
    Auth,
    setToken: _token => { token = _token; }
};
