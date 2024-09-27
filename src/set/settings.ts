// /Users/politsin/Documents/politsin-cloud/.obsidian/plugins/obsidian-ai-engineer/src/settings.ts
import { App, PluginSettingTab, Setting } from "obsidian";
import AiEngineer from "../main"; // Assuming 'main.ts' exports the plugin class
import { DEFAULTS } from "./settingsType";

export class AiEngineerSettingTab extends PluginSettingTab {
  plugin: AiEngineer;

  constructor(app: App, plugin: AiEngineer) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Setting #1")
      .setDesc("It's a secret")
      .addText((text) =>
        text
          .setPlaceholder("Enter your secret")
          .setValue(this.plugin.settings.hello)
          .onChange(async (value) => {
            this.plugin.settings.hello = value;
            await this.plugin.saveSettings();
          })
      );
    new Setting(containerEl)
      .setName("OpenAI API Key")
      .setDesc("Enter your OpenAI API key here")
      .addText((text) =>
        text
          .setPlaceholder("sk-...")
          .setValue(this.plugin.settings.openAI.apiKey)
          .onChange(async (value) => {
            this.plugin.settings.openAI.apiKey = value;
            await this.plugin.saveSettings();
          })
      );
    new Setting(containerEl)
      .setName("Custom API Endpoint")
      .setDesc("Custom URL for your AI API (e.g., https://api.openai.com/v1)")
      .addButton((button) =>
        button
          .setButtonText("Restore Default")
          .setIcon("rotate-cw")
          .setClass("clickable-icon")
          .onClick(async () => {
            this.plugin.settings.openAI.baseUrl = DEFAULTS.openAI.baseUrl;
            await this.plugin.saveSettings();
          })
      )
      .addText((text) =>
        text
          .setPlaceholder("https://api.openai.com/v1")
          .setValue(this.plugin.settings.openAI.baseUrl)
          .onChange(async (value) => {
            this.plugin.settings.openAI.baseUrl = value;
            await this.plugin.saveSettings();
          })
      );
    new Setting(containerEl)
      .setName("Enable Steam")
      .setDesc("Enable/Disable chat steam")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.openAI.steam)
          .onChange(async (value) => {
            this.plugin.settings.openAI.steam = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
