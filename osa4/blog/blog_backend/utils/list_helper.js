var _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item
    }

    return blogs.length === 0
        ? 0
        : blogs
            .map(blog => blog.likes)
            .reduce(reducer, 0)
        
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return 0

    const blogLikes = blogs.map(blog => blog.likes)
    const mostLikesIndex = blogLikes.indexOf(Math.max(...blogLikes))

    return blogs[mostLikesIndex]
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return 0

    const blogAuthors = blogs.map(blog => blog.author)

    // This returns a pair of the name and amount of blogs
    const [mostBlogsAuthor, blogsAmount] = _
        .chain(blogAuthors)
        .countBy()
        .toPairs()
        .maxBy(author => author[1])
        .value()

    return {
        author: mostBlogsAuthor,
        blogs: blogsAmount
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
}