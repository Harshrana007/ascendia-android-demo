import Svg, { Circle, Path, Rect } from "react-native-svg";
export type AscendiaIconName = "book" | "run" | "water" | "meditation" | "habit" | "strength" | "endurance" | "intelligence" | "discipline" | "vitality" | "wisdom" | "streak" | "achievement" | "sparkles" | "settings" | "chevron";
type Props = { name: AscendiaIconName; color: string; size?: number; strokeWidth?: number };
export function AscendiaIcon({ name, color, size = 22, strokeWidth = 1.8 }: Props) {
  const common = { fill: "none" as const, stroke: color, strokeWidth, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityLabel={name}>
    {name === "book" && <><Path {...common} d="M3.5 5.5c3.2-1.5 5.8-.8 8.5 1.1v12c-2.7-1.9-5.3-2.6-8.5-1.1z" /><Path {...common} d="M20.5 5.5c-3.2-1.5-5.8-.8-8.5 1.1v12c2.7-1.9 5.3-2.6 8.5-1.1z" /></>}
    {name === "run" && <><Circle cx="15.7" cy="4.7" r="2" fill={color} /><Path {...common} d="m12.6 8.1-3.1 3.2 3.2 2.1-2 5.8M12.7 8.2l3.1 2.4 3.1.3M9.5 11.3 6 14.2M13.2 13.4l4.6 2.1 1.4 4M10.7 19.2l-2.1 2" /></>}
    {name === "water" && <Path {...common} d="M12 2.7S5.3 10.2 5.3 14.6a6.7 6.7 0 0 0 13.4 0C18.7 10.2 12 2.7 12 2.7Z" />}
    {name === "meditation" && <><Circle cx="12" cy="5.4" r="2.1" {...common} /><Path {...common} d="M12 8.2v4.6M7.1 12.2c1.4 1.3 2.9 1.9 4.9 1.9s3.5-.6 4.9-1.9M6 17.2c1.5 2.6 3.6 3.8 6 3.8s4.5-1.2 6-3.8M4 20.5h16" /></>}
    {name === "habit" && <><Circle cx="12" cy="12" r="8.7" {...common} /><Path {...common} d="m7.5 12.1 3 3 6-6.2" /></>}
    {name === "strength" && <Path {...common} d="M3 9v6M6 7v10M18 7v10M21 9v6M6 12h12" />}
    {name === "endurance" && <><Path {...common} d="M3 15.5h4.5l2.1-7 4.1 10 2.3-6h5" /><Path {...common} d="M3 5.5h18" opacity={0.45} /></>}
    {name === "intelligence" && <><Path {...common} d="M9 18.7h6M9.5 21h5M8.2 15.8a7 7 0 1 1 7.6 0c-1 .6-1.3 1.3-1.3 2H9.5c0-.7-.3-1.4-1.3-2Z" /></>}
    {name === "discipline" && <><Rect x="5" y="4" width="14" height="16" rx="2" {...common} /><Path {...common} d="m8 11 2.2 2.2L16 8M8.5 16h7" /></>}
    {name === "vitality" && <Path {...common} d="M12 20s-7.6-4.5-7.6-10.2A4.1 4.1 0 0 1 12 7.4a4.1 4.1 0 0 1 7.6 2.4C19.6 15.5 12 20 12 20Z" />}
    {name === "wisdom" && <><Path {...common} d="M12 3 14.8 9.2 21 12l-6.2 2.8L12 21l-2.8-6.2L3 12l6.2-2.8z" /><Circle cx="12" cy="12" r="2" {...common} /></>}
    {name === "streak" && <Path {...common} d="M13.7 2.8c.7 4-2.9 4.7-1.1 7.7 1.2-1.2 2-2.3 2.1-3.7 3.5 2.7 5.1 5.1 4.5 8.4a7.2 7.2 0 0 1-14.3-.3c0-3.2 1.8-5.5 4.1-8.3-.2 3.4 1.1 4.1 1.9 4.8C12.2 8.7 12.9 6 13.7 2.8Z" />}
    {name === "achievement" && <><Path {...common} d="M8 4h8v4.2a4 4 0 0 1-8 0zM8 6H4v2a4 4 0 0 0 4 4M16 6h4v2a4 4 0 0 1-4 4M12 12.2V17M8 21h8M9 17h6v4H9z" /></>}
    {name === "sparkles" && <><Path {...common} d="m12 2.5 1.8 6.1 6.2 1.8-6.2 1.8-1.8 6.2-1.8-6.2L4 10.4l6.2-1.8z" /><Path {...common} d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" /></>}
    {name === "settings" && <><Circle cx="12" cy="12" r="3" {...common} /><Path {...common} d="M19.2 13.8a7.5 7.5 0 0 0 0-3.6l2-1.5-2-3.4-2.4 1a8 8 0 0 0-3.1-1.8L13.3 2h-3l-.4 2.5a8 8 0 0 0-3.1 1.8l-2.4-1-2 3.4 2 1.5a7.5 7.5 0 0 0 0 3.6l-2 1.5 2 3.4 2.4-1a8 8 0 0 0 3.1 1.8l.4 2.5h3l.4-2.5a8 8 0 0 0 3.1-1.8l2.4 1 2-3.4z" /></>}
    {name === "chevron" && <Path {...common} d="m9 5 7 7-7 7" />}
  </Svg>;
}