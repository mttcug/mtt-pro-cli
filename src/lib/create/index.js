import inquirer from 'inquirer'
const validateProjectName = require('validate-npm-package-name')
import chalk from 'chalk'
import fs from 'fs'
const path = require('path')
import Creator from './Creator'

async function create (projectName) {
    let _proName = projectName
    let _framework, _platform
    if (!_proName) {
        const result = await inquirer.prompt([
            {
                type: 'input',
                name: 'projectName',
                message: 'Please enter the project name: ',
                default: "project"
            }
        ])
        _proName = result.projectName
    }
    const { validForNewPackages, errors, warnings } = validateProjectName(_proName)
    if (!validForNewPackages) {
        console.error(chalk.red('inValid project name!!!'))
        process.exit(-1)
    }
    const targetDir = path.resolve(process.cwd(), _proName)
    if(fs.existsSync(targetDir)) {
        await fs.remove(targetDir)
    }
    console.info(chalk.magenta('mtt-pro-cli start ...'))
    const result = await inquirer.prompt([
        {
            type: 'list',
            name: 'framework',
            message: 'Pick a framework you need to build: ',
            choices: [{name: 'Vue', value: 'vue'}, {name: 'React', value: 'react'}]
        }
    ])
    _framework = result.framework
    if (_framework === 'vue') {
        const result = await inquirer.prompt([
            {
                type: 'list',
                name: 'platform',
                message: 'Pick a framework you need to build: ',
                choices: [{name: '移动端H5项目', value: 'vue_h5'}, {name: 'PC端业务系统', value: 'vue_pc'}]
            }
        ])
        _platform = result.platform
    } else {
        const result = await inquirer.prompt([
            {
                type: 'list',
                name: 'platform',
                message: 'Pick a framework you need to build: ',
                choices: [{name: '移动端H5项目', value: 'react_h5'}, {name: 'PC端业务系统', value: 'react_pc'}]
            }
        ])
        _platform = result.platform
    }
    const creator = new Creator(_proName, _framework, _platform)
    await creator.create()
};

module.exports = (...args) => {
    return create(...args).catch((err) => {
        console.log(chalk.red('project initialing fail!!!'))
        process.exit(-1)
    })
}
