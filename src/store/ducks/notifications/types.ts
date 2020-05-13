const TOKEN_SET = 'TOKEN_SET';
const HAS_PERMISSION_SET = 'HAS_PERMISSION_SET';
const ENABLED_SET = 'ENABLED_SET';
const AUTO_PROMPT_DISABLE = 'AUTO_PROMPT_DISABLE';

export default {
  TOKEN_SET,
  HAS_PERMISSION_SET,
  ENABLED_SET,
  AUTO_PROMPT_DISABLE
};

export interface State {
  token: string,
  hasPermission: boolean | null,
  enabled: boolean,
  autoPrompt: boolean
}