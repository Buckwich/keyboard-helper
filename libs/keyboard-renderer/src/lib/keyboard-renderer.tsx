import { KleKey } from '@kcf-hub/kle-serial';
import { KCFKey, KCFKeyboard } from '@keyboard-helper/keyboard-schema';

export interface KeyboardRendererProps {
  keyboard: KCFKeyboard;
}

export function KeyboardRenderer(props: KeyboardRendererProps) {
  if (!props.keyboard.layout.length)
    return <div>It looks like there a no keys in your keyboard. Are you sure you used a valid QMK info.json file?</div>;

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

  const rows = new Map<number, KCFKey[]>();
  const cols = new Map<number, KCFKey[]>();

  const drawMatrix = true;
  props.keyboard.layout.forEach((key) => {
    if (key.row !== undefined) rows.set(key.row, (rows.get(key.row) ? rows.get(key.row) : [])?.concat([key]) || []);
    if (key.col !== undefined) cols.set(key.col, (cols.get(key.col) ? cols.get(key.col) : [])?.concat([key]) || []);
  });

  const rowsArray: KCFKey[][] = Array.from(rows.values());
  rowsArray.forEach((row) => {
    row.sort((a, b) => (a.row || 0) - (b.row || 0));
  });

  const colsArray: KCFKey[][] = Array.from(cols.values());
  colsArray.forEach((col) => {
    col.sort((a, b) => (a.col || 0) - (b.col || 0));
  });

  console.log({ rows, cols, rowsArray, colsArray });
  return (
    <svg
      width={size.svgWidth}
      height={size.svgHeight}
      viewBox={`0 0 ${size.svgWidth} ${size.svgHeight}`}
      style={{ width: '100%' }}
    >
      <g>
        {props.keyboard.layout.map((key, index) => {
          // console.log(`${index}: ${key.x}, ${key.y} ${key.labels.mc?.text}`);

          const leftX = key.x * u + px + sw;
          const middleX = key.x * u + u * 0.5;
          const rightX = key.x * u + u - px - 2 * sw;

          const topY = key.y * u + pt + sw;
          const bottomY = topY + key.h * u - pt - pb - 2 * sw;
          const middleY = topY + (key.h * u - pt - pb - 1 * sw) / 2;
          const frontY = topY + key.h * u - 2 * sw;

          return (
            <g>
              <g key={index} fontSize={fs - 1} transform={`rotate(${key.r} ${(key.rx || 0) * u} ${(key.ry || 0) * u})`}>
                <rect
                  fill="#ccc"
                  x={key.x * u + 0.5 * sw}
                  y={key.y * u + 0.5 * sw}
                  width={key.w * u - sw}
                  height={key.h * u - sw}
                  rx={4}
                  stroke="black"
                  strokeWidth={sw}
                ></rect>

                <rect
                  fill="#fff"
                  x={key.x * u + px + sw}
                  y={key.y * u + pt + sw}
                  width={key.w * u - 2 * px - 2 * sw}
                  height={key.h * u - pt - pb - 2 * sw}
                  rx={2}
                ></rect>

                <g dominantBaseline="hanging">
                  <text x={leftX} y={topY} textAnchor="start">
                    {key.labels.tl?.text}
                  </text>
                  <text x={middleX} y={topY} textAnchor="middle">
                    {key.labels.tc?.text}
                  </text>
                  <text x={rightX} y={topY} textAnchor="end">
                    {key.labels.tr?.text}
                  </text>
                </g>

                <g dominantBaseline="middle">
                  <text x={leftX} y={middleY} textAnchor="start">
                    {key.labels.ml?.text}
                  </text>
                  <text x={middleX} y={middleY} textAnchor="middle">
                    {key.labels.mc?.text}
                  </text>
                  <text x={rightX} y={middleY} textAnchor="end">
                    {key.labels.mr?.text}
                  </text>
                </g>

                <g dominantBaseline="ideographic">
                  <text x={leftX} y={bottomY} textAnchor="start">
                    {key.labels.bl?.text}
                  </text>
                  <text x={middleX} y={bottomY} textAnchor="middle">
                    {key.labels.bc?.text}
                  </text>
                  <text x={rightX} y={bottomY} textAnchor="end">
                    {key.labels.br?.text}
                  </text>
                </g>

                <g dominantBaseline="ideographic">
                  <text x={leftX} y={frontY} textAnchor="start">
                    {key.labels.fl?.text}
                  </text>
                  <text x={middleX} y={frontY} textAnchor="middle">
                    {key.labels.fc?.text}
                  </text>
                  <text x={rightX} y={frontY} textAnchor="end">
                    {key.labels.fr?.text}
                  </text>
                </g>
              </g>
            </g>
          );
        })}
      </g>

      {drawMatrix &&
        rowsArray.map((rows, rowIndexY) => {
          return (
            <g>
              <title>{`row ${rowIndexY}`}</title>
              {rows.map((point: { x: string | number | undefined; y: string | number | undefined }, yIndex: number) => {
                if (rowIndexY === rows.length - 1) return null; // Skip last point for line
                const nextPoint = rows[yIndex + 1];

                if (nextPoint)
                  return (
                    <line
                      x1={point.x * u + 0.5 * u}
                      y1={point.y * u + 0.5 * u}
                      x2={nextPoint.x * u + 0.5 * u}
                      y2={nextPoint.y * u + 0.5 * u}
                      stroke="blue"
                      strokeWidth="1"
                    ></line>
                  );
              })}
            </g>
          );
        })}

      {drawMatrix &&
        colsArray.map((cols, colIndexX) => {
          return (
            <g id={`cols-${colIndexX}`} key={colIndexX} className="col">
              <title>{`col ${colIndexX}`}</title>

              {cols.map((point: { x: string | number | undefined; y: string | number | undefined }, yIndex: number) => {
                if (colIndexX === cols.length - 1) return null; // Skip last point for line
                const nextColPoint = cols[yIndex + 1];

                if (nextColPoint)
                  return (
                    <line
                      id={`line-${colIndexX}-${yIndex}`}
                      x1={point.x * u + 0.5 * u}
                      y1={point.y * u + 0.5 * u}
                      x2={nextColPoint.x * u + 0.5 * u}
                      y2={nextColPoint.y * u + 0.5 * u}
                      stroke="red"
                      strokeWidth="1"
                    ></line>
                  );
              })}
            </g>
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
    // Initialize with 0 or appropriate minimum values
    { svgWidth: 0, svgHeight: 0 }
  );
  return {
    svgWidth: uSize.svgWidth * u,
    svgHeight: uSize.svgHeight * u,
  };
}

export default KeyboardRenderer;
