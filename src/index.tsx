import { ItemView, Plugin, WorkspaceLeaf } from "obsidian";

import { Root, createRoot } from "react-dom/client"
import * as React from "react";
import App from "./ui/TabView";

const VIEW_TYPE = "react-view";

class MyReactView extends ItemView {
  private reactComponent: React.ReactElement;
  root: Root | null = null;

  getViewType(): string {
    return VIEW_TYPE;
  }

  getDisplayText(): string {
    return "Dice Roller";
  }

  getIcon(): string {
    return "calendar-with-checkmark";
  }

  async onOpen(): Promise<void> {
    this.root = createRoot(this.containerEl.children[1]);
    this.root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}

export default class ReactStarterPlugin extends Plugin {
  private view: MyReactView;

  async onload(): Promise<void> {
    this.registerView(
      VIEW_TYPE,
      (leaf: WorkspaceLeaf) => (this.view = new MyReactView(leaf))
    );

    this.app.workspace.onLayoutReady(this.onLayoutReady.bind(this));
  }

  onLayoutReady(): void {
    if (this.app.workspace.getLeavesOfType(VIEW_TYPE).length) {
      return;
    }
    this.app.workspace.getRightLeaf(false)?.setViewState({
      type: VIEW_TYPE,
    });

  }
}

