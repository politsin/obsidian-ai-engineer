import { ItemView, WorkspaceLeaf } from "obsidian";
import AiEngineer from "src/main";
import { AiSettings } from "src/set/settingsType";

export const VIEW_TYPE_AI_CHAT = "ai-chat-view";

export class AiEngineerChatView extends ItemView {
  private plugin: AiEngineer;
  private settings: AiSettings;
  constructor(leaf: WorkspaceLeaf, plugin: AiEngineer, settings: AiSettings) {
    super(leaf);
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
  }

  async onClose() {
    // Nothing to clean up.
  }
}
