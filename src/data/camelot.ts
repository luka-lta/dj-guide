export const WHEEL_SIZE = 300;

const CX = WHEEL_SIZE / 2.0;
const CY = WHEEL_SIZE / 2.0;
const R_OUTER = 122;
const R_INNER = 80;

export const CHIP_RADIUS = 20;
export const RING_RADIUS = R_OUTER + CHIP_RADIUS;

export interface WheelChip {
  position: number;
  x: number;
  y: number;
  label: string;
  isMajor: boolean;
}

export const WHEEL_CHIPS: WheelChip[] = Array.from({ length: 12 }, (_, idx) => {
  const i = idx + 1;
  const angle = idx * 30 * (Math.PI / 180.0);
  const sinA = Math.sin(angle);
  const cosA = Math.cos(angle);
  return [
    { position: i, x: CX + R_OUTER * sinA, y: CY - R_OUTER * cosA, label: `${i}B`, isMajor: true },
    { position: i, x: CX + R_INNER * sinA, y: CY - R_INNER * cosA, label: `${i}A`, isMajor: false },
  ];
}).flat();
