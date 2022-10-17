import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog }) => {
    const [visible, setVisible] = useState(false)
    const [likes, setLikes] = useState(blog.likes)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const increaseLikes = () => {
        const updatedLikes = {...blog, likes: likes + 1}

        console.log(updatedLikes);
        blogService.update(blog.id, updatedLikes)
        setLikes(likes + 1)
    }

    return (
        <div>
            {visible ?
                <div style={blogStyle}>
                    <div>{blog.title} {blog.author} <button onClick={() => { setVisible(!visible) }}>hide</button></div>
                    <div>{blog.url}</div>
                    <div>likes {likes} <button onClick={increaseLikes}> like </button> </div>
                    <div>{blog.user.name}</div>
                </div>
                :
                <div style={blogStyle}>
                    {blog.title} {blog.author} <button onClick={() => setVisible(!visible)}>show</button>
                </div>
            }
        </div>
    )
}




export default Blog