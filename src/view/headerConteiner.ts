export const createHeader= (container: HTMLElement) => {
  const headerContainer = container.createEl('div', {
    attr: { id: 'ai-header' },
  });
  headerContainer.createEl("h4", { text: "Ai Engineer" });
  return headerContainer;
}
