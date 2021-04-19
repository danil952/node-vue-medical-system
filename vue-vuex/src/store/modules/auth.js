import authService from '../../service/auth.service';
import { router } from '../../router';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

export default {
    namespaced: true,
    state: initialState,
    actions: {
        login({commit,dispatch }, { username, password, type}) {
            commit('loginRequest', { username });
            authService.login(username, password,type)
                .then(
                    user => {
                        commit('loginSuccess', user);
                        user.type=='client'?router.push('/client')
                        :router.push('/doctor')
                    },
                    error => {
                        commit('loginFailure', error);
                        dispatch('alert/error', error, { root: true });
                    }
                );
        },
        logout({ commit }) {
            authService.logout();
            commit('logout');
        },
        registrClient({dispatch },{username,password,name,surname,age})
        {
            authService.registerClient(username,password,name,surname,age)
            .then(
                ()=>
                {
                    dispatch('alert/success', 'Регистрация прошла успешно', { root: true });
                    router.push('/login');
                },
                error => {
                    dispatch('alert/error', error, { root: true });
                }
            )
        },
        registrDoctor({dispatch },{username,password,name,surname,type_id})
        {
            authService.registerDoctor(username,password,name,surname,type_id)
            .then(
                ()=>
                {
                    dispatch('alert/success', 'Регистрация прошла успешно', { root: true });
                    router.push('/login');
                },
                error => {
                    dispatch('alert/error', error, { root: true });
                }
            )
        }
    },
    mutations: {
        loginRequest(state, user) {
            state.status = { loggingIn: true };
            state.user = user;
        },
        loginSuccess(state, user) {
            state.status = { loggedIn: true };
            state.user = user;
        },
        loginFailure(state) {
            state.status = {};
            state.user = null;
        },
        logout(state) {
            state.status = {};
            state.user = null;
        }
    }
}
