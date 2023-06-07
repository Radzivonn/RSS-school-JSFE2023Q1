import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '7ca0f75d7e094795b7e58c3ec8946014', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
