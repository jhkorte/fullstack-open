const Search = (props) => {
  return (
    <form onSubmit={props.handleSearchPersons}>
        <div>
          Search: <input
                    value={props.newSearch}
                    onChange={props.handleSearchChange}
                  />
        </div>
        <div>To see the full list, leave the search bar empty</div>
    </form>
  )
}

export default Search