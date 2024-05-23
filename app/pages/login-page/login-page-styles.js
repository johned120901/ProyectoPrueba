/* eslint-disable no-unused-vars */
import { css } from 'lit-element';
import { bbvaDecisionToken } from '@bbva-web-components/bbva-foundations-design-tokens-utils';
import decisions from '@bbva-experience/tokens';

export default css`
.main-content {
  position: fixed;
  height: 100%;
  background: var(--_bg-color);
}

:host([ambient~=secondary]),
[ambient~=secondary],
[data-ambient~=secondary] {
  --_bg-color: ${bbvaDecisionToken('colorSecondaryAltNotificationInfoBackground', decisions)};
}

:host([ambient~=primary]),
[ambient~=primary],
[data-ambient~=primary] {
  --_bg-color: ${bbvaDecisionToken('colorPrimaryAltNotificationInfoBackground', decisions)};
}
`;
