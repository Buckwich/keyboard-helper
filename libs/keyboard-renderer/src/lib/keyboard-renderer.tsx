import { KCFKeyboard } from '@keyboard-helper/keyboard-schema';

export interface KeyboardRendererProps {
  keyboard: KCFKeyboard;
}

export function KeyboardRenderer(props: KeyboardRendererProps) {
  /* keyunit */
  const u = 50;
  /* padding x (left & right)*/
  const px = 4;
  /* padding top*/
  const pt = 2;
  /* padding bottom*/
  const pb = 12;
  /* margin*/
  const m = 1;
  /*
  stroke width 
  NOTE svg border stroke with is set from the center of the line
  */
  const sw = 1;

  /* font size*/
  const fs = 12;

  const size = getSvgSize(props.keyboard.layout, u);
  console.log(size);
  return (
    <svg
      width={size.svgWidth}
      height={size.svgHeight}
      viewBox={`0 0 ${size.svgWidth} ${size.svgHeight}`}
      style={{ width: '100%' }}
    >
      {props.keyboard.layout.map((key, index) => {
        return (
          <svg x={key.x * u} y={key.y * u} width={key.w * u} height={key.h * u} fontSize={fs - 1}>
            <rect
              fill="#ccc"
              x={0.5 * sw}
              y={0.5 * sw}
              width={key.w * u - sw}
              height={key.h * u - sw}
              rx={4}
              stroke="black"
              strokeWidth={sw}
            ></rect>

            <svg
              fill="#000"
              x={px + sw}
              y={pt + sw}
              width={key.w * u - 2 * px - 2 * sw}
              height={key.h * u - pt - pb - 2 * sw}
            >
              <rect fill="#fff" width="100%" height="100%" rx={2}></rect>

              <g dominantBaseline="hanging">
                <text y="0%" x="0%" textAnchor="start">
                  {key.labels.tl?.text}
                </text>
                <text y="0%" x="50%" textAnchor="middle">
                  {key.labels.tc?.text}
                </text>
                <text y="0%" x="100%" textAnchor="end">
                  {key.labels.tr?.text}
                </text>
              </g>

              <g dominantBaseline="middle">
                <text y="50%" x="0%" textAnchor="start">
                  {key.labels.ml?.text}
                </text>
                <text y="50%" x="50%" textAnchor="middle">
                  {key.labels.mc?.text}
                </text>
                <text y="50%" x="100%" textAnchor="end">
                  {key.labels.mr?.text}
                </text>
              </g>

              <g dominantBaseline="ideographic">
                <text y="100%" x="0%" textAnchor="start">
                  {key.labels.bl?.text}
                </text>
                <text y="100%" x="50%" textAnchor="middle">
                  {key.labels.bc?.text}
                </text>
                <text y="100%" x="100%" textAnchor="end">
                  {key.labels.br?.text}
                </text>
              </g>
            </svg>
            <g dominantBaseline="ideographic">
              <text y={key.h * u} x={px + m} textAnchor="start">
                {key.labels.fl?.text}
              </text>
              <text y={key.h * u} x="50%" textAnchor="middle">
                {key.labels.fc?.text}
              </text>
              <text y={key.h * u} x={key.w * u - px} textAnchor="end">
                {key.labels.fr?.text}
              </text>
            </g>
          </svg>
        );
      })}
    </svg>
  );
}

function getSvgSize(keys: { x: number; y: number; w: number; h: number }[], u: number) {
  const uSize = keys.reduce(
    ({ svgWidth, svgHeight }, { x, w, y, h }) => ({
      svgWidth: Math.max(svgWidth, x + w),
      svgHeight: Math.max(svgHeight, y + h),
    }),
    { svgWidth: 0, svgHeight: 0 }
  ); // Initialize with 0 or appropriate minimum values
  return {
    svgWidth: uSize.svgWidth * u,
    svgHeight: uSize.svgHeight * u,
  };
}

export default KeyboardRenderer;
