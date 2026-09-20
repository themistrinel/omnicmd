import { Profile } from '@/types';
import { AGENTS, getAgent as getAgentByIdOrHandle, DEFAULT_AGENT } from '@/lib/agents';

export const PROFILES: Profile[] = AGENTS;

export function getProfile(id: string): Profile {
  return getAgentByIdOrHandle(id) || DEFAULT_AGENT;
}

export { AGENTS, DEFAULT_AGENT };
