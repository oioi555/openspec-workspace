import * as assert from 'assert';
import {
  buildOpenSpecCommandSnippet,
  buildOpenSpecChangeCommandSnippet,
  copyOpenSpecChangeCommandSnippet,
  copyOpenSpecCommandSnippet
} from '../../src/utils/changeCommandSnippet';

suite('Change Command Snippet Test Suite', () => {
  test('Should build Claude Code snippets for commands with and without change names', () => {
    assert.strictEqual(
      buildOpenSpecCommandSnippet({ command: 'propose', syntax: 'claudeCode' }),
      '/opsx:propose'
    );

    assert.strictEqual(
      buildOpenSpecChangeCommandSnippet({ changeId: 'alpha-change', command: 'apply', syntax: 'claudeCode' }),
      '/opsx:apply alpha-change'
    );
  });

  test('Should build default syntax snippets for commands with and without change names', () => {
    assert.strictEqual(
      buildOpenSpecCommandSnippet({ command: 'explore', syntax: 'default' }),
      '/opsx-explore'
    );

    assert.strictEqual(
      buildOpenSpecCommandSnippet({ changeId: 'alpha-change', command: 'verify', syntax: 'default' }),
      '/opsx-verify alpha-change'
    );
  });

  test('Should default to standard syntax when syntax is omitted', () => {
    assert.strictEqual(
      buildOpenSpecCommandSnippet({ command: 'propose' }),
      '/opsx-propose'
    );
  });

  test('Should reject empty change ids for change-aware commands', () => {
    assert.throws(
      () => buildOpenSpecChangeCommandSnippet({ changeId: '   ', command: 'verify', syntax: 'claudeCode' }),
      /Change ID is required/
    );
  });

  test('Should write snippets to the clipboard helper', async () => {
    let copied = '';
    const snippet = await copyOpenSpecCommandSnippet(
      { command: 'new', syntax: 'default' },
      async (value: string) => {
        copied = value;
      }
    );

    assert.strictEqual(snippet, '/opsx-new');
    assert.strictEqual(copied, '/opsx-new');
  });

  test('Should preserve compatibility for change-aware clipboard helper', async () => {
    let copied = '';
    const snippet = await copyOpenSpecChangeCommandSnippet(
      { changeId: 'alpha-change', command: 'sync', syntax: 'claudeCode' },
      async (value: string) => {
        copied = value;
      }
    );

    assert.strictEqual(snippet, '/opsx:sync alpha-change');
    assert.strictEqual(copied, '/opsx:sync alpha-change');
  });

  test('Should surface clipboard write failures', async () => {
    await assert.rejects(
      copyOpenSpecChangeCommandSnippet(
        { changeId: 'alpha-change', command: 'archive', syntax: 'claudeCode' },
        async () => {
          throw new Error('clipboard unavailable');
        }
      ),
      /clipboard unavailable/
    );
  });

  test('Should normalize unknown syntax to default through config helper compatibility', async () => {
    let copied = '';
    const snippet = await copyOpenSpecCommandSnippet(
      { command: 'explore', syntax: 'default' },
      async (value: string) => {
        copied = value;
      }
    );

    assert.strictEqual(snippet, '/opsx-explore');
    assert.strictEqual(copied, '/opsx-explore');
  });
});
