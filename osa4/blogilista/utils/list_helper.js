

const dummy = (blogs) => {

  return 1
}

const getAuthors = (blogs) => {
    return blogs.map(blog =>blog.author)
}

const getUniqueValues = (arr) => {
    return [...new Set(arr)]
}


const totalLikes = (blogs)=> {

    var likes = 0
    function likeSum(blog) {
        likes += blog.likes
        }
    blogs.map(likeSum)
    return likes
}


const favoriteBlog = (blogs) => {
    var likes = -1
    var favorite = {}
    function larger(blog) {
        if (blog.likes >likes) {
            likes = blog.likes
            favorite = blog
        }
    }
    blogs.map(larger)
    const type = typeof favorite
    console.log(type)
    return favorite
}
const mostBlogs = (blogs) => {
    var bestAuthor = {
        author: "",
        blogs: -1
    }
    const authors = getAuthors(blogs)
    console.log(authors)
    const uniqueauthors = getUniqueValues(authors)
    console.log(uniqueauthors)
    function blogCounter(author){
        const blogCount = authors.filter(auth=>auth===author).length
        if (blogCount > bestAuthor.blogs) {
            bestAuthor = {
                author: author,
                blogs: blogCount 
            }
        }
    }

    uniqueauthors.map(blogCounter)
    return bestAuthor
}

const mostLikes = (blogs) => {
    var bestAuthor = {
        author: "",
        likes: -1
    }
    const authors = getUniqueValues(getAuthors(blogs))
    function likeCounter(author) {
        var authorLikes = 0
        const authorblogs = blogs.filter(blog=>blog.author===author)
        authorblogs.map(blog => authorLikes += blog.likes)
        if (authorLikes > bestAuthor.likes) {
            bestAuthor = {
                author: author,
                likes: authorLikes
            }
        }
    }
    authors.map(likeCounter)
    return bestAuthor
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
