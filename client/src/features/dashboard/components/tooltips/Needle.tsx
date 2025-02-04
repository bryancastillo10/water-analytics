interface NeedleProps<T> {
  value: T;
  data: { name: string; value: T; color?: string }[];
  radian: T;
  cx: T;
  cy: T;
  innerRad: T;
  outerRad: T;
  color?: string;
}

const Needle= ({ value, data, radian, cx, cy, innerRad, outerRad, color = "#C2C2C2" }: NeedleProps<number>) => {
  let total = data.reduce((sum, v) => sum + v.value, 0); 
  const ang = 180 * (1 - value / total);
  const length = (innerRad + 2 * outerRad) / 3;
  const sin = Math.sin(-radian * ang);
  const cos = Math.cos(-radian * ang);
  const r = 5;

  const x0 = cx;
  const y0 = cy;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return (
    <g style={{ zIndex: 10 }}> 
      <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />
      <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} fill={color} stroke="none" />
    </g>
  );
};

export default Needle;

