import { CellsPage } from '@cells/cells-page';
import { html } from 'lit-element';
import { BbvaCoreIntlMixin as intl } from '@bbva-web-components/bbva-core-intl-mixin';
import { bbvaSun, bbvaMoon } from '@bbva-web-components/bbva-foundations-icons';
import '@bbva-experience-components/bbva-header-main/bbva-header-main.js';
import '@bbva-web-components/bbva-web-button-multistep-back/bbva-web-button-multistep-back.js';
import '@bbva-web-components/bbva-web-navigation-breadcrumbs/bbva-web-navigation-breadcrumbs.js';
import '@bbva-experience-components/bbva-clip-card-data/bbva-clip-card-data.js';
import '@bbva-experience-components/bbva-table-row-group/bbva-table-row-group.js';
import '@bbva-experience-components/bbva-type-text/bbva-type-text.js';
import { bbvaTypeTextAmbients } from '@bbva-experience-components/bbva-type-text';
import { bbvaWebNavigationBreadcrumbsAmbient } from '@bbva-web-components/bbva-web-navigation-breadcrumbs';
import styles from './card-detail-page-styles.js';

const DEFAULT_I18N_KEYS = {
  listCardsTitle: 'list-card.title',
  cardDetailTitle: 'card-detail.title',
  cardDetailBackButton: 'card-detail.backButton',
  cardDetailKindPayment: 'card-detail.kind-payment',
  cardDetailPreviewsAvailableText: 'card-detail.previews-available-text',
  cardDetailAvailableBalanceText: 'card-detail.available-balance-text',
  cardDetailCurrentBalances: 'card-detail.current-balances',
  cardDetailPendingBalances: 'card-detail.pending-balances',
  cardDetailPostedBalances: 'card-detail.posted-balances'
};

const formatExpeditionDate = (date) => {
  if (date) {
    const format = date.split('-');
    const year = format[0].substring(2, 4);
    const month = format[1];
    return `${year}/${month}`;
  }
  return '';
};

const balanceTypes = [
  { key: 'currentBalances', i18nKey: 'card-detail.current-balances' },
  { key: 'pendingBalances', i18nKey: 'card-detail.pending-balances' },
  { key: 'postedBalances', i18nKey: 'card-detail.posted-balances' }
];

const formatTable = (creditDataObject) => {
  if (creditDataObject) {
    const table = balanceTypes.map(({ key, i18nKey }) => {
      const { amount, currency } = creditDataObject[key][0];
      return {
        amount,
        currency,
        description: [ i18nKey ]
      };
    });
    return table;
  }
  return [];
};

const typeTextAmbient = Object.values(bbvaTypeTextAmbients);
const navigationBreadcrumbsAmbient = Object.values(bbvaWebNavigationBreadcrumbsAmbient);
class CardDetailPage extends intl(CellsPage) {
  static get is() {
    return 'card-detail-page';
  }

  static get properties() {
    return {
      i18nKeys: {
        type: Object,
        attribute: false,
      },
      /**
       * @description Indicador del tiepo de ambiente
       * @default false
       */
      ambientMode: {
        type: Boolean
      },
      /**
       * Propiedad que almacena el nombre de las paginas
       * @type {Object}
       */
      navigationPage: {
        type: Object
      },
      /**
       * Propiedad que almacena el nombre de los canales
       * @type {Object}
       */
      channelsObject: {
        type: Object
      },
      /**
       * Propiedad que almacena los datos de la tarjeta
       * @type {Object}
       */
      cardDetail: {
        type: Object
      }
    };
  }

  static get styles() {
    return [
      styles,
      typeTextAmbient,
      navigationBreadcrumbsAmbient
    ];
  }

  constructor() {
    super();
    this.i18nKeys = DEFAULT_I18N_KEYS;
    this.ambientMode = false;
    this.navigationPage = {};
    this.channelsObject = {};
    this.cardDetail = {};
  }

  update(props) {
    if (props.has('i18nKeys')) {
      this._i18nKeys = { ...DEFAULT_I18N_KEYS, ...this.i18nKeys };
    }

    return super.update && super.update(props);
  }

  firstUpdated(props) {
    // eslint-disable-next-line no-unused-expressions
    super.firstUpdated && super.firstUpdated(props);
    const queryScope = this.shadowRoot ? this.shadowRoot : this;
    this._progressContent = document.getElementById('progressContent');
    this._breadcrumbs = queryScope.getElementById('breadcrumbs');
  }

  onPageEnter() {
    this.appConfig();
    this.setPagesBeadCrumbs();
    this.getChannels();
    this.showOrHideProgressContent(false);
  }

  appConfig() {
    const { armadilloLogin, navigationPages, channels } = window.AppConfig;
    this.host = armadilloLogin.host;
    this.navigationPage = navigationPages;
    this.channelsObject = channels;
  }

  setPagesBeadCrumbs() {
    this._breadcrumbs.data = [
      {
        name: this.t(this._i18nKeys.listCardsTitle),
        event: this.navigationPage.listCard,
        href: '/dist/#!/list-cards'
      },
      {
        name: this.t(this._i18nKeys.cardDetailTitle)
      }
    ];
  }

