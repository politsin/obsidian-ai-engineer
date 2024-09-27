import { ItemView, Notice, setIcon, WorkspaceLeaf } from "obsidian";
import AiEngineer from "src/main";
import { AiSettings } from "src/set/settingsType";
import { createActionBox } from "./actionBox";

export const VIEW_TYPE_AI_CHAT = "ai-chat-view";

export class AiEngineerChatView extends ItemView {
  private plugin: AiEngineer;
  private settings: AiSettings;
  constructor(leaf: WorkspaceLeaf, plugin: AiEngineer, settings: AiSettings) {
    super(leaf);
    this.icon = 'message-square';
  }

  getViewType() {
    return VIEW_TYPE_AI_CHAT;
  }

  getDisplayText() {
    return "Ai Engineer";
  }

  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
    container.createEl("h4", { text: "Ai Engineer" });

    const chatContainer = container.createEl('div', {
      attr: { class: 'chatContainer' }
    });

    // Create and append the action box
    const actionBox = createActionBox(chatContainer); 
  }

  async onClose() {
    // Nothing to clean up.
  }
}
