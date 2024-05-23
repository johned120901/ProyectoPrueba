import { CellsPage } from '@cells/cells-page';
import { html } from 'lit-element';
import { BbvaCoreIntlMixin as intl } from '@bbva-web-components/bbva-core-intl-mixin';
import { bbvaSun, bbvaMoon } from '@bbva-web-components/bbva-foundations-icons';
import '@bbva-experience-components/bbva-header-main/bbva-header-main.js';
import '@cells-demo/demo-app-template/demo-app-template.js';
import '@cells-formation-co/mendoza-john-cells-form-login-ui/mendoza-john-cells-form-login-ui.js';
import '@CellsFormationCo/mendoza-john-dm/mendoza-john-dm.js';
import { mendozaJohnCellsFormLoginUiAmbients } from '@cells-formation-co/mendoza-john-cells-form-login-ui';
import styles from './login-page-styles.js';

const DEFAULT_I18N_KEYS = {
  loginTitle: 'login.title',
};

const mendozaJohnCellsFormLoginUiAmbientsList = Object.values(mendozaJohnCellsFormLoginUiAmbients);

class LoginMobilePage extends intl(CellsPage) {
  static get is() {
    return 'login-page';
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
       * Propiedad que almacena el valor de host
       * @type {String}
       * @default ''
       */
      host: {
        type: String
      },
      /**
       * Propiedad que almacena el valor de customerId
       * @type {String}
       * @default ''
       */
      customerId: {
        type: String
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
      mendozaJohnCellsFormLoginUiAmbientsList
    ];
  }

  constructor() {
    super();
    this.i18nKeys = DEFAULT_I18N_KEYS;
    this.ambientMode = false;
    this.host = '';
    this.consumerId = '';
    this.navigationPage = {};
    this.channelsObject = {};
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
    this._mendozaJohnDm = queryScope.getElementById('mendozaJohnDm');
    this._loginMendozaJohnCellsFormLogin = queryScope.getElementById('loginMendozaJohnCellsFormLogin');
    this._progressContent = document.getElementById('progressContent');
  }

  onPageEnter() {
    this.appConfig();
  }

  appConfig() {
    const { armadilloLogin, navigationPages, channels } = window.AppConfig;
    this.host = armadilloLogin.host;
    this.customerId = armadilloLogin.customerId;
    this.navigationPage = navigationPages;
    this.channelsObject = channels;
  }

  getChannels() {
    this.subscribe(this.channelsObject.ambient, (data) => {
      this.ambientMode = data;
    });
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
    return this.ambientMode ? 'secondary' : 'primary';
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

  get _mainContentTpl() {
    return html`
      <div class="main-content" slot="app-main-content"  data-grid="full-width">
        <mendoza-john-cells-form-login-ui 
        id="loginMendozaJohnCellsFormLogin"
        ambient="${this._ambient}" 
        @action-button="${(e) => {
    this.actionButton(e);
  }}"></mendoza-john-cells-form-login-ui>
      </div>
    `;
  }


  render() {
    return html` <demo-app-template page-title="${this.t(this._i18nKeys.loginTitle)}" ambient="${this._ambient}">
      ${this._headerTpl} ${this._mainContentTpl}
        <mendoza-john-dm id="mendozaJohnDm" 
        @armadillo-login-success="${() => {
    this.login();
  }}"
        @armadillo-login-error="${() => {
    this.errorUserAndPasswordLogin();
  }}"></mendoza-john-dm>
    </demo-app-template>`;
  }

  actionButton({ detail }) {
    const { username, password } = detail;
    this._mendozaJohnDm.host = this.host;
    this._mendozaJohnDm.customerId = this.customerId;
    this._mendozaJohnDm.userId = username;
    this._mendozaJohnDm.password = password;
    this._mendozaJohnDm.armadilloLogin();
    this._progressContent.show();
  }

  errorUserAndPasswordLogin() {
    this._loginMendozaJohnCellsFormLogin.usernameAndPasswordInvalidValue();
    this._progressContent.hide();
  }

  login() {
    this.navigate(this.navigationPage.listCards);
  }
}
window.customElements.define(LoginMobilePage.is, LoginMobilePage);
