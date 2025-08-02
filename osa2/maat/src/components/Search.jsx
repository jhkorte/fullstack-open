const Search = (props) => {
  return (
    <form>
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