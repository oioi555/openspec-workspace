import * as vscode from 'vscode';

import { getOpenSpecCommandSyntax, OpenSpecCommandSyntax } from './config';

export const OPEN_SPEC_CHANGE_COMMANDS = [
  'propose',
  'explore',
  'new',
  'bulk-archive',
  'apply',
  'archive',
  'continue',
  'ff',
  'verify',
  'sync'
] as const;

export type OpenSpecChangeCommand = typeof OPEN_SPEC_CHANGE_COMMANDS[number];

export interface OpenSpecChangeCommandRequest {
  changeId?: string;
  command: OpenSpecChangeCommand;
  syntax?: OpenSpecCommandSyntax;
}

const CHANGE_AWARE_OPEN_SPEC_COMMANDS = new Set<OpenSpecChangeCommand>([
  'apply',
  'archive',
  'continue',
  'ff',
  'verify',
  'sync'
]);

function normalizeText(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : undefined;
}

export function isChangeAwareOpenSpecCommand(command: OpenSpecChangeCommand): boolean {
  return CHANGE_AWARE_OPEN_SPEC_COMMANDS.has(command);
}

function buildOpenSpecCommandPrefix(command: OpenSpecChangeCommand, syntax: OpenSpecCommandSyntax): string {
  return syntax === 'claudeCode' ? `/opsx:${command}` : `/opsx-${command}`;
}

export function buildOpenSpecCommandSnippet(request: OpenSpecChangeCommandRequest): string {
  const syntax = request.syntax ?? 'default';
  const commandPrefix = buildOpenSpecCommandPrefix(request.command, syntax);

  if (!isChangeAwareOpenSpecCommand(request.command)) {
    return commandPrefix;
  }

  const changeId = normalizeText(request.changeId);
  if (!changeId) {
    throw new Error('Change ID is required');
  }

  return `${commandPrefix} ${changeId}`;
}

export function buildOpenSpecChangeCommandSnippet(request: OpenSpecChangeCommandRequest): string {
  return buildOpenSpecCommandSnippet(request);
}

export async function copyOpenSpecCommandSnippet(
  request: OpenSpecChangeCommandRequest,
  writeText: (value: string) => PromiseLike<void> | Promise<void> = (value: string) => vscode.env.clipboard.writeText(value)
): Promise<string> {
  const snippet = buildOpenSpecCommandSnippet({
    ...request,
    syntax: request.syntax ?? getOpenSpecCommandSyntax()
  });
  await writeText(snippet);
  return snippet;
}

export async function copyOpenSpecChangeCommandSnippet(
  request: OpenSpecChangeCommandRequest,
  writeText: (value: string) => PromiseLike<void> | Promise<void> = (value: string) => vscode.env.clipboard.writeText(value)
): Promise<string> {
  return copyOpenSpecCommandSnippet(request, writeText);
}
