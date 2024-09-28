import { Notice, Plugin, WorkspaceLeaf } from "obsidian";
import { AiEngineerSettingTab } from "./set/AiSettings";
import { AiSettings, DEFAULTS } from "./set/settingsType";
import { AiEngineerChatView, VIEW_TYPE_AI_CHAT } from "./view/chat";

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
        new Notice("Ai Chat tab open!");
        this.activateView();
      }
    );
    // Perform additional things with the ribbon
    ribbonIconEl.addClass("ai-engineer-ribbon-class");

    // This adds a status bar item to the bottom of the app. Does not work on mobile apps.
    const statusBarItemEl = this.addStatusBarItem();
    statusBarItemEl.setText("AiE");

    // This adds a settings tab so the user can configure various aspects of the plugin
    this.addSettingTab(new AiEngineerSettingTab(this.app, this));

    this.registerView(
      VIEW_TYPE_AI_CHAT,
      (leaf) => new AiEngineerChatView(leaf, this, this.settings)
    );
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULTS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async activateView() {
    const { workspace } = this.app;

    let leaf: WorkspaceLeaf | null = null;
    const leaves = workspace.getLeavesOfType(VIEW_TYPE_AI_CHAT);

    if (leaves.length > 0) {
      // A leaf with our view already exists, use that
      leaf = leaves[0];
    } else {
      // Our view could not be found in the workspace, create a new leaf
      // in the right sidebar for it
      leaf = workspace.getRightLeaf(false);
      if (leaf) {
        await leaf.setViewState({ type: VIEW_TYPE_AI_CHAT, active: true });
      } else {
        console.error("Could not obtain a WorkspaceLeaf.");
        new Notice("Error: Could not open Ai Chat tab.");
      }
    }
    const textarea = document.querySelector('.chat-textarea') as HTMLTextAreaElement; 
    if (textarea) {
      setTimeout(() => {
        textarea.focus();
      }, 100);
    }

    // "Reveal" the leaf in case it is in a collapsed sidebar
    if (leaf) {
      workspace.revealLeaf(leaf);
    }
  }
}
