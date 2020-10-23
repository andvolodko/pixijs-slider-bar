import SliderBar from "./slider-bar";

export default {
  pixiConfig: {
    width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1
  },
  components: [],
  resources: [
    'img/sprites.json'
  ],
  view: [
    {
      // TODO Text component
      name: 'Text',
      x: 100,
      y: 100,
      value: 'Test text'
    },

    {
      name: 'Slider bar',
      type: SliderBar,
      sheet: 'img/sprites.json',
      x: 100,
      y: 100,
      value: 50,
      bg: {
        texture: {
          lw: 10,
          rw: 10,
          th: 10,
          bh: 10
        },
        width: 300,
        height: 20,
        x: 200,
        y: 60,
        sprite_on: 'slider_back_filled.png',
        sprite_off: 'slider_back.png'
      },
      dot: {
        margin_x: 100,
        margin_y: 100,
        sprite: 'slider_dot.png'
      },
      icon: {
        x: 10,
        y: 10,
        sprite_on: 'sound_on.png',
        sprite_off: 'sound_off.png'
      }
    }
  ]
}
