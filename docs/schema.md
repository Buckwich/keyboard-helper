# Schemas

There are multiple different implementations of a schema to represent a keyboard. This document will go over them and derives a common schema from them.

## References

Different current schema implementations

### QMK

Ref: https://github.com/qmk/qmk_firmware/blob/master/docs/reference_info_json.md#layouts-idlayouts

concentrating on the layout schema. A list of key dictionaries comprising the layout. Each key dictionary contains:

- `matrix` (Required)
  - The matrix position for the key.
  - Example: `[0, 4]` (row 0, column 4)
- `x` (Required)
  - The absolute position of the key in the horizontal axis, in key units.
- `y` (Required)
  - The absolute position of the key in the vertical axis, in key units.
- `h`
  - The height of the key, in key units.
  - Default: `1` (1u)
- `label`
  - What to name the key. This is _not_ a key assignment as in the keymap, but should usually correspond to the keycode for the first layer of the default keymap.
  - Example: `"Escape"`
- `r`
  - The rotation angle in degrees. Currently not implemented.
- `rx`
  - The absolute X position of the rotation axis. Currently not implemented.
- `ry`
  - The absolute Y position of the rotation axis. Currently not implemented.
- `w`
  - The width of the key, in key units.
  - Default: `1` (1u)
- `encoder`
  - The index of an encoder this key should be linked to
- Example: `{"label": "Shift", "matrix": [4, 0], "x": 0, "y": 4.25, "w": 2.25}`

### KLE

Ref: https://github.com/ijprest/kle-serial

Keyboard Layout Editor (KLE) has two versions of its schema. A serilized version with wich you are probably more familiar. Its easy to write and manipulate by hand. But its not directly machine readable. To convert the serialized version to a machine readable version, you can use [KLE serial](https://github.com/ijprest/kle-serial). The lib also describes the serialized schema which will be referenced here.

- `color` — the keycap color, e.g., `"#ff0000"` for red.
- `labels` — an array of up to 12 text labels (sometimes referred to as
  'legends'):
  - In reading order, i.e., left-to-right, top-to-bottom:
  - The labels are user input, and may contain arbitrary HTML content; when
    rendering, input sanitization is recommended for security purposes.
- `textColor` — an array of up to 12 colors (e.g., `"#ff0000"`), to be used for
  the text labels; if any entries are `null` or `undefined`, you should use the
  `default.textColor`.
- `textSize` — an array of up to 12 sizes (integers 1-9), to be used for the
  text labels; if any entries are `null` or `undefined`, you should use the
  `default.textSize`.
  - Note that the sizes are relative and do not correspond to any fixed font
    size.
  - KLE uses the following formula when rendering on-screen:
    - (6px + 2px \* _textSize_)
- `default.textColor` / `default.textSize` — the default text color / size.
- `x` / `y` — the absolute position of the key in keyboard units (where _1u_ is
  the size of a standard 1x1 keycap).
- `width` / `height` — the size of the key, in keyboard units.
- `x2` / `y2` / `width2` / `height2` — the size & position of the _second_
  rectangle that is used to define oddly-shaped keys (like an
  [ISO Enter or Big-ass Enter key](https://deskthority.net/wiki/Return_key) or
  [stepped keys](https://deskthority.net/wiki/Keycap#Stepped_keycaps)).
  - If the size is (0,0), then there is no second rectangle required.
  - The position is relative to (`x`, `y`).
  - The two rectangles can be thought of as overlapping, combining to create the
    desired key shape.
    - Note that labels are always positioned relative to the main rectangle.
    - If a key is `stepped`, the second rectangle is the lower part.
    - ![oddly-shapped key illustration](images/oddly-shaped.png)
    - In this example, the second rectangle is shown on top of the original
      rectangle, and (`x2`,`y2`) [`width` x `height`] = (-0.75, 1.0) [2.25 x
      1.0].
- `rotation_x` / `rotation_y` — defines the center of rotation for the key.
- `rotation_angle` — specifies the angle the key is rotated (about the center of
  rotation).
- `decal` — specifies that the key is a 'decal', meaning that only the text
  labels should be rendered, not the keycap borders.
- `ghost` — specifies that key key is 'ghosted', meaning that it is to be
  rendered unobtrusively; typically semi-transparent and without any labels.
- `stepped` — specifies that the key is
  [stepped](https://deskthority.net/wiki/Keycap#Stepped_keycaps).
- `nub` — specifies that the key has a homing nub / bump / dish; the exact
  rendering will depend on the key's `profile`.
- `profile` — specifies the key's "profile" (and row, for those profiles that
  vary depending on the row), e.g., "`DCS R1`" or "`DSA`".
  - Currently supported / known profiles: `SA`, `DSA`, `DCS`, `OEM`, `CHICKLET`,
    `FLAT`
  - Currently supported / known rows: `R1`, `R2`, `R3`, `R4`, `R5`, `SPACE`
- `sm` / `sb` / `st` — the switch _mount_, _brand_, and _type_, overriding the
  default values specified in the keyboard metadata.

### VIA

Ref: https://www.caniusevia.com/docs/layouts

VIA uses the same serialised schema as KLE with some rules:

- Horizontal and vertical gaps are allowed (for separation of rows, columns, blockers, etc.)
- Do not use stepped keys.
- Rotated keys are allowed but layout options for rotated keys is not supported.
- Use key color #cccccc for alphas, #aaaaaa for modifier keys and #777777 for accents (i.e. Esc, Enter, arrows, etc).
- Use legend color #000000 for all legends

- matrix (`0,1`) in the top left corner
- encoder (`e0`) in the center middle
- layout choice in the bottom right corner

### VIAL

Ref: https://get.vial.today/docs/porting-to-via.html

VIAL also uses serialised KLE as the base. Keys and layout are similar to VIA.

- matrix (`0,1`) in the top left corner
- layout choice in the bottom right corner

But Encoders are handled differently:

- encoders are represented in multiple keys (https://get.vial.today/docs/encoders.html)

## Derived Schema

### Design Decisions

- Make it easy to consum/render the schema. Normalization and deserializion should happen outside of the schema.
- Support all features of QMK,VIA,VIAL (via converters)
- For KLE support the most common features
  - Supported :
    - rotation
    - odd shaped keys
    - nubs
    - 12 labels with colors and sizes
  - NOT supported (for now):
    - stepped keys
    - ghosted keys
    - decal keys
    - switch mount, brand, type
    - profile
- Make it storable as KLE JSON

### Layout Schema

A layout consists of an array of keys. Each key is a object with the following properties:

- layout:
  - x: Absolute position of the key in the horizontal axis, in key units.
  - y: Absolute position of the key in the vertical axis, in key units.
  - w: The width of the key, in key units.
  - h: The height of the key, in key units.
  - x2: The absolute position of the second rectangle in the horizontal axis, in key units.
  - y2: The absolute position of the second rectangle in the vertical axis, in key units.
  - w2: The width of the second rectangle, in key units.
  - h2: The height of the second rectangle, in key units.
  - r: The rotation angle in degrees (0-360).
  - rx: The absolute X position of the rotation point.
  - ry: The absolute Y position of the rotation point.
  - labels:
    - An object with 12 positions that can be undefined, a string (then default color and size is used) or an object with color, size and text.
    - The posions are:
      - `tl`, `tc`, `tr` top
      - `ml`, `mc`, `mr` middle
      - `bl`, `bc`, `br` bottom
      - `fl`, `fc`, `fr` front

For a typescript interface reference see [libs/keyboard-schema/src/lib/keyboard-schema.ts](../libs/keyboard-schema/src/lib/keyboard-schema.ts)
