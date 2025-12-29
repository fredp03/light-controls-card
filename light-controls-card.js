// Get Lit from Home Assistant's existing components
const LitElement = Object.getPrototypeOf(
  customElements.get("ha-panel-lovelace")
);
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

console.info(
  `%c LIGHT-CONTROLS-CARD %c v1.0.6 `,
  "color: white; background: #555; font-weight: bold;",
  "color: white; background: #e67e22; font-weight: bold;"
);

// Default SVG icons with on/off states
const DEFAULT_SVGS = {
  leftLamp: {
    off: `<svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.5301 65.9756L10.5299 32.557C10.5298 20.1828 20.5611 10.1515 32.9353 10.1515H35.6537M10.5301 65.9756H29.5893M10.5301 65.9756H1M35.6537 10.1515V7.72162C35.6537 4.00937 38.663 1 42.3753 1H48.8579C52.5701 1 55.5795 4.00937 55.5795 7.72162V12.9723C55.5795 13.4889 55.8653 13.963 56.3221 14.2043C62.2601 17.3406 65.9756 23.5048 65.9756 30.2203V31.697C65.9756 33.4442 64.5593 34.8605 62.8121 34.8605H29.4701C27.6221 34.8605 26.1239 33.3624 26.1239 31.5143V29.6679C26.1239 23.2305 29.477 17.258 34.973 13.9061C35.3957 13.6483 35.6537 13.1889 35.6537 12.6937V10.1515Z" stroke="#D5D5D5" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
    on: `<svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M34.2488 9.78049V7.44912C34.2488 3.88737 37.1361 1 40.6979 1H46.9177C50.4795 1 53.3668 3.88737 53.3668 7.44912V12.4869C53.3668 12.9826 53.641 13.4375 54.0793 13.669C59.7766 16.6781 63.3415 22.5925 63.3415 29.0357V30.4526C63.3415 32.1289 61.9825 33.4878 60.3062 33.4878H28.3159C26.5428 33.4878 25.1054 32.0504 25.1054 30.2772V28.5057C25.1054 22.3293 28.3226 16.5989 33.5957 13.3829C34.0013 13.1355 34.2488 12.6947 34.2488 12.2196V9.78049Z" fill="#E5CCA8"/>
      <path d="M10.1437 63.3415L10.1435 31.2777C10.1435 19.4051 19.7681 9.78049 31.6406 9.78049H34.2488M10.1437 63.3415H28.4302M10.1437 63.3415H1M34.2488 9.78049V7.44912C34.2488 3.88737 37.1361 1 40.6979 1H46.9177C50.4795 1 53.3668 3.88737 53.3668 7.44912V12.4869C53.3668 12.9826 53.641 13.4375 54.0793 13.669C59.7766 16.6781 63.3415 22.5925 63.3415 29.0357V30.4526C63.3415 32.1289 61.9825 33.4878 60.3062 33.4878H28.3159C26.5428 33.4878 25.1054 32.0504 25.1054 30.2772V28.5057C25.1054 22.3293 28.3226 16.5989 33.5957 13.3829C34.0013 13.1355 34.2488 12.6947 34.2488 12.2196V9.78049Z" stroke="#E5CCA8" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  ceiling: {
    off: `<svg width="67" height="65" viewBox="0 0 67 65" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M47.2501 20.3036V19.5C47.2501 18.2734 46.7628 17.097 45.8954 16.2296C45.0281 15.3623 43.8517 14.875 42.6251 14.875H35.6876V3.3125C35.6876 2.69919 35.4439 2.11099 35.0102 1.67732C34.5766 1.24364 33.9884 1 33.3751 1C32.7617 1 32.1735 1.24364 31.7399 1.67732C31.3062 2.11099 31.0626 2.69919 31.0626 3.3125V14.875H24.1251C22.8984 14.875 21.722 15.3623 20.8547 16.2296C19.9873 17.097 19.5001 18.2734 19.5001 19.5V20.3036C13.9576 22.9222 9.27489 27.064 5.99896 32.2451C2.72302 37.4262 0.989191 43.4326 1.00005 49.5625C1.00005 50.1758 1.24369 50.764 1.67737 51.1977C2.11104 51.6314 2.69924 51.875 3.31255 51.875H21.8126C21.8126 54.9416 23.0307 57.8825 25.1991 60.0509C27.3675 62.2193 30.3085 63.4375 33.3751 63.4375C36.4416 63.4375 39.3826 62.2193 41.551 60.0509C43.7194 57.8825 44.9376 54.9416 44.9376 51.875H63.4376C64.0509 51.875 64.6391 51.6314 65.0727 51.1977C65.5064 50.764 65.7501 50.1758 65.7501 49.5625C65.7609 43.4326 64.0271 37.4262 60.7512 32.2451C57.4752 27.064 52.7925 22.9222 47.2501 20.3036ZM33.3751 58.8125C31.5351 58.8125 29.7705 58.0816 28.4695 56.7806C27.1685 55.4795 26.4376 53.7149 26.4376 51.875H40.3126C40.3126 53.7149 39.5816 55.4795 38.2806 56.7806C36.9796 58.0816 35.215 58.8125 33.3751 58.8125Z" stroke="#D5D5D5" stroke-width="2"/>
    </svg>`,
    on: `<svg width="63" height="60" viewBox="0 0 63 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M44.375 18.521V17.75C44.375 16.5731 43.9075 15.4444 43.0753 14.6122C42.2431 13.78 41.1144 13.3125 39.9375 13.3125H33.2813V2.21875C33.2813 1.6303 33.0475 1.06595 32.6314 0.649857C32.2153 0.23376 31.651 0 31.0626 0C30.4741 0 29.9098 0.23376 29.4937 0.649857C29.0776 1.06595 28.8438 1.6303 28.8438 2.21875V13.3125H22.1875C21.0107 13.3125 19.882 13.78 19.0498 14.6122C18.2176 15.4444 17.75 16.5731 17.75 17.75V18.521C12.4323 21.0335 7.93942 25.0074 4.7963 29.9784C1.65317 34.9495 -0.0103707 40.7124 4.86465e-05 46.5938C4.86465e-05 47.1822 0.233809 47.7465 0.649905 48.1626C1.066 48.5787 1.63035 48.8125 2.2188 48.8125H19.9688C19.9688 51.7547 21.1376 54.5765 23.2181 56.657C25.2986 58.7374 28.1203 59.9063 31.0626 59.9063C34.0048 59.9063 36.8265 58.7374 38.907 56.657C40.9875 54.5765 42.1563 51.7547 42.1563 48.8125H59.9063C60.4948 48.8125 61.0591 48.5787 61.4752 48.1626C61.8913 47.7465 62.1251 47.1822 62.1251 46.5938C62.1355 40.7124 60.4719 34.9495 57.3288 29.9784C54.1857 25.0074 49.6928 21.0335 44.375 18.521ZM31.0626 55.4688C29.2972 55.4688 27.6042 54.7675 26.3559 53.5192C25.1076 52.2709 24.4063 50.5778 24.4063 48.8125H37.7188C37.7188 50.5778 37.0175 52.2709 35.7692 53.5192C34.5209 54.7675 32.8279 55.4688 31.0626 55.4688Z" fill="#E5CCA8"/>
    </svg>`
  },
  rightLamp: {
    off: `<svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M56.4455 65.9756L56.4458 20.1516C56.4458 14.6287 51.9687 10.1515 46.4458 10.1515H31.3219M56.4455 65.9756H37.3863M56.4455 65.9756H65.9756M31.3219 10.1515V4C31.3219 2.34315 29.9788 1 28.3219 1H14.3961C12.7392 1 11.3961 2.34315 11.3961 4V10.1515V13.2093C11.3961 13.5801 11.191 13.9204 10.8631 14.0936L7.92862 15.6435C3.66669 17.8945 0.999996 22.3188 0.999996 27.1387V32.8605C0.999996 33.9651 1.89543 34.8605 3 34.8605H38.8517C39.9563 34.8605 40.8517 33.9651 40.8517 32.8605V26.6015C40.8517 22.0686 38.4906 17.863 34.6206 15.5028L31.8013 13.7833C31.5036 13.6018 31.3219 13.2783 31.3219 12.9296V10.1515Z" stroke="#D5D5D5" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
    on: `<svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30.0927 9.78049V4C30.0927 2.34315 28.7495 1 27.0927 1H13.9746C12.3178 1 10.9746 2.34315 10.9746 4V9.78049V12.6899C10.9746 13.0607 10.7695 13.401 10.4417 13.5742L7.92863 14.9015C3.66671 17.1525 1 21.5768 1 26.3966V31.4878C1 32.5924 1.89543 33.4878 3 33.4878H37.2361C38.3407 33.4878 39.2361 32.5924 39.2361 31.4878V25.8595C39.2361 21.3266 36.875 17.121 33.005 14.7608L30.572 13.2769C30.2743 13.0954 30.0927 12.7719 30.0927 12.4232V9.78049Z" fill="#E5CCA8"/>
      <path d="M54.1977 63.3415L54.198 19.7806C54.198 14.2577 49.7209 9.78049 44.198 9.78049H30.0927M54.1977 63.3415H35.9112M54.1977 63.3415H63.3415M30.0927 9.78049V4C30.0927 2.34315 28.7495 1 27.0927 1H13.9746C12.3178 1 10.9746 2.34315 10.9746 4V9.78049V12.6899C10.9746 13.0607 10.7695 13.401 10.4417 13.5742L7.92863 14.9015C3.66671 17.1525 1 21.5768 1 26.3966V31.4878C1 32.5924 1.89543 33.4878 3 33.4878H37.2361C38.3407 33.4878 39.2361 32.5924 39.2361 31.4878V25.8595C39.2361 21.3266 36.875 17.121 33.005 14.7608L30.572 13.2769C30.2743 13.0954 30.0927 12.7719 30.0927 12.4232V9.78049Z" stroke="#E5CCA8" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  }
};

class LightControlsCard extends LitElement {
  static properties = {
    hass: {},
    config: {},
  };

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 40px 0;
      box-sizing: border-box;
      background: var(--card-background-color);
      border-radius: var(--ha-card-border-radius, 12px);
    }

    .title-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 46px;
      width: 100%;
    }

    .title {
      font-family: 'IBM Plex Mono', monospace;
      font-weight: 600;
      font-size: 32px;
      line-height: 48.64px;
      margin: 0;
    }

    .divider {
      width: 100%;
      height: 2px;
    }

    .lights {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .card-item {
      height: 151px;
      padding: 12px 29px;
      border-radius: 19px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 20px;
      overflow: hidden;
      cursor: pointer;
      transition: background-color 0.2s ease, transform 0.1s ease;
    }

    .card-item:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    .card-item:active {
      transform: scale(0.95);
    }

    .icon-wrapper {
      width: 71px;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    .icon-wrapper svg {
      max-width: 100%;
      max-height: 100%;
    }

    .name-label {
      font-family: 'Anonymous Pro', monospace;
      font-weight: 400;
      font-size: 24px;
      line-height: 36.48px;
      text-align: center;
    }

    .spacer {
      flex: 1;
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
      scale: config.scale !== undefined ? config.scale : 1,
      show_title: config.show_title !== undefined ? config.show_title : true,
      show_divider: config.show_divider !== undefined ? config.show_divider : true,
      show_labels: config.show_labels !== undefined ? config.show_labels : true,
      lights: config.lights,
      ...config
    };
  }

  render() {
    if (!this.hass || !this.config) {
      return html`<div>Loading...</div>`;
    }

    const scale = this.config.scale || 1;
    const showTitle = this.config.show_title !== false;
    const showDivider = this.config.show_divider !== false;
    const showLabels = this.config.show_labels !== false;

    return html`
      <div class="wrapper">
        ${(showTitle || showDivider) ? html`
          <div class="title-section" style="gap: ${46 * scale}px;">
            ${showTitle ? html`
              <h1 class="title" style="
                color: ${this.config.title_color || '#998888'};
                font-size: ${32 * scale}px;
                line-height: ${48.64 * scale}px;
              ">
                ${this.config.title}
              </h1>
            ` : ''}
            ${showDivider ? html`
              <div class="divider" style="background: ${this.config.divider_color || '#9F9F9F'}"></div>
            ` : ''}
          </div>
        ` : ''}
        
        <div class="lights">
          ${this.config.lights.map((light, index) => this._renderLightCard(light, index, scale, showLabels))}
        </div>
      </div>
    `;
  }

  _renderLightCard(light, index, scale = 1, showLabels = true) {
    const entity = light.entity ? this.hass.states[light.entity] : null;
    const isOn = entity && entity.state === "on";
    
    // Get the appropriate SVG based on state
    let svgContent;
    if (isOn && light.svg_on) {
      svgContent = light.svg_on;
    } else if (!isOn && light.svg_off) {
      svgContent = light.svg_off;
    } else if (light.svg) {
      // Legacy: single svg with color replacement
      svgContent = light.svg;
      const iconColor = light.icon_color || "#D5D5D5";
      const activeColor = light.active_color || "#E5CCA8";
      const currentColor = isOn ? activeColor : iconColor;
      svgContent = svgContent.replace(/stroke="[^"]*"/g, `stroke="${currentColor}"`);
      svgContent = svgContent.replace(/fill="(?!none)[^"]*"/g, `fill="${currentColor}"`);
      svgContent = svgContent.replace(/currentColor/g, currentColor);
    } else {
      // Use default SVGs
      const defaultSvg = this._getDefaultSvg(index, isOn);
      svgContent = defaultSvg;
    }

    const labelColor = light.label_color || "#887B6F";

    const items = [];
    
    // Add spacer before (except first item)
    if (index > 0) {
      items.push(html`<div class="spacer"></div>`);
    }

    items.push(html`
      <div 
        class="card-item" 
        data-light="${light.entity || index}"
        data-state="${isOn ? 'on' : 'off'}"
        @click="${() => this._handleClick(light)}"
        style="gap: ${20 * scale}px;"
      >
        <div class="icon-wrapper" style="
          width: ${71 * scale}px;
          min-height: ${71 * scale}px;
        ">
          <div .innerHTML="${svgContent}" style="transform: scale(${scale}); transform-origin: center;"></div>
        </div>
        ${showLabels ? html`
          <div class="name-label" style="
            color: ${labelColor};
            font-size: ${24 * scale}px;
            line-height: ${36.48 * scale}px;
          ">
            ${light.name || "Light"}
          </div>
        ` : ''}
      </div>
    `);

    return items;
  }

  _getDefaultSvg(index, isOn) {
    const svgKeys = Object.keys(DEFAULT_SVGS);
    const key = svgKeys[index % svgKeys.length];
    return isOn ? DEFAULT_SVGS[key].on : DEFAULT_SVGS[key].off;
  }

  _handleClick(light) {
    // Check for custom tap_action
    if (light.tap_action && light.tap_action.trim()) {
      const action = light.tap_action;
      
      // Parse action if it's a string (YAML format from editor)
      let actionConfig = action;
      if (typeof action === 'string') {
        try {
          // Parse YAML-like format
          actionConfig = this._parseActionYaml(action);
        } catch (e) {
          console.error('Failed to parse tap_action:', e);
          return;
        }
      }

      // Execute the custom action
      if (actionConfig && actionConfig.action) {
        const [domain, service] = actionConfig.action.split('.');
        const serviceData = {};
        
        // Add data fields if present
        if (actionConfig.data && typeof actionConfig.data === 'object') {
          Object.assign(serviceData, actionConfig.data);
        }
        
        // Handle target
        if (actionConfig.target && typeof actionConfig.target === 'object') {
          if (actionConfig.target.entity_id) {
            serviceData.entity_id = actionConfig.target.entity_id;
          }
          if (actionConfig.target.device_id) {
            serviceData.device_id = actionConfig.target.device_id;
          }
          if (actionConfig.target.area_id) {
            serviceData.area_id = actionConfig.target.area_id;
          }
        }

        this.hass.callService(domain, service, serviceData);
        return;
      }
    }

    // Default behavior: toggle entity
    if (!light.entity) return;
    
    const entity = this.hass.states[light.entity];
    if (!entity) return;

    // Determine domain from entity
    const domain = light.entity.split('.')[0];
    
    // Toggle the entity
    this.hass.callService(domain === 'light' ? 'light' : 'homeassistant', 'toggle', {
      entity_id: light.entity,
    });
  }

  _parseActionYaml(yamlString) {
    // Robust YAML parser for action configuration
    const result = {
      action: null,
      target: {},
      data: {}
    };
    
    const lines = yamlString.trim().split('\n');
    let currentSection = null;
    let currentKey = null;
    let currentArray = null;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      
      // Skip empty lines and comments
      if (!trimmed || trimmed.startsWith('#')) continue;
      
      // Count leading spaces for indent detection
      const indent = line.search(/\S/);
      
      // Check for array item (- value)
      if (trimmed.startsWith('- ')) {
        const arrayValue = trimmed.substring(2).trim();
        if (currentSection && currentKey) {
          // Add to array
          if (!Array.isArray(result[currentSection][currentKey])) {
            result[currentSection][currentKey] = [];
          }
          result[currentSection][currentKey].push(arrayValue);
        }
        continue;
      }
      
      // Match key: value pattern
      const colonIndex = trimmed.indexOf(':');
      if (colonIndex === -1) continue;
      
      const key = trimmed.substring(0, colonIndex).trim();
      const value = trimmed.substring(colonIndex + 1).trim();
      
      if (indent === 0) {
        // Top-level keys
        currentKey = null;
        if (key === 'action') {
          result.action = value;
          currentSection = null;
        } else if (key === 'target' || key === 'data') {
          currentSection = key;
          // If value is on same line (inline), don't treat as section
          if (value && !value.startsWith('{')) {
            result[key] = value;
            currentSection = null;
          }
        } else {
          result[key] = value || {};
          currentSection = value ? null : key;
        }
      } else if (indent > 0 && currentSection) {
        // Nested keys under target or data
        currentKey = key;
        if (value) {
          result[currentSection][key] = value;
          currentKey = null; // Value on same line, not expecting array
        }
        // If no value, might be followed by array items
      }
    }
    
    return result;
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
      show_title: true,
      show_divider: true,
      show_labels: true,
      lights: [
        {
          entity: "light.left_lamp",
          name: "Left Lamp",
          label_color: "#887B6F"
        },
        {
          entity: "light.ceiling",
          name: "Ceiling",
          label_color: "#887B6F"
        },
        {
          entity: "light.right_lamp",
          name: "Right Lamp",
          label_color: "#887B6F"
        }
      ]
    };
  }
}

