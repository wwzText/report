const terminalVisitReportStore = {
    state: {
        headerNavTitle: ''
    },

    mutations: {
        changeHeaderNavTitle(state, payload) {
            state.headerNavTitle = payload.name;
        }
    }
    
}

export {
    terminalVisitReportStore
}