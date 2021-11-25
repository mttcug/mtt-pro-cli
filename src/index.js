import program from 'commander'
import create from './lib/create/index'

const [ explain, cliCommand, command, projectName ] = process.argv

program.command('create')
        .option('-c', 'create a new project')
        .action(() => {
            return create(projectName)
        })

program.parse(process.argv)
