import { useBuildSteps } from './useBuildSteps'
import { progressFromSteps } from '../lib/buildStateMachine'

export function useBuildProgress(ref?: string) {
  const { steps, loading } = useBuildSteps(ref)
  const progress = progressFromSteps(steps as any)
  const generating = steps.some(s => s.state === 'building')
  return { progress, generating, sections: steps, loading }
}