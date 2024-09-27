import { ItemView, Notice, setIcon, WorkspaceLeaf } from "obsidian";
import AiEngineer from "src/main";
import { AiSettings } from "src/set/settingsType";

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
    const textarea = document.createElement('textarea');
    textarea.setAttribute('contenteditable', true.toString());
    textarea.setAttribute('placeholder', 'Mesasge...');
    textarea.style.overflow = 'auto';
    textarea.style.resize = 'none'; 
    const submit = document.createElement('button', {});
    submit.textContent = 'send';
    submit.classList.add('submit-button');
    submit.title = 'send';
    setIcon(submit, 'arrow-up');
    submit.addEventListener('click', () => {
      new Notice("Click");
    });
    const chatContainer = container.createEl('div', {
      attr: { class: 'chatContainer' }
    });
    const actionBox = chatContainer.createEl('div', {
      attr: { class: 'chatbox' }
    });
    actionBox.appendChild(textarea);
    actionBox.appendChild(submit);
    // Function to adjust textarea height
    const adjustTextareaHeight = () => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px'; 
    };

    // Call adjustTextareaHeight initially and on input
    adjustTextareaHeight();
    textarea.addEventListener('input', adjustTextareaHeight);
  }

  async onClose() {
    // Nothing to clean up.
  }
}
