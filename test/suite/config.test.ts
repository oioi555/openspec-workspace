import * as assert from 'assert';

import {
  getExpandedCommandContextValues,
  getOpenSpecExpandedCommands,
  isExpandedCommandEnabled,
  OPENSPEC_EXPANDED_COMMANDS
} from '../../src/utils/config';

suite('Config Test Suite', () => {
  test('Should read per-command expanded settings', () => {
    const configuration = {
      get<T>(section: string, defaultValue?: T): T {
        const values: Record<string, unknown> = {
          'expandedCommands.new': true,
          'expandedCommands.bulkArchive': false,
          'expandedCommands.continue': true,
          'expandedCommands.fastForward': false,
          'expandedCommands.verify': true,
          'expandedCommands.sync': false
        };

        return (values[section] as T | undefined) ?? (defaultValue as T);
      }
    } as const;

    const expanded = getOpenSpecExpandedCommands(configuration as any);
    assert.deepStrictEqual(expanded, {
      new: true,
      bulkArchive: false,
      continue: true,
      fastForward: false,
      verify: true,
      sync: false
    });

    assert.strictEqual(isExpandedCommandEnabled('new', configuration as any), true);
    assert.strictEqual(isExpandedCommandEnabled('bulkArchive', configuration as any), false);
  });

  test('Should expose context values for each expanded command', () => {
    const configuration = {
      get<T>(section: string, defaultValue?: T): T {
        return ((section === 'expandedCommands.sync' ? true : false) as T | undefined) ?? (defaultValue as T);
      }
    } as const;

    const contexts = getExpandedCommandContextValues(configuration as any);
    assert.strictEqual(contexts.length, Object.keys(OPENSPEC_EXPANDED_COMMANDS).length);
    assert.deepStrictEqual(
      contexts.find(entry => entry.context === OPENSPEC_EXPANDED_COMMANDS.sync.context),
      {
        context: OPENSPEC_EXPANDED_COMMANDS.sync.context,
        enabled: true
      }
    );
  });
});
