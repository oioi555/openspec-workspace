import * as vscode from 'vscode';

import { Commands } from '../constants/commands';
import { TreeItemData } from '../types';
import { ErrorHandler } from '../utils/errorHandler';
import { WorkspaceUtils } from '../utils/workspace';

export const OPEN_SPEC_CLI_REFERENCE_URL = 'https://github.com/Fission-AI/OpenSpec/blob/main/docs/cli.md';
export const OPEN_SPEC_CLI_COMMANDS = [
  'openspec view',
  'openspec list',
  'openspec validate',
  'openspec config profile',
  'openspec update'
] as const;

export class OpenSpecCliToolsProvider implements vscode.TreeDataProvider<TreeItemData> {
  private _onDidChangeTreeData: vscode.EventEmitter<TreeItemData | undefined | null | void> = new vscode.EventEmitter<TreeItemData | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<TreeItemData | undefined | null | void> = this._onDidChangeTreeData.event;

  private _workspaceFolder: vscode.WorkspaceFolder | undefined;

  constructor() {
    this.updateWorkspaceFolder();
  }

  refresh(): void {
    this.updateWorkspaceFolder();
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: TreeItemData): vscode.TreeItem {
    const treeItem = new vscode.TreeItem(element.label, vscode.TreeItemCollapsibleState.None);

    treeItem.id = element.id;
    treeItem.tooltip = this.getTooltip(element);
    treeItem.contextValue = element.contextValue || 'default';

    if (element.type === 'cliCommand') {
      treeItem.iconPath = new vscode.ThemeIcon('terminal');
      treeItem.command = {
        command: Commands.runCliTool,
        title: 'Run CLI Tool',
        arguments: [element]
      };
    } else if (element.type === 'cliHelp') {
      treeItem.iconPath = new vscode.ThemeIcon('link-external');
      treeItem.command = {
        command: Commands.openCliHelp,
        title: 'Open CLI Reference',
        arguments: [element]
      };
    }

    return treeItem;
  }

  getChildren(element?: TreeItemData): Thenable<TreeItemData[]> {
    if (element || !this._workspaceFolder) {
      return Promise.resolve([]);
    }

    return WorkspaceUtils.isOpenSpecInitialized(this._workspaceFolder)
      .then(isInitialized => (isInitialized ? this.getCliToolsItems() : []))
      .catch(error => {
        ErrorHandler.handle(error as Error, 'loading CLI tools', false);
        return [];
      });
  }

  private getCliToolsItems(): TreeItemData[] {
    return [
      ...OPEN_SPEC_CLI_COMMANDS.map(command => ({
        id: `cli-${command}`,
        label: command,
        type: 'cliCommand' as const,
        contextValue: 'cli-command',
        metadata: {
          cliCommand: command
        }
      })),
      {
        id: 'cli-help',
        label: 'OpenSpec CLI Reference',
        type: 'cliHelp' as const,
        contextValue: 'cli-help',
        metadata: {
          externalUrl: OPEN_SPEC_CLI_REFERENCE_URL
        }
      }
    ];
  }

  private getTooltip(element: TreeItemData): string {
    if (element.type === 'cliCommand') {
      return element.metadata?.cliCommand || element.label;
    }

    if (element.type === 'cliHelp') {
      return element.metadata?.externalUrl || element.label;
    }

    return element.label;
  }

  private updateWorkspaceFolder(): void {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    ErrorHandler.debug(`[CliToolsProvider] Workspace folders: ${JSON.stringify(workspaceFolders?.map(folder => folder.uri.fsPath) || [])}`);

    if (workspaceFolders && workspaceFolders.length > 0) {
      this._workspaceFolder = workspaceFolders[0];
      ErrorHandler.debug(`[CliToolsProvider] Selected workspace: ${this._workspaceFolder.uri.fsPath}`);
      return;
    }

    this._workspaceFolder = undefined;
  }
}
