
const port = (port) => {
    console.log(`Server running on port ${port}`)
}
function error( error, text="Error: ") {
    const info = text
    const err = error.toString()
    console.log(info + err)
}

const requestInfo = ({method,path,body}) => {
    console.log('Method:', method)
    console.log('Path:  ', path)
    console.log('Body:  ', body)
    console.log('---')
}

const connected = console.log("connected to MongoDB")

const blogs = (blogs) => {
    const type = typeof blogs
    console.log("Blogs found? (Check type) "+ type)
}
module.exports = { port,error, connected,requestInfo, blogs }
