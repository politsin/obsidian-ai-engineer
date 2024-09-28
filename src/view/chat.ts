import { ItemView, Notice, WorkspaceLeaf } from "obsidian";
import AiEngineer from "src/main";
import { AiSettings } from "src/set/settingsType";
import { createActionBox } from "./actionBox";
import { createHeader } from "./headerConteiner";
import { createChat } from "./chatConteiner";
import { Root, createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { ReactView } from "./ReactView";

export const VIEW_TYPE_AI_CHAT = "ai-chat-view";

export class AiEngineerChatView extends ItemView {
  root: Root | null = null;
  private plugin: AiEngineer;
  private settings: AiSettings;
  aiEnginerView: any;
  headerContainer: HTMLElement;
  chatContainer: HTMLElement;
  actionBox: HTMLElement;
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
    this.root = createRoot(this.containerEl.children[1]);
    this.root.render(
      <StrictMode>
      <ReactView />,
      </StrictMode>,
    );
  }
  old() {
    this.aiEnginerView = this.containerEl.children[1];
    this.aiEnginerView.empty();
    this.aiEnginerView.id = 'ai-engineer-view'

    this.headerContainer = createHeader(this.aiEnginerView);
    this.chatContainer = createChat(this.aiEnginerView);
    this.actionBox = createActionBox(this.aiEnginerView);

    // Add event listener to the submit button

    // Add event listener to the textarea for Enter key press
    const textarea = this.actionBox.querySelector('.chat-textarea') as HTMLTextAreaElement;
    textarea.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default newline behavior
        this.sendMessage();
      }
    });
    const submitButton = this.actionBox.querySelector('.submit-button') as HTMLButtonElement;
    submitButton.addEventListener('click', this.sendMessage.bind(this));
  }

  async onClose() {
    // Nothing to clean up.
  }

  // Function to send message and display response
  async sendMessage() {
    const textarea = this.actionBox.querySelector('.chat-textarea') as HTMLTextAreaElement;
    const message = textarea.value.trim();
    if (!message) return;

    this.displayMessage(message, 'user');
    textarea.value = '';

    // Replace this with your actual ChatGPT API call
    const response = await new Promise(resolve => {
      setTimeout(() => resolve("This is a sample response from ChatGPT."), 1000);
    });

    // Type Guard (safer):
    if (typeof response === 'string') {
      this.displayMessage(response, 'bot');
    } else {
      console.error('ChatGPT API did not return a string:', response);
      new Notice('error');
    }
  }

  // Function to display messages in the chat container
  displayMessage(message: string, role: 'user' | 'bot') {
    const messageEl = this.chatContainer.createEl('div', { 
      cls: `message ${role}`
    });
    messageEl.textContent = message;
  }
}
