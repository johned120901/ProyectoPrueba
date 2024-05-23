import { CellsPage } from '@cells/cells-page';
import { html } from 'lit-element';
import { BbvaCoreIntlMixin as intl } from '@bbva-web-components/bbva-core-intl-mixin';
import { bbvaSun, bbvaMoon } from '@bbva-web-components/bbva-foundations-icons';
import '@bbva-experience-components/bbva-header-main/bbva-header-main.js';
import '@cells-demo/demo-app-template/demo-app-template.js';
import '@bbva-web-components-widgets/cards-list-cards/cards-list-cards.js';
import '@CellsFormationCo/mendoza-john-dm/mendoza-john-dm.js';
import styles from './list-cards-page-styles.js';

const DEFAULT_I18N_KEYS = {
  listCardsTitle: 'list-card.title',
  cardsListCardsEmptyStateHeading: 'cards-list-cards-empty-state-heading',
  cardsListCardsEmptyStateText: 'cards-list-cards-empty-state-text'
};
class ListCardsPage extends intl(CellsPage) {
  static get is() {
    return 'list-cards-page';
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
      }

    };
  }

  static get styles() {
    return [
      styles,
    ];
  }

  constructor() {
    super();
    this.i18nKeys = DEFAULT_I18N_KEYS;
    this.ambientMode = false;
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
    this._cardsListCards = queryScope.getElementById('cardsListCards');
    this._cardsListCards.emptyStateHeading = this._i18nKeys.cardsListCardsEmptyStateHeading;
    this._cardsListCards.emptyStateText = this._i18nKeys.cardsListCardsEmptyStateText;
    this._listCardsMendozaJohnDm = queryScope.getElementById('listCardsMendozaJohnDm');
  }

  onPageEnter() {
    this.appConfig();
    this.getChannels();
    this.showOrHideProgressContent(true);
    this.executeListCards();
  }

  appConfig() {
    const { armadilloLogin, navigationPages, channels } = window.AppConfig;
    this.host = armadilloLogin.host;
    this.navigationPage = navigationPages;
    this.channelsObject = channels;
  }

  getChannels() {
    this.subscribe(this.channelsObject.ambient, (data) => {
      this.ambientMode = data;
    });
  }

  executeListCards() {
    this._listCardsMendozaJohnDm.host = this.host;
    this._listCardsMendozaJohnDm.requiredToken = 'jwt';
    this._listCardsMendozaJohnDm.listCards();
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
   * @return {String} Icono de tipo del ambiente
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
    return this.ambientMode ? 'dark' : 'ligth';
  }


  get _headerTpl() {
    return html`
      <bbva-header-main
        slot="app-header"
        data-grid="full-width"
        variant="login"
        @header-main-icon-click="${() => {
    this._changeAmbient();
  }}"
        .buttons="${this._iconHeader}"
        
      ></bbva-header-main>
    `;
  }

  _changeAmbient() {
    this.ambientMode = !this.ambientMode;
    this.publish(this.channelsObject.ambient, this.ambientMode);
  }

  get _mainContainTpl() {
    return html`
      <div class="main-content" slot="app-main-content"  data-grid="full-width">
        <cards-list-cards id="cardsListCards" ambient="${this._ambient}" @cards-list-cards-card="${(e) => {
  this.selectCard(e);
}}"></cards-list-cards>
      </div>
    `;
  }

  render() {
    return html`
      <demo-app-template page-title="${this.t(this._i18nKeys.listCardsTitle)}" ambient="${this._ambient}">
        ${this._headerTpl} ${this._mainContainTpl}
        <mendoza-john-dm id="listCardsMendozaJohnDm" 
        @list-cards-success=${(e) => {
    this.setListCards(e);
  }}></mendoza-john-dm>
      </demo-app-template>`;
  }

  setListCards({ detail }) {
    const { data } = detail;
    this._cardsListCards.cards = data;
    this.showOrHideProgressContent(false);
  }

  selectCard({ detail }) {
    this.publish(this.channelsObject.cardDetail, detail);
    this.navigate(this.navigationPage.cardDetail);
    this.showOrHideProgressContent(true);
  }
}

window.customElements.define(ListCardsPage.is, ListCardsPage);