  getChannels() {
    this.subscribe(this.channelsObject.cardDetail, (data) => {
      this.cardDetail = data;
    });
    this.subscribe(this.channelsObject.ambient, (data) => {
      this.ambientMode = data;
    });
    this._validatePage();
  }

  _validatePage() {
    if (!this.cardDetail) {
      window.location = '/dist/#!/list-cards';
    }
  }

  /**
   * Muestra u oculta el componente progress content
   * @param {Boolean} showHide
   */
  showOrHideProgressContent(showHide) {
    if (showHide) {
      this._progressContent.show();
    } else {
      this._progressContent.hide();
    }
  }

  /**
   * Retornar el icono para el header
   * @return {Array} Icono de tipo del ambiente
   */
  get _iconHeader() {
    const lightMode = [ {
      id: 'btn-info',
      name: 'lightMode',
      icon: bbvaSun(),
      accessibilityText: 'lightMode',
    } ];
    const darkMode = [ {
      id: 'btn-info',
      name: 'darkMode',
      icon: bbvaMoon(),
      accessibilityText: 'darkMode',
    } ];
    return this.ambientMode ? darkMode : lightMode;
  }

  get _ambient() {
    return this.ambientMode ? 'secondary' : 'primary';
  }

  get _ambientWebComponent() {
    return this.ambientMode ? 'dark' : 'light';
  }


  get _headerTpl() {
    return html`
      <div slot="app-header" data-grid="full-width">
        <div>
          <bbva-header-main
            
            variant="login"
            @header-main-icon-click="${() => {
    this._changeAmbient();
  }}"
            .buttons="${this._iconHeader}">
          </bbva-header-main>
        </div>
        <div class="navigation">
          <div class="navigation-destock">
            <bbva-web-navigation-breadcrumbs id="breadcrumbs" label="Breadcrumb" @list-cards="${() => {
    this.navigationBack();
  }}" ambient=${this._ambientWebComponent}></bbva-web-navigation-breadcrumbs>
          </div>
          <div class="navigation-mobile">
            <bbva-web-button-multistep-back text="${this.t(this._i18nKeys.cardDetailBackButton)}" @click=${() => {
  this.navigationBack();
}}></bbva-web-button-multistep-back>
          </div>
        </div>
      </div>
      
    `;
  }

  _changeAmbient() {
    this.ambientMode = !this.ambientMode;
    this.publish(this.channelsObject.ambient, this.ambientMode);
  }

  get _dataClipCard() {
    return {
      cardNumber: this.cardDetail.number,
      expirationDate: formatExpeditionDate(this.cardDetail.expirationDate),
      holderName: this.cardDetail.holderName
    };
  }

  get _tableTpl() {
    const { availableBalance, disposedBalance } = this.cardDetail;


    const availableBalanceTable = formatTable(availableBalance);
    const disposedBalanceTable = formatTable(disposedBalance);

    return html`
    <div class="available-balance">
      <div class="text">
        <bbva-type-text 
          size="L" 
          font-weight="500" 
          text="${this.t(this._i18nKeys.cardDetailAvailableBalanceText)}">
        </bbva-type-text>
      </div>
      <div class="table">
        <table>
          <tbody>
            ${availableBalanceTable.map(({ description, amount, currency }) => {
    return html`
              ${this._rowTpl([ description ], [ amount ], [ currency ])}
              `;
  })}
          </tbody>
        </table>
      </div>
    </div>
    <div class="previews-available">
      <div class="text">
      <bbva-type-text 
        size="L" 
        font-weight="500"
        text="${this.t(this._i18nKeys.cardDetailPreviewsAvailableText)}">
      </bbva-type-text>
      </div>
      <div class="table">
        <table>
          <tbody>
          ${disposedBalanceTable.map(({ description, amount, currency }) => {
    return html`
        ${this._rowTpl([ description ], [ amount ], [ currency ])}
                    `;
  })}
          </tbody>
        </table>
      </div>
    </div>
    
    `;
  }

  _rowTpl(description, amount, currency) {
    return html`
    <tr>
      <td>
        <bbva-table-row-group
          left-size-cell="2XS"
          right-size-cell="XS"
          description="${this.t(description)}"
          amount="${amount}"
          language="es"
          currency-code="${currency}"
          local-currency="${currency}"
          ambient="${this._ambient}"
        ></bbva-table-row-group>
      </td>
    </tr>
    `;
  }

  get _mainContainTpl() {
    return html`
      <div class="main-content" slot="app-main-content"  data-grid="full-width">
        <div class="clip-card">
          <bbva-clip-card-data
            variant="debit"
            kind-payment="${this.t(this._i18nKeys.cardDetailKindPayment)}"
            card-number="${this._dataClipCard.cardNumber}"
            expiration-date="${this._dataClipCard.expirationDate}"
            holder-name="${this._dataClipCard.holderName}"
            size="XXL"
            shadow="">
          </bbva-clip-card-data>
        </div>
        <div class="table-card">
          ${this._tableTpl}
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <demo-app-template page-title="${this.t(this._i18nKeys.cardDetailTitle)}" ambient="${this._ambient}">
        ${this._headerTpl} ${this._mainContainTpl}
      </demo-app-template>`;
  }

  navigationBack() {
    this.navigation(this.navigationPage.listCard);
  }

}

window.customElements.define(CardDetailPage.is, CardDetailPage);