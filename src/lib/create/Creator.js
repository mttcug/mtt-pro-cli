const downloadGit = require('download-git-repo')
const fs = require('fs')
const fsE = require('fs-extra')
const path = require('path')
const fg = require('fast-glob')
const ora = require('ora')
const rm = require('rimraf')
const { exec } = require('child_process')
const chalk = require('chalk')
import logSymbols from 'log-symbols'

export class Creator {
    constructor (projectName, framework, platform) {
        this.projectName = projectName
        this.framework = framework
        this.platform = platform
    }

    async create() {
        await this.downLoad()
        const context = path.join(process.cwd(), 'project')
        const files = await this.readFiles(context)
        await this.writeFiles(path.join(process.cwd(), this.projectName), files)
        return new Promise((resolve, reject) => {
            rm(context, {}, (err) => {
				const loading = ora('installing modules...')
                loading.start()
                exec('npm install', { cwd: `${this.projectName}` }, (err) => {
                    if (err) return reject(err)
                    resolve()
                    loading.succeed()
					console.log(logSymbols.success, chalk.green('prx initial success'))
					const cmd = this.framework === 'react' ? 'npm run start' : 'npm run dev'
					console.log(chalk.cyan(`✨ cd ${this.projectName} && ${cmd}`))
                })
            })
        })
    }

    // 下载模版
    async downLoad () {
        const loading = ora('downloading template ...')
        loading.start()
        return new Promise((resolve, reject) => {
            downloadGit('github:mttcug/react-base#master','project', { clone: true }, (err) => {
                console.log(err)
                if (err) {
                    loading.fail()
                    return reject(err)
                }
                loading.succeed()
                resolve()
            })
        })
    }

    // 读取文件模版文件中的文件内容
    async readFiles(context) {
        const files = await fg(['**'], {
            cwd: context,
            onlyFiles: true,
            gitignore: true,
            ignore: ['**/node_modules/**', '**/.git/**'],
            dot: true
        })
        let res = {}
        for (const file of files) {
            const dir = path.join(context, file)
            res[file] = fs.readFileSync(dir, 'utf-8')
        }
        return res
    }

    // 把文件写入相应名字的工程里
    async writeFiles(dir, files) {
        Object.keys(files).map((name) => {
            const context = path.join(dir, name)
            fsE.ensureDirSync(path.dirname(context))
            fs.writeFileSync(context, files[name])
        })
    }
}

export default Creator
