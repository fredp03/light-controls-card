# Light Controls Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)

A beautiful, customizable light controls card for Home Assistant with SVG icons and scale support.

![Light Controls Card Preview](preview.png)

## Features

- **Customizable Title**: Change the card title and its color
- **Custom SVG Icons**: Use your own SVG icons for each light
- **Color Configuration**: Set icon colors for on/off states and labels
- **Global Scale Slider**: Scale the entire card up or down (0.5x to 2x)
- **Entity Binding**: Toggle lights directly from the card

## Installation

### HACS (Recommended)

1. Open HACS in Home Assistant
2. Go to **Frontend** section
3. Click the three dots menu → **Custom repositories**
4. Add repository URL: `https://github.com/YOUR_USERNAME/light-controls-card`
5. Category: **Dashboard**
6. Click **Add**
7. Find "Light Controls Card" and click **Download**
8. Restart Home Assistant

### Manual Installation

1. Download `light-controls-card.js` from the latest release
2. Copy to `config/www/light-controls-card.js`
3. Add resource in Home Assistant:
   ```yaml
   resources:
     - url: /local/light-controls-card.js
       type: module
   ```

## Configuration

### Basic Configuration

```yaml
type: custom:light-controls-card
title: Light Controls
lights:
  - entity: light.left_lamp
    name: Left Lamp
  - entity: light.ceiling
    name: Ceiling
  - entity: light.right_lamp
    name: Right Lamp
```

### Full Configuration

```yaml
type: custom:light-controls-card
title: Living Room Lights
title_color: "#998888"
divider_color: "#9F9F9F"
scale: 1
lights:
  - entity: light.left_lamp
    name: Left Lamp
    icon_color: "#D5D5D5"
    active_color: "#FFD700"
    label_color: "#887B6F"
    svg: |
      <svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5301 65.9756L10.5299 32.557..." stroke="currentColor" stroke-width="2"/>
      </svg>
  - entity: light.ceiling
    name: Ceiling
    icon_color: "#D5D5D5"
    active_color: "#FFD700"
    label_color: "#887B6F"
  - entity: light.right_lamp
    name: Right Lamp
    icon_color: "#D5D5D5"
    active_color: "#FFD700"
    label_color: "#887B6F"
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | `Light Controls` | Card title |
| `title_color` | string | `#998888` | Title text color |
| `divider_color` | string | `#9F9F9F` | Divider line color |
| `scale` | number | `1` | Global scale factor (0.5 - 2) |
| `lights` | array | **Required** | Array of light configurations |

### Light Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **Required** | Light entity ID |
| `name` | string | `Light` | Display name |
| `svg` | string | Built-in | Custom SVG icon (raw SVG code) |
| `icon_color` | string | `#D5D5D5` | Icon color when off |
| `active_color` | string | `#FFD700` | Icon color when on |
| `label_color` | string | `#887B6F` | Label text color |

## Custom SVG Icons

You can provide custom SVG icons for each light. The SVG should:
- Use `stroke="currentColor"` for the stroke color (will be replaced with icon_color/active_color)
- Be sized appropriately (recommended viewBox around 67x67)

### Example Custom SVG

```yaml
lights:
  - entity: light.desk_lamp
    name: Desk Lamp
    svg: |
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
```

## Scaling

The scale option allows you to resize the entire card:

```yaml
type: custom:light-controls-card
scale: 0.75  # 75% of original size
# or
scale: 1.5   # 150% of original size
```

## License

MIT License - See [LICENSE](LICENSE) for details.
