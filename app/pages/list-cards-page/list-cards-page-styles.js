import { css} from 'lit-element';
import { bbvaDecisionToken } from '@bbva-web-components/bbva-foundations-design-tokens-utils';
import decisions from '@bbva-experience/tokens';

export default css`
.main-content {
  height: 100%;
  background: var(--_bg-color);
}

cards-list-cards {
  width: 75%;
  margin: 1rem auto;
  background: var(--cards-list-cards-dark-mode-bg-color);
}

:host([ambient~=dark]),
[ambient~=dark],
[data-ambient~=dark] {
  --_bg-color: ${bbvaDecisionToken('colorSecondaryAltNotificationInfoBackground', decisions)};
  --cards-list-cards-dark-mode-bg-color: ${bbvaDecisionToken('colorSecondaryNotificationInfoBackground', decisions)};
}

:host([ambient~=ligth]),
[ambient~=ligth],
[data-ambient~=ligth] {
  --_bg-color: ${bbvaDecisionToken('colorPrimaryAltNotificationInfoBackground', decisions)};
  --cards-list-cards-dark-mode-bg-color: ${bbvaDecisionToken('colorPrimaryNotificationInfoBackground', decisions)};
}
`;
