type Props = {
  width?: string;
  height?: string;
  angle?: number;
  barWidth?: number;
};

export default function CautionRule({
  width = "100%",
  height = "8px",
  angle = 45,
  barWidth = 23,
}: Props) {
  const style: React.CSSProperties = {
    height,
    width,
    background: `repeating-linear-gradient(
      ${angle}deg,
      #ffff00,
      #ffff00 ${barWidth}px,
      #000000 ${barWidth}px,
      #000000 ${2 * barWidth}px
    )`,
  };

  return <div className="caution-rule" style={style}>&nbsp;</div>;
}
