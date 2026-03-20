# Time Theme Switcher

[中文](#中文) | [English](#english)

## 中文

### 这是什么

`Time Theme Switcher` 是一个 VS Code 插件，可以根据你设置的时间段自动切换主题。

例如：

- 白天自动切换为浅色主题
- 晚上自动切换为深色主题

### 如何打包插件

1. 在项目目录打开终端
2. 执行 `npm install`
3. 执行 `npm run compile`
4. 执行 `npm run package:vsix`
5. 项目根目录会生成 `.vsix` 安装包
6. 在 VS Code 中通过 `Install from VSIX...` 安装这个插件

### 如何配置

打开 VS Code 的 `settings.json`，加入下面的配置：

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

配置项说明：

- `timeThemeSwitcher.enabled`：是否启用自动切换
- `timeThemeSwitcher.checkIntervalMinutes`：检查频率，单位是分钟
- `timeThemeSwitcher.showNotifications`：切换主题时是否显示通知
- `timeThemeSwitcher.timeSlots`：时间段配置列表
- `start`：开始时间，格式为 `HH:mm`
- `end`：结束时间，格式为 `HH:mm`
- `theme`：对应时间段要切换到的主题名称
- `label`：可选备注

### 如何使用

1. 安装插件
2. 在 `settings.json` 中配置好时间段和主题名称
3. 保存配置后，插件会按设定频率自动检查时间并切换主题
4. 如果你想立即测试，可以打开命令面板并执行 `Time Theme Switcher: Refresh Theme Now`

## English

### What It Does

`Time Theme Switcher` is a VS Code extension that automatically switches your theme based on the time ranges you configure.

For example:

- use a light theme during the day
- switch to a dark theme at night

### How To Package

1. Open a terminal in the project directory
2. Run `npm install`
3. Run `npm run compile`
4. Run `npm run package:vsix`
5. A `.vsix` package will be generated in the project root
6. Install it in VS Code through `Install from VSIX...`

### How To Configure

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

Settings reference:

- `timeThemeSwitcher.enabled`: enables or disables automatic switching
- `timeThemeSwitcher.checkIntervalMinutes`: check interval in minutes
- `timeThemeSwitcher.showNotifications`: shows a notification when the theme changes
- `timeThemeSwitcher.timeSlots`: list of configured time slots
- `start`: start time in `HH:mm` format
- `end`: end time in `HH:mm` format
- `theme`: theme name to apply during the slot
- `label`: optional note

### How To Use

1. Install the extension
2. Configure your time slots and theme names in `settings.json`
3. Save the settings and let the extension switch themes automatically
4. To test immediately, open the Command Palette and run `Time Theme Switcher: Refresh Theme Now`
