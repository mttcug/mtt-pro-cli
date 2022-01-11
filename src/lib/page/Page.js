import { readFiles, writeFiles } from '../../utils/index.js'
const path = require('path')
import { pathExists } from 'fs-extra'

class Page {
    constructor(projectName, pageName) {
        this.projectName = projectName
        this.pageName = pageName
    }
    async create () {
        const files = await readFiles(path.resolve(__dirname, '../../template/page'))
        console.log('----------files:', files)
        writeFiles(path.resolve(__dirname, '../../test'), files)
        return new Promise((resolve, reject) => {
            return 'lll'
        })
    }
}

export default Page