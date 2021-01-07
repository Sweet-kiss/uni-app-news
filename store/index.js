import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		historyLists: []
	},
	mutations: {
		SET_HISTORY (state, data) {
			let oldHistory = state.historyLists
			oldHistory.unshift(data)
			state.historyLists = oldHistory
	     }
	},
	actions: {
		set_historLists ({commit, state}, data) {
			commit('SET_HISTORY', data)
		}
	}	
})

export default store