import * as PIXI from 'pixi.js';

export default class GameEngine {
  constructor(config) {
    this.config = config;
    this.viewItems = [];
    this.initPIXIApp();
    this.parseConfig();
    this.loadResources(this.resourceLoaded.bind(this));
    //this.test();
  }

  initPIXIApp() {
    // The application will create a renderer using WebGL, if possible,
    // with a fallback to a canvas render. It will also setup the ticker
    // and the root stage PIXI.Container
    this.app = new PIXI.Application(this.config.pixiConfig);

    console.log('GameEngine: PIXI Initialized');
  }

  parseConfig() {
    console.log(this.config);
    console.log('GameEngine: Config parsed');
  }

  loadResources(callback) {
    this.config.resources.forEach(res => {
      this.app.loader.add(res);
    });

    this.app.loader.load(callback);
    console.log('GameEngine: Load resource');
  }

  resourceLoaded() {
    console.log('GameEngine: Resources loaded');
    this.createView();
  }

  createView() {
    this.config.view.forEach(item => {
      if (item.type !== 'undefined' && item.type) {
        console.log(item);
        this.viewItems.push(new item.type(item, this));
      }
    });
    console.log('GameEngine: View created');
  }

  show() {
    // The application will create a canvas element for you that you
    // can then insert into the DOM
    document.body.appendChild(this.app.view);
    console.log('GameEngine: PIXI showed');
  }

}
