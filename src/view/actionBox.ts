import { Notice, setIcon } from "obsidian";

export const createActionBox = (container: HTMLElement) => {
  const textarea = document.createElement('textarea');
  textarea.setAttribute('contenteditable', true.toString());
  textarea.setAttribute('placeholder', 'Mesasge...');
  textarea.style.overflow = 'auto';
  textarea.style.resize = 'none';
  textarea.classList.add('chat-textarea');
  

  const submitButton = document.createElement('button', {});
  submitButton.title = 'send';
  submitButton.textContent = 'send';
  submitButton.classList.add('submit-button');
  setIcon(submitButton, 'arrow-up');
  submitButton.addEventListener('click', () => {
    console.log("Submit button clicked!");
    new Notice("Submit button clicked!");
  });

  const actionBox = container.createEl('div', {
    attr: { id: 'ai-action-box' },
  });
  actionBox.appendChild(textarea);
  actionBox.appendChild(submitButton);

  // Function to adjust textarea height
  const adjustTextareaHeight = () => {
    textarea.style.height = 'auto';
    textarea.style.minHeight = '30px';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  // Call adjustTextareaHeight initially and on input
  adjustTextareaHeight();
  textarea.addEventListener('input', adjustTextareaHeight);
  

  return actionBox;
};
