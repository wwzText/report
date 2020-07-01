const headerNavStore = {
    state: () => ({
        headerNavTitle: ""
    }),

    mutations: {
        changeHeaderNavTitle(state, payload) {
            state.headerNavTitle = payload.name;
        }
    }
    
}

export {
    headerNavStore
}