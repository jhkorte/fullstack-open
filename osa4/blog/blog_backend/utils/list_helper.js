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

const mostLikes = (blogs) => {
    if (blogs.length === 0) return 0

    const blogAuthors = blogs.map(blog => blog.author)
    const blogLikes = blogs.map(blog => blog.likes)

    // Make an array of unique names
    const reducer = (accumulator, name) => {
        if (!accumulator.includes(name)) accumulator.push(name)
        return accumulator
    }
    const uniqueAuthors = blogAuthors.reduce(reducer, [])

    // Make into a hasmhap with all the unique author names and value 0
    const authorLikesObject = Object.fromEntries(uniqueAuthors.map(name => [name, 0]))

    // Now go to each blog, look up the author and that blogs likes to the author
    blogs.forEach((blog) => {
        authorLikesObject[blog.author] += blog.likes
    })

    // Now find the object with highest "likes", get the name and amount of likes
    const [mostLikesAuthor, mostLikes] = _.maxBy(Object.entries(authorLikesObject), author => author[1])

    return {
        author: mostLikesAuthor,
        likes: mostLikes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}