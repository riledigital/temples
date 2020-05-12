import { isEmpty } from 'lodash';
import { Select, Input } from 'enquirer';
import clc from 'cli-color';

export const boldCyan = clc.cyan.bold;

/**
 * Prompt for command name.
 *
 * @param {String[]} commands | list of available commands
 *
 * @returns {String} chosen command
 */
export const promptCommand = async (commands) => {
  const prompt = new Select({
    name: 'command',
    message: 'Select command to run:',
    choices: commands,
  });

  const answer = await prompt.run();
  return answer;
};

/**
 * Prompt for the value for each key.
 *
 * @params {String} command | name of command
 * @params {String[]} keys | list of keys
 *
 * @returns {Object} key to value mapping
 */
export const promptMapping = async (command, keys = []) => {
  if (isEmpty(keys)) {
    return {};
  }

  console.log(`\nDictionary for ${boldCyan(command)}:`);
  let mapping = {};

  for (const key of keys) {
    const prompt = new Input({
      message: key,
    });

    const value = await prompt.run();
    mapping = { ...mapping, [key]: value };
  }

  return mapping;
};