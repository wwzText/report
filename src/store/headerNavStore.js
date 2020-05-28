const headerNavStore = {
    state: {
        headerNavTitle: '测试'
    },

    mutations: {
        changeHeaderNavTitle(state, newName) {
            state.headerNavTitle = newName;
        }
    }
    
}

export {
    headerNavStore
}