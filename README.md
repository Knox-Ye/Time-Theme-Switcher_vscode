# Time Theme Switcher

[中文](#中文) | [English](#english)

## 中文

### 安装

1. 在 VS Code 中打开扩展页面
2. 点击右上角 `...`
3. 选择 `Install from VSIX...`
4. 选择插件安装包 `.vsix`

### 配置

打开 VS Code 的 `settings.json`，加入如下配置：

```json
{
  "timeThemeSwitcher.enabled": true,
  "timeThemeSwitcher.checkIntervalMinutes": 1,
  "timeThemeSwitcher.showNotifications": true,
  "timeThemeSwitcher.timeSlots": [
    {
      "start": "07:00",
      "end": "17:59",
      "theme": "Default Light+",
      "label": "Day"
    },
    {
      "start": "18:00",
      "end": "06:59",
      "theme": "Default Dark+",
      "label": "Night"
    }
  ]
}
```

### 使用

1. 保存 `settings.json`
2. 等待插件按设定频率自动检查时间并切换主题
3. 如果想立即测试，打开命令面板
4. 执行 `Time Theme Switcher: Refresh Theme Now`

### 配置说明

- `timeThemeSwitcher.enabled`：是否启用自动切换
- `timeThemeSwitcher.checkIntervalMinutes`：检查时间的频率，单位为分钟
- `timeThemeSwitcher.showNotifications`：切换主题时是否弹出通知
- `timeThemeSwitcher.timeSlots`：时间段配置列表
- `start`：开始时间，格式为 `HH:mm`
- `end`：结束时间，格式为 `HH:mm`
- `theme`：要切换到的主题名称，必须与 VS Code 里的主题名称完全一致
- `label`：可选备注

## English

### Install

1. Open the Extensions view in VS Code
2. Click `...` in the top-right corner
3. Select `Install from VSIX...`
4. Choose the `.vsix` extension package

### Configure

Open your VS Code `settings.json` and add:

```json
{
  "timeThemeSwitcher.enabled": true,
  "timeThemeSwitcher.checkIntervalMinutes": 1,
  "timeThemeSwitcher.showNotifications": true,
  "timeThemeSwitcher.timeSlots": [
    {
      "start": "07:00",
      "end": "17:59",
      "theme": "Default Light+",
      "label": "Day"
    },
    {
      "start": "18:00",
      "end": "06:59",
      "theme": "Default Dark+",
      "label": "Night"
    }
  ]
}
```

### Usage

1. Save `settings.json`
2. Let the extension check the time automatically on the configured interval
3. To test immediately, open the Command Palette
4. Run `Time Theme Switcher: Refresh Theme Now`

### Settings Reference

- `timeThemeSwitcher.enabled`: enables or disables automatic switching
- `timeThemeSwitcher.checkIntervalMinutes`: how often the extension checks the current time, in minutes
- `timeThemeSwitcher.showNotifications`: shows a notification when the theme changes
- `timeThemeSwitcher.timeSlots`: list of configured time slots
- `start`: start time in `HH:mm` format
- `end`: end time in `HH:mm` format
- `theme`: target theme name, which must exactly match a theme installed in VS Code
- `label`: optional note for the slot
