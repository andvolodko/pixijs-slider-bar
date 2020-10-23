import * as PIXI from 'pixi.js';

export default class SliderBar {
  constructor(config, engine) {
    this.config = config;
    this.engine = engine;
    this.init();
  }

  init() {
    this.container = new PIXI.Container();
    this.container.x = this.config.x;
    this.container.y = this.config.y;
    this.progressValue = this.config.value;
    this.isMove = false;
    this.sheet = this.engine.app.loader.resources[this.config.sheet];

    this.addIcon();
    this.addBar();
    this.addDot();

    this.update();

    this.addListeners();

    //TODO
    //this.addTexts();
    //Icon click handlers
    //Bar click handlers

    this.engine.app.stage.addChild(this.container);
    this.engine.app.stage.interactive = true;
  }

  addListeners() {
    this.downListener = this.onDown.bind(this);
    this.moveListener = this.onMove.bind(this);
    this.upListener = this.onUp.bind(this);
    this.outListener = this.onOut.bind(this);
    this.dot.on('pointerdown', this.downListener);
    this.engine.app.stage.on('pointermove', this.moveListener);
    this.engine.app.stage.on('pointerup', this.upListener);
    this.engine.app.stage.on('pointerout', this.outListener);
  }

  removeListeners() {
    this.dot.off('pointerdown', this.downListener);
    this.engine.app.stage.off('pointermove', this.moveListener);
    this.engine.app.stage.off('pointerup', this.upListener);
    this.engine.app.stage.off('pointerout', this.outListener);
  }

  onDown(data) {
    this.isMove = true;
    console.log('SliderBar: Down');
  }

  onMove(data) {
    if (this.isMove === true) {
      this.calcMove(data);
      this.update();
    }
    console.log('SliderBar: Move');
  }

  onUp(data) {
    this.isMove = false;
    console.log('SliderBar: Up');
  }

  onOut(data) {
    this.isMove = false;
    console.log('SliderBar: Out');
  }

  addBar() {

    this.bar = new PIXI.NineSlicePlane(this.sheet.textures[this.config.bg.sprite_off],
      this.config.bg.texture.lw,
      this.config.bg.texture.th,
      this.config.bg.texture.rw,
      this.config.bg.texture.bh
    );
    this.barFilled = new PIXI.NineSlicePlane(this.sheet.textures[this.config.bg.sprite_on],
      this.config.bg.texture.lw,
      this.config.bg.texture.th,
      this.config.bg.texture.rw,
      this.config.bg.texture.bh
    );

    this.bar.x = this.config.bg.x;
    this.bar.y = this.config.bg.y;
    this.bar.width = this.config.bg.width;
    this.bar.height = this.config.bg.height;

    this.barFilled.x = this.config.bg.x;
    this.barFilled.y = this.config.bg.y;
    this.barFilled.width = this.config.bg.width;
    this.barFilled.height = this.config.bg.height;

    this.iconOff.visible = false;

    this.container.addChild(this.bar);
    this.container.addChild(this.barFilled);
  }

  addIcon() {
    this.iconOn = new PIXI.Sprite(this.sheet.textures[this.config.icon.sprite_on]);
    this.iconOff = new PIXI.Sprite(this.sheet.textures[this.config.icon.sprite_off]);

    this.iconOn.x = this.config.icon.x;
    this.iconOn.y = this.config.icon.y;

    this.iconOff.x = this.config.icon.x;
    this.iconOff.y = this.config.icon.y;

    this.iconOff.visible = false;

    this.container.addChild(this.iconOn);
    this.container.addChild(this.iconOff);
  }

  addDot() {
    this.dot = new PIXI.Sprite(this.sheet.textures[this.config.dot.sprite]);
    this.dot.interactive = true;
    this.dot.anchor.x = this.config.dot.anchor.x;
    this.dot.anchor.y = this.config.dot.anchor.y;
    if (this.config.dot.cursor === true) {
      this.dot.buttonMode = true;
    }
    this.container.addChild(this.dot);
  }

  updateDotPosition() {
    this.dot.x = this.barFilled.x + this.barFilled.width + this.config.dot.margin_x;
    this.dot.y = this.barFilled.y + this.config.dot.margin_y;
  }

  updateBar() {
    this.barFilled.width = this.progressValue * 0.01 * this.config.bg.width;
  }

  updateIcon() {
    this.barFilled.width = this.progressValue * 0.01 * this.config.bg.width;
    if (this.progressValue === 0) {
      this.iconOff.visible = true;
      this.iconOn.visible = false;
    } else {
      this.iconOff.visible = false;
      this.iconOn.visible = true;
    }
  }

  calcMove(data) {
    let newPosition = this.bar.toLocal(data.data.global);
    this.progressValue = (newPosition.x / this.config.bg.width) * 100;
    this.progressValue = Math.round(this.progressValue);
    this.progressValue = this.progressValue < 0 ? 0 : this.progressValue;
    this.progressValue = this.progressValue > 100 ? 100 : this.progressValue;
    console.log('SliderBar: ' + this.progressValue);
  }

  update() {
    this.updateBar();
    this.updateDotPosition();
    this.updateIcon();
    this.sendEvent();
  }

  sendEvent() {
    if(this.config.event && this.config.event !== 'undefined') {
      this.engine.dispatch(this.config.event, this.progressValue);
    }
  }

}
