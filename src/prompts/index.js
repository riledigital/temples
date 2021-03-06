import Listr from 'listr';
import { isEmpty } from 'lodash';
import { Select, Input } from 'enquirer';
import clc from 'cli-color';

export const { white, cyan } = clc;
export const boldCyan = cyan.bold;

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

  return await prompt.run();
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

  let mapping = {};

  for (const key of keys) {
    const promptKey = key.key || key;
    const promptDoc = key.doc;

    const prompt = new Input({
      message: promptKey,
    });

    if (promptDoc) {
      console.log(`\n${white(promptDoc)}`);
    }

    const value = await prompt.run();
    mapping = { ...mapping, [promptKey]: value };
  }

  return mapping;
};

/**
 * Run and notify given Listr processes.
 *
 * @param {String} headline | headline for processes
 * @param {Object[]} processes | Listr task list
 * @param {Object} options | options for Listr
 */
export const notifyProcesses = (
  headline,
  processes,
  options = { exitOnError: false },
) => {
  console.log(headline);
  new Listr(processes, options).run().catch((err) => console.error(err));
};
