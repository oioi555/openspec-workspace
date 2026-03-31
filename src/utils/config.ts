import * as vscode from 'vscode';

export const OPENSPEC_CONFIGURATION_SECTION = 'openspecWorkspace';
export const OPENSPEC_COMMAND_SYNTAX_SETTING = 'commandSyntax';
export const OPENSPEC_SETTINGS_QUERY = '@ext:oioi555.openspec-workspace';

export type OpenSpecCommandSyntax = 'default' | 'claudeCode';

export const OPENSPEC_EXPANDED_COMMANDS = {
  new: {
    setting: 'expandedCommands.new',
    context: 'openspecWorkspace:expandedCommandNew'
  },
  bulkArchive: {
    setting: 'expandedCommands.bulkArchive',
    context: 'openspecWorkspace:expandedCommandBulkArchive'
  },
  continue: {
    setting: 'expandedCommands.continue',
    context: 'openspecWorkspace:expandedCommandContinue'
  },
  fastForward: {
    setting: 'expandedCommands.fastForward',
    context: 'openspecWorkspace:expandedCommandFastForward'
  },
  verify: {
    setting: 'expandedCommands.verify',
    context: 'openspecWorkspace:expandedCommandVerify'
  },
  sync: {
    setting: 'expandedCommands.sync',
    context: 'openspecWorkspace:expandedCommandSync'
  }
} as const;

export type OpenSpecExpandedCommandKey = keyof typeof OPENSPEC_EXPANDED_COMMANDS;

export interface OpenSpecExpandedCommandsConfiguration {
  new: boolean;
  bulkArchive: boolean;
  continue: boolean;
  fastForward: boolean;
  verify: boolean;
  sync: boolean;
}

export interface OpenSpecExtensionConfiguration {
  commandSyntax: OpenSpecCommandSyntax;
  expandedCommands: OpenSpecExpandedCommandsConfiguration;
}

export function getOpenSpecConfiguration(
  configuration: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration(OPENSPEC_CONFIGURATION_SECTION)
): OpenSpecExtensionConfiguration {
  const configuredCommandSyntax = configuration.get<string>(OPENSPEC_COMMAND_SYNTAX_SETTING);
  const commandSyntax: OpenSpecCommandSyntax = configuredCommandSyntax === 'claudeCode' ? 'claudeCode' : 'default';

  return {
    commandSyntax,
    expandedCommands: getOpenSpecExpandedCommands(configuration)
  };
}

export function getOpenSpecCommandSyntax(
  configuration?: vscode.WorkspaceConfiguration
): OpenSpecCommandSyntax {
  return getOpenSpecConfiguration(configuration).commandSyntax;
}

export function getOpenSpecExpandedCommands(
  configuration?: vscode.WorkspaceConfiguration
): OpenSpecExpandedCommandsConfiguration {
  const resolvedConfiguration = configuration ?? vscode.workspace.getConfiguration(OPENSPEC_CONFIGURATION_SECTION);

  return {
    new: resolvedConfiguration.get<boolean>(OPENSPEC_EXPANDED_COMMANDS.new.setting, false),
    bulkArchive: resolvedConfiguration.get<boolean>(OPENSPEC_EXPANDED_COMMANDS.bulkArchive.setting, false),
    continue: resolvedConfiguration.get<boolean>(OPENSPEC_EXPANDED_COMMANDS.continue.setting, false),
    fastForward: resolvedConfiguration.get<boolean>(OPENSPEC_EXPANDED_COMMANDS.fastForward.setting, false),
    verify: resolvedConfiguration.get<boolean>(OPENSPEC_EXPANDED_COMMANDS.verify.setting, false),
    sync: resolvedConfiguration.get<boolean>(OPENSPEC_EXPANDED_COMMANDS.sync.setting, false)
  };
}

export function isExpandedCommandEnabled(
  command: OpenSpecExpandedCommandKey,
  configuration?: vscode.WorkspaceConfiguration
): boolean {
  return getOpenSpecExpandedCommands(configuration)[command];
}

export function isOpenSpecConfigurationChange(event: vscode.ConfigurationChangeEvent): boolean {
  return event.affectsConfiguration(OPENSPEC_CONFIGURATION_SECTION);
}

export function getExpandedCommandContextValues(
  configuration?: vscode.WorkspaceConfiguration
): Array<{ context: string; enabled: boolean }> {
  const expandedCommands = getOpenSpecExpandedCommands(configuration);

  return (Object.keys(OPENSPEC_EXPANDED_COMMANDS) as OpenSpecExpandedCommandKey[]).map(command => ({
    context: OPENSPEC_EXPANDED_COMMANDS[command].context,
    enabled: expandedCommands[command]
  }));
}

export async function updateOpenSpecConfigurationContext(): Promise<void> {
  await Promise.all(
    getExpandedCommandContextValues().map(({ context, enabled }) => (
      vscode.commands.executeCommand('setContext', context, enabled)
    ))
  );
}
