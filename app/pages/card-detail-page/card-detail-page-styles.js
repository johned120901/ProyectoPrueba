import { css } from 'lit-element';
import { bbvaDecisionToken } from '@bbva-web-components/bbva-foundations-design-tokens-utils';
import decisions from '@bbva-experience/tokens';

export default css`
:host {
  --_table-row-group-background-color: var(--_table-row-group-background-color) !important;
}

.main-content {
  height: 100%;
  background: var(--_bg-color);
}

.navigation {
  background: var(--_bg-color);
}

.navigation-destock {
  display: block;
  width: 1rem 0;
}

.navigation-mobile {
  display: none;
}

.clip-card {
  margin: 1rem auto;
  width: fit-content;
}

.table-card {
  width: 85%;
  margin: auto;
}

.table-card table {
  width: 100%;
}

@media screen and (max-width: 600px) {
  .navigation-mobile {
    display: block;
    text-align: center;
  }
  .navigation-destock {
    display: none;
  }
}
:host([ambient~=secondary]),
[ambient~=secondary],
[data-ambient~=secondary] {
  --_bg-color: ${bbvaDecisionToken('colorSecondaryAltNotificationInfoBackground', decisions)};
  --_table-row-group-background-color: ${bbvaDecisionToken('colorSecondaryNotificationInfoBackground', decisions)};
}

:host([ambient~=primary]),
[ambient~=primary],
[data-ambient~=primary] {
  --_bg-color: ${bbvaDecisionToken('colorPrimaryAltNotificationInfoBackground', decisions)};
  --_table-row-group-background-color: ${bbvaDecisionToken('colorPrimaryNotificationInfoBackground', decisions)};
}
`;
