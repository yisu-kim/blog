import React from "react"

const SearchBar = ({ setSearchQuery }) => {
  const formRef = React.createRef()
  const inputRef = React.createRef()

  const handleSubmit = e => {
    e.preventDefault()
  }

  const handleChange = e => {
    setSearchQuery(e.target.value)
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="제목, 태그, 본문 검색 :)"
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchBar
