const downloadGit = require('download-git-repo')
const fs = require('fs')
const fsE = require('fs-extra')
const path = require('path')
const fg = require('fast-glob')

export class Creator {
    constructor (projectName) {
        this.projectName = projectName
    }

    async create() {
        await this.downLoad()
        const context = path.join(process.cwd(), 'template')
        const files = await this.readFiles(context)
        await this.writeFiles(path.join(process.cwd(), this.projectName), files)
        fs.rmdir(context)
    }

    // 下载模版
    async downLoad () {
        return new Promise((resolve, reject) => {
            downloadGit('direct:https://github.com/mttcug/react-base','template', {clone: true}, (err) => {
                console.log(err)
                if (err) { reject(err) }
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
