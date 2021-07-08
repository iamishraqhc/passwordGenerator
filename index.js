#!/usr/bin/env node
const commander = require('commander')
const chalk = require('chalk')
const clipboardy = require('clipboardy')
const createPassword = require('./utils/createPassword')
const savePassword = require('./utils/savePassword')

commander.version('1.0.0').description('Simple Password Generator')

commander
.option('-l, --length <number>', 'length of password', '8')
.option('-s, --save', 'save password to passwords.txt')
.option('-nn, --no-numbers', 'remove numbers')
.option('-ns, --no-symbols', 'remove symbols')
.parse()

const { length, save, numbers, symbols } = commander.opts()

// Generate password
const generatedPassword = createPassword(length, numbers, symbols)

// Save to file
if (save) {
    savePassword(generatedPassword)
}

// Copy to clipboard
clipboardy.writeSync(generatedPassword)

// Output generated password
console.log(chalk.blueBright('Generated Password: ') + chalk.bold(generatedPassword))
console.log(chalk.green('Password copied to clipboard'))
