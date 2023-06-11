import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IApp } from '../../types/index';

class App implements IApp {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start() {
        (<Element>document.querySelector('.sources')).addEventListener('click', (e) =>
            this.controller.getNews(e, (data) => this.view.drawNews(data))
        );
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
