import program from 'commander'
import create from './lib/create/index'
import page from './lib/page/index'

const [ explain, cliCommand, command, projectName ] = process.argv

const commandMap = {
    'create': {
        description: 'create a new project',
        usage: [
            'prx create <project-name>'
        ],
        action: () => {
            return create(process.argv[3])
        }
    },
    'page': {
        description: 'create a new page',
        usage: [
            'prx page add <page-name>'
        ],
        action: () => {
            return page(process.argv[3], process.argv[4])
        }
    }
}

Object.keys(commandMap).map((command) => {
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
