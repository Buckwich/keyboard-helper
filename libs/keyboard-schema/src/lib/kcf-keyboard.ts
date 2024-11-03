export interface KCFKeyboard {
  layout: KCFKey[];
}

export interface KCFKey {
  /*Absolute position of the key in the horizontal axis, in key units.*/
  x: number;
  /*Absolute position of the key in the vertical axis, in key units.*/
  y: number;
  /*The width of the key, in key units.*/
  w: number;
  /*The height of the key, in key units.*/
  h: number;

  col?: number;
  row?: number;
  led?: number;

  /*The absolute position of the second rectangle in the horizontal axis, in key units.*/
  x2?: number;
  /*The absolute position of the second rectangle in the vertical axis, in key units.*/
  y2?: number;
  /*The width of the second rectangle, in key units.*/
  w2?: number;
  /*The height of the second rectangle, in key units.*/
  h2?: number;

  /*The rotation angle in degrees (0-360).*/
  r?: number;
  /*The absolute X position of the rotation point.*/
  rx?: number;
  /*The absolute Y position of the rotation point.*/
  ry?: number;

  labels: KCFLabels;
}

export interface KCFLabels {
  /*top left*/
  tl?: KCFLabel;
  /*top center*/
  tc?: KCFLabel;
  /*top right*/
  tr?: KCFLabel;

  /*middle left*/
  ml?: KCFLabel;
  /*middle center*/
  mc?: KCFLabel;
  /*middle right*/
  mr?: KCFLabel;

  /*bottom left*/
  bl?: KCFLabel;
  /*bottom center*/
  bc?: KCFLabel;
  /*bottom right*/
  br?: KCFLabel;

  /*front left*/
  fl?: KCFLabel;
  /*front center*/
  fc?: KCFLabel;
  /*front right*/
  fr?: KCFLabel;
}

export interface KCFLabel {
  color?: string;
  size?: number;
  text: string;
}