// Simple config editor with SVG editing per light
class LightControlsCardEditor extends LitElement {
  static properties = {
    hass: {},
    config: {},
    _expandedLight: { state: true },
  };

  static styles = css`
    .editor {
      padding: 16px;
    }
    .section {
      margin-bottom: 24px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 16px;
    }
    .section-title {
      font-weight: 600;
      margin-bottom: 12px;
      font-size: 14px;
      color: var(--primary-text-color);
    }
    .row {
      margin-bottom: 12px;
    }
    label {
      display: block;
      margin-bottom: 4px;
      font-weight: 500;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    input[type="text"], textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      box-sizing: border-box;
      font-family: inherit;
    }
    input[type="color"] {
      width: 50px;
      height: 32px;
      padding: 2px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      cursor: pointer;
    }
    textarea {
      min-height: 80px;
      font-family: monospace;
      font-size: 11px;
    }
    .hint {
      font-size: 11px;
      color: var(--secondary-text-color);
      margin-top: 4px;
      font-style: italic;
    }
    .color-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .color-row label {
      margin-bottom: 0;
      min-width: 100px;
    }
    .light-item {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      margin-bottom: 12px;
      overflow: hidden;
    }
    .light-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      background: var(--secondary-background-color, #f5f5f5);
      cursor: pointer;
    }
    .light-header:hover {
      background: var(--primary-background-color, #e8e8e8);
    }
    .light-name {
      font-weight: 500;
    }
    .light-content {
      padding: 12px;
      display: none;
    }
    .light-content.expanded {
      display: block;
    }
    .expand-icon {
      transition: transform 0.2s;
    }
    .expand-icon.expanded {
      transform: rotate(180deg);
    }
    .add-light-btn, .remove-light-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
    .add-light-btn {
      background: var(--primary-color, #03a9f4);
      color: white;
      width: 100%;
    }
    .remove-light-btn {
      background: #f44336;
      color: white;
      margin-top: 8px;
    }
    .svg-preview {
      display: flex;
      gap: 16px;
      margin-top: 8px;
      padding: 8px;
      background: var(--secondary-background-color, #f5f5f5);
      border-radius: 4px;
    }
    .svg-preview-item {
      text-align: center;
    }
    .svg-preview-item span {
      display: block;
      font-size: 10px;
      color: var(--secondary-text-color);
      margin-top: 4px;
    }
    .svg-preview-box {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #333;
      border-radius: 4px;
    }
    .svg-preview-box svg {
      max-width: 40px;
      max-height: 40px;
    }
    .toggle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 0;
    }
    .toggle-row label {
      margin-bottom: 0;
    }
    .toggle-switch {
      position: relative;
      width: 48px;
      height: 24px;
    }
    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .toggle-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: 0.3s;
      border-radius: 24px;
    }
    .toggle-slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: 0.3s;
      border-radius: 50%;
    }
    .toggle-switch input:checked + .toggle-slider {
      background-color: var(--primary-color, #03a9f4);
    }
    .toggle-switch input:checked + .toggle-slider:before {
      transform: translateX(24px);
    }
    .scale-row {
      margin-bottom: 12px;
    }
    .scale-row input[type="range"] {
      width: 100%;
      margin-top: 4px;
    }
    .scale-value {
      font-size: 12px;
      color: var(--secondary-text-color);
      text-align: right;
      margin-top: 4px;
    }
  `;

