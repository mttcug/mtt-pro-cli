    
const fg = require('fast-glob')
const fs = require('fs')
const fsE = require('fs-extra')
const path = require('path')

// 读取文件模版文件中的文件内容
export const readFiles = async (context) => {
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
export const writeFiles = async (dir, files) => {
    Object.keys(files).map((name) => {
        const context = path.join(dir, name)
        fsE.ensureDirSync(path.dirname(context))
        fs.writeFileSync(context, files[name])
    })
}