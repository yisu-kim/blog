const fs = require("fs")
const dateFns = require("date-fns")
const _ = require("lodash")
const rr = require("recursive-readdir")
const matter = require("gray-matter")
const { program } = require("commander")
const inquirer = require("inquirer")

const CONTENTS_DIR = `content/blog`
const TARGET_DIR = `${process.cwd()}/${CONTENTS_DIR}`

const slugify = str => str.split(" ").join("-").toLowerCase()

const getTags = async () => {
  const markdownFiles = await rr(TARGET_DIR)
  return _.uniq(
    markdownFiles
      .map(file => fs.readFileSync(file, `utf8`))
      .map(str => matter(str).data.tags)
      .filter(val => !!val)
      .flat()
      .map(str => str.trim().toLowerCase())
  )
}

const inquireTag = async (choices, results = []) => {
  const DONE = { name: `[DONE!]`, value: null }
  const currChoices = [..._.difference(choices, results)]

  let tags = []
  const customTagOption = `[NEW TAG]`
  const tagChoices = [
    DONE,
    customTagOption,
    new inquirer.Separator(),
    ...currChoices,
  ]

  const { selectedTag } = await inquirer.prompt([
    {
      type: `list`,
      name: `selectedTag`,
      message: `Select a tag: `,
      choices: tagChoices,
    },
  ])

  if (!selectedTag) {
    return _.uniq(results)
  }

  if (selectedTag === customTagOption) {
    const { customizedTag } = await inquirer.prompt([
      {
        type: `input`,
        name: `customizedTag`,
        message: `Enter the customized tag`,
        validate: val => {
          if (val.includes(`'`)) {
            return `Cannot use single quote`
          }

          const lowerVal = val.trim().toLowerCase()
          if (choices.includes(lowerVal) || results.includes(lowerVal)) {
            return `Already exist tag name: ${lowerVal}`
          }

          return true
        },
      },
    ])
    if (customizedTag) {
      tags.push(customizedTag)
    }
  } else {
    tags.push(selectedTag)
  }
  return inquireTag(choices, results.concat(tags))
}

program
  .arguments(`<title>`)
  .requiredOption(`-s, --slug <slug>`, `slug is required`)
  .option(`-d, --description <description>`, `post description`)
  .action(async (title, options) => {
    const slug = slugify(options.slug)
    const dir = `./${CONTENTS_DIR}/${slug}`

    if (fs.existsSync(dir)) {
      throw `That post already exists!`
    }

    const date = dateFns.format(new Date(), `yyyy-MM-dd HH:mm:ss`)
    const description = options.description ? options.description : ``
    const tagList = await getTags()
    const tags = await inquireTag(tagList)

    fs.mkdirSync(dir)
    fs.writeFileSync(
      `${dir}/index.md`,
      `---
slug: ${slug}
date: ${date}
title: ${title}
description: ${description}
tags:${tags.map(tag => "\n  - " + tag).join(``)}
---`,
      function (err) {
        if (err) {
          return console.log(err)
        }
        console.log(`${title} was created!`)
      }
    )
  })

program.parse(process.argv)
