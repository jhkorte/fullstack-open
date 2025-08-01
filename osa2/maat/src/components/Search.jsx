const Search = (props) => {
  return (
    <form onSubmit={props.handleSearch}>
        <div>
          Search: <input
                    value={props.newSearch}
                    onChange={props.handleSearchChange}
                  />
        </div>
    </form>
  )
}

export default Search