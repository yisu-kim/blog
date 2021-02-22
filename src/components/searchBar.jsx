import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
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
    <form ref={formRef} className="search-bar" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="제목, 태그, 본문 검색 :)"
        onChange={handleChange}
      />
      <button type="submit">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  )
}

export default SearchBar