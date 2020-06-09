import Vue from 'vue';

import loadingComponent from './loading.vue';

const LoadingModel = class vueLoadingModel {

    constructor() {
        this.instance = null
    }

    install() {

        const LoadingConstructor = Vue.extend(loadingComponent);

        const instance = new LoadingConstructor();

        instance.$mount(document.createElement('div'));

        document.body.appendChild(instance.$el);

        Vue.prototype.$showLoading = (obj) => {
            const {
                title
            } = { ...obj }
            instance.showLoadingBool = true,
            instance.loadingText = title || '加载中...'
        };

        Vue.prototype.$hideLoading = () => {
            instance.showLoadingBool = false
        };
    }
}

export {
    LoadingModel
}