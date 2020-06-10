const headerNavStore = {
    state: () => ({
        headerNavTitle: "1"
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