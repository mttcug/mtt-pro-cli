import program from 'commander'
import create from './lib/create/index'

const [ explain, cliCommand, command, projectName ] = process.argv

const commands = {
    'create': {
        description: 'create a new project',
        usage: [
            'prx create <project-name>'
        ],
        action: () => {
            return create(projectName)
        }
    },
    'page': {
        description: 'create a new page',
        usage: [
            'prx page <page-name>'
        ],
        action: () => {
            return page(projectName)
        }
    }
}

Object.keys(commands).map((command) => {
    program.command(command)
            .description(commandMap[command].description)
            .usage(commandMap[command].usage[0])
            .action(() => {
                commandMap[command].action()
            })
})


// function help () {
//     Object.keys(commands).map((command) => {
//         console.log('-'+command, commandMap[command].usage[0], commandMap[command].description)
//     })
// }

// program.on('-h', help)

program.parse(process.argv)
