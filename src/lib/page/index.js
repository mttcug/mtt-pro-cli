const path = require('path')
import chalk from 'chalk'
import Page from './Page.js'

const page = (projectName, pageName) => {
    const pageCreator = new Page(pageName)
    return pageCreator.create()
}

module.exports = (...args) => {
    return page(...args).catch(err => {
        console.log(chalk.red(err))
    })
}