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

    this.sheet = this.engine.app.loader.resources[this.config.sheet];

    this.addIcon();
    this.addBar();
    //this.addDot();

    //TODO
    //this.addTexts();

    this.engine.app.stage.addChild(this.container);
  }

  addBar() {

    this.bar = new PIXI.NineSlicePlane(this.sheet.textures[this.config.bg.sprite_on],
      this.config.bg.texture.lw,
      this.config.bg.texture.th,
      this.config.bg.texture.rw,
      this.config.bg.texture.bh
    );
    this.barFilled = new PIXI.NineSlicePlane(this.sheet.textures[this.config.bg.sprite_off],
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

}
