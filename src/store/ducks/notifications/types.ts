export const types = {
  TOKEN_SET: 'TOKEN_SET',
  HAS_PERMISSION_SET: 'HAS_PERMISSION_SET',
  ENABLED_SET: 'ENABLED_SET',
  AUTO_PROMPT_DISABLE: 'AUTO_PROMPT_DISABLE'
};

export interface State {
  token: string,
  hasPermission: boolean | null,
  enabled: boolean,
  autoPrompt: boolean
}