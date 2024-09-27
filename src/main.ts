import { Notice, Plugin } from "obsidian";
import { AiEngineerSettingTab } from "./set/settings";
import { AiSettings, DEFAULTS } from "./set/settingsType";

// Remember to rename these classes and interfaces!

export default class AiEngineer extends Plugin {
  settings: AiSettings;

  async onload() {
    await this.loadSettings();

    // This creates an icon in the left ribbon.
    const ribbonIconEl = this.addRibbonIcon(
      "message-square",
      "Ai Engineer",
      (evt: MouseEvent) => {
        // Called when the user clicks the icon.
        new Notice("This is a notice!");
      }
    );
    // Perform additional things with the ribbon
    ribbonIconEl.addClass("ai-engineer-ribbon-class");

    // This adds a status bar item to the bottom of the app. Does not work on mobile apps.
    const statusBarItemEl = this.addStatusBarItem();
    statusBarItemEl.setText("AiE");

    // This adds a settings tab so the user can configure various aspects of the plugin
    this.addSettingTab(new AiEngineerSettingTab(this.app, this));
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULTS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
