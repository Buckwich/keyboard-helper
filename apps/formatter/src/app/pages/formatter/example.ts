export const exampleKeyboardInfo = JSON.stringify({
  keyboard_name: 'Kyria rev3',
  usb: {
    pid: '0xCF44',
  },
  bootmagic: {
    matrix: [0, 6],
  },
  build: {
    lto: true,
  },
  features: {
    mousekey: true,
    bootmagic: true,
    extrakey: true,
    oled: true,
    rgb_matrix: true,
  },
  layout_aliases: {
    LAYOUT: 'LAYOUT_split_3x6_5',
  },
  layouts: {
    LAYOUT_split_3x6_5: {
      layout: [
        { label: 'L06', matrix: [0, 6], x: 0, y: 0.75 },
        { label: 'L05', matrix: [0, 5], x: 1, y: 0.75 },
        { label: 'L04', matrix: [0, 4], x: 2, y: 0.25 },
        { label: 'L03', matrix: [0, 3], x: 3, y: 0 },
        { label: 'L02', matrix: [0, 2], x: 4, y: 0.25 },
        { label: 'L01', matrix: [0, 1], x: 5, y: 0.5 },

        { label: 'R01', matrix: [4, 1], x: 10.5, y: 0.5 },
        { label: 'R02', matrix: [4, 2], x: 11.5, y: 0.25 },
        { label: 'R03', matrix: [4, 3], x: 12.5, y: 0 },
        { label: 'R04', matrix: [4, 4], x: 13.5, y: 0.25 },
        { label: 'R05', matrix: [4, 5], x: 14.5, y: 0.75 },
        { label: 'R06', matrix: [4, 6], x: 15.5, y: 0.75 },

        { label: 'L12', matrix: [1, 6], x: 0, y: 1.75 },
        { label: 'L11', matrix: [1, 5], x: 1, y: 1.75 },
        { label: 'L10', matrix: [1, 4], x: 2, y: 1.25 },
        { label: 'L09', matrix: [1, 3], x: 3, y: 1 },
        { label: 'L08', matrix: [1, 2], x: 4, y: 1.25 },
        { label: 'L07', matrix: [1, 1], x: 5, y: 1.5 },

        { label: 'R07', matrix: [5, 1], x: 10.5, y: 1.5 },
        { label: 'R08', matrix: [5, 2], x: 11.5, y: 1.25 },
        { label: 'R09', matrix: [5, 3], x: 12.5, y: 1 },
        { label: 'R10', matrix: [5, 4], x: 13.5, y: 1.25 },
        { label: 'R11', matrix: [5, 5], x: 14.5, y: 1.75 },
        { label: 'R12', matrix: [5, 6], x: 15.5, y: 1.75 },

        { label: 'L20', matrix: [2, 6], x: 0, y: 2.75 },
        { label: 'L19', matrix: [2, 5], x: 1, y: 2.75 },
        { label: 'L18', matrix: [2, 4], x: 2, y: 2.25 },
        { label: 'L17', matrix: [2, 3], x: 3, y: 2 },
        { label: 'L16', matrix: [2, 2], x: 4, y: 2.25 },
        { label: 'L15', matrix: [2, 1], x: 5, y: 2.5 },
        { label: 'L14', matrix: [3, 3], x: 6, y: 3 },
        { label: 'L13', matrix: [2, 0], x: 7, y: 3.25 },

        { label: 'R13', matrix: [6, 0], x: 8.5, y: 3.25 },
        { label: 'R14', matrix: [7, 3], x: 9.5, y: 3 },
        { label: 'R15', matrix: [6, 1], x: 10.5, y: 2.5 },
        { label: 'R16', matrix: [6, 2], x: 11.5, y: 2.25 },
        { label: 'R17', matrix: [6, 3], x: 12.5, y: 2 },
        { label: 'R18', matrix: [6, 4], x: 13.5, y: 2.25 },
        { label: 'R19', matrix: [6, 5], x: 14.5, y: 2.75 },
        { label: 'R20', matrix: [6, 6], x: 15.5, y: 2.75 },

        { label: 'L25', matrix: [3, 4], x: 2.5, y: 3.25 },
        { label: 'L24', matrix: [3, 2], x: 3.5, y: 3.25 },
        { label: 'L23', matrix: [3, 1], x: 4.5, y: 3.5 },
        { label: 'L22', matrix: [3, 5], x: 5.5, y: 4 },
        { label: 'L21', matrix: [3, 0], x: 6.5, y: 4.25 },

        { label: 'R21', matrix: [7, 0], x: 9, y: 4.25 },
        { label: 'R22', matrix: [7, 5], x: 10, y: 4 },
        { label: 'R23', matrix: [7, 1], x: 11, y: 3.5 },
        { label: 'R24', matrix: [7, 2], x: 12, y: 3.25 },
        { label: 'R25', matrix: [7, 4], x: 13, y: 3.25 },
      ],
    },
  },
  diode_direction: 'COL2ROW',
  matrix_pins: {
    rows: ['D4', 'C6', 'D7', 'E6'],
    cols: ['B4', 'F6', 'F7', 'B1', 'B3', 'B2', 'B6'],
  },
  encoder: {
    enabled: true,
    rotary: [{ pin_a: 'F4', pin_b: 'F5' }],
  },
  split: {
    bootmagic: {
      matrix: [4, 6],
    },
    soft_serial_pin: 'D2',
    matrix_pins: {
      right: {
        rows: ['F6', 'F7', 'B1', 'B3'],
        cols: ['B2', 'D4', 'C6', 'D7', 'E6', 'B4', 'B6'],
      },
    },
    encoder: {
      right: {
        rotary: [{ pin_a: 'F4', pin_b: 'F5' }],
      },
    },
  },
  rgblight: {
    led_count: 62,
    split: true,
    split_count: [31, 31],
    max_brightness: 128,
  },
  ws2812: {
    pin: 'D3',
  },
  rgb_matrix: {
    driver: 'ws2812',
    layout: [
      { flags: 2, x: 75, y: 2 }, // L RGB1
      { flags: 2, x: 50, y: 1 }, // L RGB2
      { flags: 2, x: 14, y: 4 }, // L RGB3
      { flags: 2, x: 25, y: 45 }, // L RGB4
      { flags: 2, x: 58, y: 49 }, // L RGB5
      { flags: 2, x: 94, y: 53 }, // L RGB6
      { flags: 4, matrix: [3, 0], x: 94, y: 64 }, // L SW21
      { flags: 4, matrix: [3, 5], x: 79, y: 60 }, // L SW22
      { flags: 4, matrix: [3, 1], x: 65, y: 53 }, // L SW23
      { flags: 4, matrix: [3, 2], x: 51, y: 49 }, // L SW24
      { flags: 4, matrix: [3, 4], x: 36, y: 49 }, // L SW25
      { flags: 4, matrix: [2, 0], x: 101, y: 49 }, // L SW13
      { flags: 4, matrix: [3, 3], x: 87, y: 45 }, // L SW14
      { flags: 4, matrix: [2, 1], x: 72, y: 38 }, // L SW15
      { flags: 4, matrix: [2, 2], x: 58, y: 34 }, // L SW16
      { flags: 4, matrix: [2, 3], x: 43, y: 30 }, // L SW17
      { flags: 4, matrix: [2, 4], x: 29, y: 34 }, // L SW18
      { flags: 4, matrix: [2, 5], x: 14, y: 41 }, // L SW19
      { flags: 4, matrix: [2, 6], x: 0, y: 41 }, // L SW20
      { flags: 4, matrix: [1, 1], x: 72, y: 23 }, // L SW07
      { flags: 4, matrix: [1, 2], x: 58, y: 19 }, // L SW08
      { flags: 4, matrix: [1, 3], x: 43, y: 15 }, // L SW09
      { flags: 4, matrix: [1, 4], x: 29, y: 19 }, // L SW10
      { flags: 4, matrix: [1, 5], x: 14, y: 26 }, // L SW11
      { flags: 4, matrix: [1, 6], x: 0, y: 26 }, // L SW12
      { flags: 4, matrix: [0, 1], x: 72, y: 8 }, // L SW01
      { flags: 4, matrix: [0, 2], x: 58, y: 4 }, // L SW02
      { flags: 4, matrix: [0, 3], x: 43, y: 0 }, // L SW03
      { flags: 4, matrix: [0, 4], x: 29, y: 4 }, // L SW04
      { flags: 4, matrix: [0, 5], x: 14, y: 11 }, // L SW05
      { flags: 4, matrix: [0, 6], x: 0, y: 11 }, // L SW06
      { flags: 2, x: 149, y: 2 }, // R RGB1
      { flags: 2, x: 174, y: 1 }, // R RGB2
      { flags: 2, x: 210, y: 4 }, // R RGB3
      { flags: 2, x: 199, y: 45 }, // R RGB4
      { flags: 2, x: 166, y: 49 }, // R RGB5
      { flags: 2, x: 130, y: 53 }, // R RGB6
      { flags: 4, matrix: [7, 0], x: 130, y: 64 }, // R SW21
      { flags: 4, matrix: [7, 5], x: 145, y: 60 }, // R SW22
      { flags: 4, matrix: [7, 1], x: 159, y: 53 }, // R SW23
      { flags: 4, matrix: [7, 2], x: 173, y: 49 }, // R SW24
      { flags: 4, matrix: [7, 4], x: 188, y: 49 }, // R SW25
      { flags: 4, matrix: [6, 0], x: 123, y: 49 }, // R SW13
      { flags: 4, matrix: [7, 3], x: 137, y: 45 }, // R SW14
      { flags: 4, matrix: [6, 1], x: 152, y: 38 }, // R SW15
      { flags: 4, matrix: [6, 2], x: 166, y: 34 }, // R SW16
      { flags: 4, matrix: [6, 3], x: 181, y: 30 }, // R SW17
      { flags: 4, matrix: [6, 4], x: 195, y: 34 }, // R SW18
      { flags: 4, matrix: [6, 5], x: 210, y: 41 }, // R SW19
      { flags: 4, matrix: [6, 6], x: 224, y: 41 }, // R SW20
      { flags: 4, matrix: [5, 1], x: 152, y: 23 }, // R SW07
      { flags: 4, matrix: [5, 2], x: 166, y: 19 }, // R SW08
      { flags: 4, matrix: [5, 3], x: 181, y: 15 }, // R SW09
      { flags: 4, matrix: [5, 4], x: 195, y: 19 }, // R SW10
      { flags: 4, matrix: [5, 5], x: 210, y: 26 }, // R SW11
      { flags: 4, matrix: [5, 6], x: 224, y: 26 }, // R SW12
      { flags: 4, matrix: [4, 1], x: 152, y: 8 }, // R SW01
      { flags: 4, matrix: [4, 2], x: 166, y: 4 }, // R SW02
      { flags: 4, matrix: [4, 3], x: 181, y: 0 }, // R SW03
      { flags: 4, matrix: [4, 4], x: 195, y: 4 }, // R SW04
      { flags: 4, matrix: [4, 5], x: 210, y: 11 }, // R SW05
      { flags: 4, matrix: [4, 6], x: 224, y: 11 }, // R SW06
    ],
    max_brightness: 128,
  },
});
