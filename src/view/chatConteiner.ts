export const createChat= (container: HTMLElement) => {
  const chatContainer = container.createEl('div', {
    attr: { id: 'ai-chat' },
  });
  chatContainer.createEl("h6", { text: "Chat" });
  return chatContainer;
}
