export function snapToGrid(x: number, y: number, size = 32) { return { x: Math.round(x/size)*size, y: Math.round(y/size)*size } }
export function defaultPositions(count: number) {
  const cols = 2; const tileW = 280; const tileH = 180; const gapX = 48; const gapY = 48; const startX = 64; const startY = 48
  return Array.from({ length: count }, (_, i) => {
    const col = i % cols; const row = Math.floor(i / cols)
    return { x: startX + col * (tileW + gapX), y: startY + row * (tileH + gapY) }
  })
}