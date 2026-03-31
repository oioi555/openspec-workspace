// Centralized command IDs used across the extension.

export const Commands = {
  viewDetails: 'openspecWorkspace.viewDetails',
  listChanges: 'openspecWorkspace.listChanges',
  openSettings: 'openspecWorkspace.openSettings',
  copyChangeName: 'openspecWorkspace.copyChangeName',
  copyChangeCommandPropose: 'openspecWorkspace.copyChangeCommand.propose',
  copyChangeCommandExplore: 'openspecWorkspace.copyChangeCommand.explore',
  copyChangeCommandNew: 'openspecWorkspace.copyChangeCommand.new',
  copyChangeCommandBulkArchive: 'openspecWorkspace.copyChangeCommand.bulkArchive',
  copyChangeCommandApply: 'openspecWorkspace.copyChangeCommand.apply',
  copyChangeCommandArchive: 'openspecWorkspace.copyChangeCommand.archive',
  copyChangeCommandContinue: 'openspecWorkspace.copyChangeCommand.continue',
  copyChangeCommandFastForward: 'openspecWorkspace.copyChangeCommand.ff',
  copyChangeCommandVerify: 'openspecWorkspace.copyChangeCommand.verify',
  copyChangeCommandSync: 'openspecWorkspace.copyChangeCommand.sync',
  init: 'openspecWorkspace.init',
  runCliTool: 'openspecWorkspace.runCliTool',
  openCliHelp: 'openspecWorkspace.openCliHelp',

  explorerFocus: 'openspecWorkspaceExplorer.focus'
} as const;
