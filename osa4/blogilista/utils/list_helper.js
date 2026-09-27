const dummy = (blogs) => {

  return 1
}

const favoriteBlogs = (blogs) => {
    var likes = 0
    function larger(blog) {
        if (blog.likes >likes) {
            likes = blog.likes
        }
    }
    blogs.map(larger)
    return likes
}

module.exports = {
  dummy,
  favoriteBlogs
}
