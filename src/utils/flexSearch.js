import FlexSearch from "flexsearch"

const flexSearch = (searchQuery, index, store) => {
  const importedIndex = FlexSearch.create({
    encode: "icase",
    tokenize: function (str) {
      const cjkItems = str.replace(/[\x00-\x7F]/g, "").split("")
      const asciiItems = str.replace(/[^\x00-\x7F]/g, "").split(/\W+/)
      return cjkItems.concat(asciiItems)
    },
    threshold: 1,
    resolution: 3,
    depth: 2,
  })
  importedIndex.import(index)

  return importedIndex.search(searchQuery).map(index => store[index])
}

export default flexSearch