  constructor() {
    super();
    this._expandedLight = null;
  }

  setConfig(config) {
    this.config = config;
  }

  render() {
    if (!this.config) {
      return html``;
    }

    return html`
      <div class="editor">
        <!-- General Settings -->
        <div class="section">
          <div class="section-title">General Settings</div>
          <div class="row">
            <label>Title</label>
            <input
              type="text"
              .value="${this.config.title || 'Light Controls'}"
              @input="${(e) => this._updateConfig('title', e.target.value)}"
            />
          </div>
          <div class="row color-row">
            <label>Title Color</label>
            <input
              type="color"
              .value="${this.config.title_color || '#998888'}"
              @input="${(e) => this._updateConfig('title_color', e.target.value)}"
            />
          </div>
          <div class="row color-row">
            <label>Divider Color</label>
            <input
              type="color"
              .value="${this.config.divider_color || '#9F9F9F'}"
              @input="${(e) => this._updateConfig('divider_color', e.target.value)}"
            />
          </div>
          
          <!-- Scale Slider -->
          <div class="scale-row">
            <label>Scale (Text & Icons)</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              .value="${this.config.scale || 1}"
              @input="${(e) => this._updateConfig('scale', parseFloat(e.target.value))}"
            />
            <div class="scale-value">${this.config.scale || 1}x</div>
          </div>

          <!-- Visibility Toggles -->
          <div class="toggle-row">
            <label>Show Title</label>
            <label class="toggle-switch">
              <input
                type="checkbox"
                .checked="${this.config.show_title !== false}"
                @change="${(e) => this._updateConfig('show_title', e.target.checked)}"
              />
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="toggle-row">
            <label>Show Divider</label>
            <label class="toggle-switch">
              <input
                type="checkbox"
                .checked="${this.config.show_divider !== false}"
                @change="${(e) => this._updateConfig('show_divider', e.target.checked)}"
              />
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="toggle-row">
            <label>Show Labels</label>
            <label class="toggle-switch">
              <input
                type="checkbox"
                .checked="${this.config.show_labels !== false}"
                @change="${(e) => this._updateConfig('show_labels', e.target.checked)}"
              />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>

        <!-- Lights -->
        <div class="section">
          <div class="section-title">Lights</div>
          ${(this.config.lights || []).map((light, index) => this._renderLightEditor(light, index))}
          <button class="add-light-btn" @click="${this._addLight}">+ Add Light</button>
        </div>
      </div>
    `;
  }

