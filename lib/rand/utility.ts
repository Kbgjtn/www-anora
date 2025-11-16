export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomInt(max: number): number {
  return Math.floor(Math.random() * max);
}
