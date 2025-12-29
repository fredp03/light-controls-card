// Get Lit from Home Assistant's existing components
const LitElement = Object.getPrototypeOf(
  customElements.get("ha-panel-lovelace")
);
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

console.info(
  `%c LIGHT-CONTROLS-CARD %c v1.0.0 `,
  "color: white; background: #555; font-weight: bold;",
  "color: white; background: #e67e22; font-weight: bold;"
);

// Default SVG icons
const DEFAULT_SVGS = {
  leftLamp: `<svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.5301 65.9756L10.5299 32.557C10.5298 20.1828 20.5611 10.1515 32.9353 10.1515H35.6537M10.5301 65.9756H29.5893M10.5301 65.9756H1M35.6537 10.1515V7.72162C35.6537 4.00937 38.663 1 42.3753 1H48.8579C52.5701 1 55.5795 4.00937 55.5795 7.72162V12.9723C55.5795 13.4889 55.8653 13.963 56.3221 14.2043C62.2601 17.3406 65.9756 23.5048 65.9756 30.2203V31.697C65.9756 33.4442 64.5593 34.8605 62.8121 34.8605H29.4701C27.6221 34.8605 26.1239 33.3624 26.1239 31.5143V29.6679C26.1239 23.2305 29.477 17.258 34.973 13.9061C35.3957 13.6483 35.6537 13.1889 35.6537 12.6937V10.1515Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,
  ceiling: `<svg width="67" height="65" viewBox="0 0 67 65" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M47.2501 20.3036V19.5C47.2501 18.2734 46.7628 17.097 45.8954 16.2296C45.0281 15.3623 43.8517 14.875 42.6251 14.875H35.6876V3.3125C35.6876 2.69919 35.4439 2.11099 35.0102 1.67732C34.5766 1.24364 33.9884 1 33.3751 1C32.7617 1 32.1735 1.24364 31.7399 1.67732C31.3062 2.11099 31.0626 2.69919 31.0626 3.3125V14.875H24.1251C22.8984 14.875 21.722 15.3623 20.8547 16.2296C19.9873 17.097 19.5001 18.2734 19.5001 19.5V20.3036C13.9576 22.9222 9.27489 27.064 5.99896 32.2451C2.72302 37.4262 0.989191 43.4326 1.00005 49.5625C1.00005 50.1758 1.24369 50.764 1.67737 51.1977C2.11104 51.6314 2.69924 51.875 3.31255 51.875H21.8126C21.8126 54.9416 23.0307 57.8825 25.1991 60.0509C27.3675 62.2193 30.3085 63.4375 33.3751 63.4375C36.4416 63.4375 39.3826 62.2193 41.551 60.0509C43.7194 57.8825 44.9376 54.9416 44.9376 51.875H63.4376C64.0509 51.875 64.6391 51.6314 65.0727 51.1977C65.5064 50.764 65.7501 50.1758 65.7501 49.5625C65.7609 43.4326 64.0271 37.4262 60.7512 32.2451C57.4752 27.064 52.7925 22.9222 47.2501 20.3036ZM33.3751 58.8125C31.5351 58.8125 29.7705 58.0816 28.4695 56.7806C27.1685 55.4795 26.4376 53.7149 26.4376 51.875H40.3126C40.3126 53.7149 39.5816 55.4795 38.2806 56.7806C36.9796 58.0816 35.215 58.8125 33.3751 58.8125Z" stroke="currentColor" stroke-width="2"/>
  </svg>`,
  rightLamp: `<svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M56.4455 65.9756L56.4458 20.1516C56.4458 14.6287 51.9687 10.1515 46.4458 10.1515H31.3219M56.4455 65.9756H37.3863M56.4455 65.9756H65.9756M31.3219 10.1515V4C31.3219 2.34315 29.9788 1 28.3219 1H14.3961C12.7392 1 11.3961 2.34315 11.3961 4V10.1515V13.2093C11.3961 13.5801 11.191 13.9204 10.8631 14.0936L7.92862 15.6435C3.66669 17.8945 0.999996 22.3188 0.999996 27.1387V32.8605C0.999996 33.9651 1.89543 34.8605 3 34.8605H38.8517C39.9563 34.8605 40.8517 33.9651 40.8517 32.8605V26.6015C40.8517 22.0686 38.4906 17.863 34.6206 15.5028L31.8013 13.7833C31.5036 13.6018 31.3219 13.2783 31.3219 12.9296V10.1515Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`
};

class LightControlsCard extends LitElement {
  static properties = {
    hass: {},
    config: {},
  };

  static styles = css`
    :host {
      --title-color: #998888;
      --divider-color: #9F9F9F;
      --icon-color: #D5D5D5;
      --label-color: #887B6F;
    }

    .presets-wrapper {
      display: inline-flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background: var(--card-background-color);
      border-radius: var(--ha-card-border-radius, 12px);
      box-sizing: border-box;
    }

    .title-section {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: 28px;
    }

    .title {
      font-size: 32px;
      font-family: 'IBM Plex Mono', monospace;
      font-weight: 600;
      line-height: 48.64px;
      word-wrap: break-word;
    }

    .divider {
      align-self: stretch;
      height: 2px;
    }

    .available-lights {
      align-self: stretch;
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
    }

    .card-item {
      align-self: stretch;
      padding: 12px 29px;
      overflow: hidden;
      border-radius: 19px;
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 20px;
      cursor: pointer;
      transition: background-color 0.2s ease, transform 0.1s ease;
    }

    .card-item:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    .card-item:active {
      transform: scale(0.95);
    }

    .card-item.active {
      background: rgba(255, 255, 255, 0.1);
    }

    .icon-wrapper {
      border-radius: 7px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }

    .icon-wrapper svg {
      width: 100%;
      height: 100%;
    }

    .name-label {
      text-align: center;
      font-size: 24px;
      font-family: 'Anonymous Pro', monospace;
      font-weight: 400;
      line-height: 36.48px;
      word-wrap: break-word;
    }

    .spacer {
      flex: 1 1 0;
      align-self: stretch;
    }
  `;

  setConfig(config) {
    if (!config.lights || !Array.isArray(config.lights) || config.lights.length === 0) {
      throw new Error("You need to define at least one light in the 'lights' array");
    }
    this.config = {
      title: config.title || "Light Controls",
      title_color: config.title_color || "#998888",
      divider_color: config.divider_color || "#9F9F9F",
      scale: config.scale || 1,
      lights: config.lights,
      ...config
    };
  }

  render() {
    if (!this.hass || !this.config) {
      return html`<div>Loading...</div>`;
    }

    const scale = this.config.scale || 1;
    const baseWidth = 716;
    const baseHeight = 295;
    const iconSize = 74 * scale;

    return html`
      <div class="presets-wrapper" style="
        width: ${baseWidth * scale}px;
        min-height: ${baseHeight * scale}px;
        transform-origin: top left;
      ">
        <div class="title-section">
          <div class="title" style="
            color: ${this.config.title_color};
            font-size: ${32 * scale}px;
            line-height: ${48.64 * scale}px;
          ">${this.config.title}</div>
          <div class="divider" style="background: ${this.config.divider_color}"></div>
        </div>
        
        <div class="available-lights" style="min-height: ${154 * scale}px;">
          ${this.config.lights.map((light, index) => this._renderLightCard(light, index, iconSize, scale))}
        </div>
      </div>
    `;
  }

  _renderLightCard(light, index, iconSize, scale) {
    const entity = light.entity ? this.hass.states[light.entity] : null;
    const isOn = entity && entity.state === "on";
    const iconColor = light.icon_color || "#D5D5D5";
    const activeColor = light.active_color || "#FFD700";
    const labelColor = light.label_color || "#887B6F";
    
    // Get the SVG - use custom or default
    let svgContent = light.svg || this._getDefaultSvg(index);
    
    // Replace stroke color in SVG
    const currentColor = isOn ? activeColor : iconColor;
    svgContent = svgContent.replace(/stroke="[^"]*"/g, `stroke="${currentColor}"`);
    svgContent = svgContent.replace(/currentColor/g, currentColor);

    const items = [];
    
    // Add spacer before (except first item)
    if (index > 0) {
      items.push(html`<div class="spacer"></div>`);
    }

    items.push(html`
      <div 
        class="card-item ${isOn ? 'active' : ''}" 
        @click="${() => this._handleClick(light)}"
      >
        <div class="icon-wrapper" style="
          width: ${iconSize}px;
          height: ${iconSize}px;
          color: ${currentColor};
        ">
          <div .innerHTML="${svgContent}"></div>
        </div>
        <div class="name-label" style="
          color: ${labelColor};
          font-size: ${24 * scale}px;
          line-height: ${36.48 * scale}px;
        ">${light.name || "Light"}</div>
      </div>
    `);

    return items;
  }

  _getDefaultSvg(index) {
    const svgKeys = Object.keys(DEFAULT_SVGS);
    const key = svgKeys[index % svgKeys.length];
    return DEFAULT_SVGS[key];
  }

  _handleClick(light) {
    if (!light.entity) return;
    
    const entity = this.hass.states[light.entity];
    if (!entity) return;

    // Toggle the light
    this.hass.callService("light", "toggle", {
      entity_id: light.entity,
    });
  }

  getCardSize() {
    return 4;
  }

  static getConfigElement() {
    return document.createElement("light-controls-card-editor");
  }

  static getStubConfig() {
    return {
      title: "Light Controls",
      title_color: "#998888",
      divider_color: "#9F9F9F",
      scale: 1,
      lights: [
        {
          entity: "light.left_lamp",
          name: "Left Lamp",
          icon_color: "#D5D5D5",
          active_color: "#FFD700",
          label_color: "#887B6F"
        },
        {
          entity: "light.ceiling",
          name: "Ceiling",
          icon_color: "#D5D5D5",
          active_color: "#FFD700",
          label_color: "#887B6F"
        },
        {
          entity: "light.right_lamp",
          name: "Right Lamp",
          icon_color: "#D5D5D5",
          active_color: "#FFD700",
          label_color: "#887B6F"
        }
      ]
    };
  }
}

// Simple config editor
class LightControlsCardEditor extends LitElement {
  static properties = {
    hass: {},
    config: {},
  };

  static styles = css`
    .editor {
      padding: 16px;
    }
    .row {
      margin-bottom: 12px;
    }
    label {
      display: block;
      margin-bottom: 4px;
      font-weight: 500;
    }
    input, textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      box-sizing: border-box;
    }
    textarea {
      min-height: 100px;
      font-family: monospace;
    }
    .hint {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-top: 4px;
    }
  `;

  setConfig(config) {
    this.config = config;
  }

  render() {
    if (!this.config) {
      return html``;
    }

    return html`
      <div class="editor">
        <div class="row">
          <label>Title</label>
          <input
            type="text"
            .value="${this.config.title || ''}"
            @input="${(e) => this._updateConfig('title', e.target.value)}"
          />
        </div>
        <div class="row">
          <label>Title Color</label>
          <input
            type="color"
            .value="${this.config.title_color || '#998888'}"
            @input="${(e) => this._updateConfig('title_color', e.target.value)}"
          />
        </div>
        <div class="row">
          <label>Divider Color</label>
          <input
            type="color"
            .value="${this.config.divider_color || '#9F9F9F'}"
            @input="${(e) => this._updateConfig('divider_color', e.target.value)}"
          />
        </div>
        <div class="row">
          <label>Scale (0.5 - 2)</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            .value="${this.config.scale || 1}"
            @input="${(e) => this._updateConfig('scale', parseFloat(e.target.value))}"
          />
          <div class="hint">Current: ${this.config.scale || 1}</div>
        </div>
        <div class="row">
          <label>Lights Configuration (YAML)</label>
          <textarea
            .value="${this._lightsToYaml()}"
            @input="${(e) => this._updateLights(e.target.value)}"
          ></textarea>
          <div class="hint">
            Each light needs: entity, name. Optional: svg, icon_color, active_color, label_color
          </div>
        </div>
      </div>
    `;
  }

  _lightsToYaml() {
    if (!this.config.lights) return '';
    return JSON.stringify(this.config.lights, null, 2);
  }

  _updateConfig(key, value) {
    const newConfig = { ...this.config, [key]: value };
    this.config = newConfig;
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: newConfig },
    }));
  }

  _updateLights(value) {
    try {
      const lights = JSON.parse(value);
      this._updateConfig('lights', lights);
    } catch (e) {
      // Invalid JSON, ignore
    }
  }
}

// Register custom elements
if (!customElements.get("light-controls-card")) {
  customElements.define("light-controls-card", LightControlsCard);
}

if (!customElements.get("light-controls-card-editor")) {
  customElements.define("light-controls-card-editor", LightControlsCardEditor);
}

// Register with Home Assistant's custom cards registry
window.customCards = window.customCards || [];
window.customCards.push({
  type: "light-controls-card",
  name: "Light Controls Card",
  description: "A customizable light controls card with SVG icons and scale support",
  preview: true,
  documentationURL: "https://github.com/fredparsons/light-controls-card",
});
