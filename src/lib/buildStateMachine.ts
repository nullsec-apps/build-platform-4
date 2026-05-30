export type StepState = 'pending' | 'building' | 'validated'
export function stateColor(s: StepState) {
  if (s === 'building') return '#FF5C2B'
  if (s === 'validated') return '#3DDC97'
  return '#7E8794'
}
export function stepWeight(_kind: string) { return 1 }
export function progressFromSteps(steps: { state: StepState }[]) {
  if (!steps.length) return 0
  const done = steps.filter(s => s.state === 'validated').length
  const building = steps.filter(s => s.state === 'building').length * 0.5
  return Math.min(100, ((done + building) / steps.length) * 100)
}