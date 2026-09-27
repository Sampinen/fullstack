const dummy = (blogs) => {

  return 1
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



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}