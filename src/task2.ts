export type RGBColor = [number, number, number];

export enum ColorName {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
}

const COLOR_MAP: Record<ColorName, RGBColor> = {
  [ColorName.Red]: [255, 0, 0],
  [ColorName.Green]: [0, 128, 0],
  [ColorName.Blue]: [0, 0, 255],
};

function assertChannel(n: number): void {
  if (!Number.isInteger(n) || n < 0 || n > 255) {
    throw new RangeError(`Некорректный канал RGB: ${n}`);
  }
}

export function rgbToHex(color: RGBColor): string {
  color.forEach(assertChannel);
  const [r, g, b] = color;
  const hex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${hex(r)}${hex(g)}${hex(b)}`;
}

export function colorToObject(name: ColorName): { rgb: RGBColor; hex: string } {
  const rgb = COLOR_MAP[name];
  return { rgb, hex: rgbToHex(rgb) };
}

console.log('task2:');
for (const name of Object.values(ColorName)) {
  console.log(name, colorToObject(name));
}
try {
  rgbToHex([300, 0, 0]);
} catch (e) {
  console.log('Ожидаемая ошибка:', (e as Error).message);
}