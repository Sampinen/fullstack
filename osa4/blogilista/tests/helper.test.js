const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')


const emptyList = []
const listWithOneBlog = [
    {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
    }
]
const listWithManyBlogs = [
    {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
    },
    {
    _id: '83832832838917872189',
    title: 'Perunablogi',
    author: 'Samu Peruna',
    url: 'http://www.sami.peruna.fi',
    likes: 20,
    __v: 0
    },
    {
    _id: '8759889958588595',
    title: 'Porkkanatarha',
    author: 'Paula Porkkana',
    url: 'https://www.paula.porkkana1123.fi',
    likes: 15,
    __v: 0
    }

]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(emptyList)
        assert.strictEqual(result,0)
    })
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })
    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithManyBlogs)
        assert.strictEqual(result,40)
    })

})

describe('Most liked blog', () =>{
    test('when there are no blogs, returns empty braces {}', () => {
        const result = listHelper.favoriteBlog(emptyList)
        assert.deepStrictEqual(result,{})
    })
    test('when there is one blog, return that blog', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        assert.deepStrictEqual(result, listWithOneBlog[0])
    })
    test('is the blog with most likes, when there are multiple blogs', () =>{
        const result = listHelper.favoriteBlog(listWithManyBlogs)
        assert.deepStrictEqual(result, listWithManyBlogs[1])
    })
})