  _renderLightEditor(light, index) {
    const isExpanded = this._expandedLight === index;
    
    return html`
      <div class="light-item">
        <div class="light-header" @click="${() => this._toggleLight(index)}">
          <span class="light-name">${light.name || `Light ${index + 1}`}</span>
          <span class="expand-icon ${isExpanded ? 'expanded' : ''}">▼</span>
        </div>
        <div class="light-content ${isExpanded ? 'expanded' : ''}">
          <div class="row">
            <label>Entity ID</label>
            <input
              type="text"
              .value="${light.entity || ''}"
              @input="${(e) => this._updateLight(index, 'entity', e.target.value)}"
              placeholder="light.my_light"
            />
          </div>
          <div class="row">
            <label>Display Name</label>
            <input
              type="text"
              .value="${light.name || ''}"
              @input="${(e) => this._updateLight(index, 'name', e.target.value)}"
              placeholder="My Light"
            />
          </div>
          <div class="row color-row">
            <label>Label Color</label>
            <input
              type="color"
              .value="${light.label_color || '#887B6F'}"
              @input="${(e) => this._updateLight(index, 'label_color', e.target.value)}"
            />
          </div>
          
          <div class="row">
            <label>SVG Icon (Off State) - Paste full SVG code</label>
            <textarea
              .value="${light.svg_off || ''}"
              @input="${(e) => this._updateLight(index, 'svg_off', e.target.value)}"
              placeholder="<svg>...</svg>"
            ></textarea>
          </div>
          
          <div class="row">
            <label>SVG Icon (On State) - Paste full SVG code</label>
            <textarea
              .value="${light.svg_on || ''}"
              @input="${(e) => this._updateLight(index, 'svg_on', e.target.value)}"
              placeholder="<svg>...</svg>"
            ></textarea>
          </div>

          ${(light.svg_off || light.svg_on) ? html`
            <div class="svg-preview">
              ${light.svg_off ? html`
                <div class="svg-preview-item">
                  <div class="svg-preview-box" .innerHTML="${light.svg_off}"></div>
                  <span>Off</span>
                </div>
              ` : ''}
              ${light.svg_on ? html`
                <div class="svg-preview-item">
                  <div class="svg-preview-box" .innerHTML="${light.svg_on}"></div>
                  <span>On</span>
                </div>
              ` : ''}
            </div>
          ` : ''}

          <div class="row">
            <label>Tap Action (YAML format - leave empty to toggle entity)</label>
            <textarea
              .value="${light.tap_action || ''}"
              @input="${(e) => this._updateLight(index, 'tap_action', e.target.value)}"
              placeholder="action: media_player.select_source
target:
  entity_id: media_player.living_room_tv
data:
  source: Netflix"
            ></textarea>
            <div class="hint">Define custom service call. Leave empty to toggle the entity.</div>
          </div>

          <button class="remove-light-btn" @click="${() => this._removeLight(index)}">Remove Light</button>
        </div>
      </div>
    `;
  }

  _toggleLight(index) {
    this._expandedLight = this._expandedLight === index ? null : index;
    this.requestUpdate();
  }

  _updateConfig(key, value) {
    const newConfig = { ...this.config, [key]: value };
    this.config = newConfig;
    this._fireConfigChanged();
  }

  _updateLight(index, key, value) {
    const lights = [...(this.config.lights || [])];
    lights[index] = { ...lights[index], [key]: value };
    this._updateConfig('lights', lights);
  }

  _addLight() {
    const lights = [...(this.config.lights || [])];
    lights.push({
      entity: '',
      name: `Light ${lights.length + 1}`,
      label_color: '#887B6F'
    });
    this._updateConfig('lights', lights);
    this._expandedLight = lights.length - 1;
  }

  _removeLight(index) {
    const lights = [...(this.config.lights || [])];
    lights.splice(index, 1);
    this._updateConfig('lights', lights);
    if (this._expandedLight === index) {
      this._expandedLight = null;
    }
  }

  _fireConfigChanged() {
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this.config },
    }));
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
