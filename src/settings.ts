// /Users/politsin/Documents/politsin-cloud/.obsidian/plugins/obsidian-ai-engineer/src/settings.ts
import { App, PluginSettingTab, Setting } from 'obsidian';
import MyPlugin from './main'; // Assuming 'main.ts' exports the plugin class

interface AiEngineerPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: AiEngineerPluginSettings = {
	mySetting: 'default'
};

export class SettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}

export { DEFAULT_SETTINGS, type AiEngineerPluginSettings };
