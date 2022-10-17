import { useState } from "react"

const Blog = ({ blog }) => {
    const [visible, setVisible] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div>
            {visible ?
                <div style={blogStyle}>
                    <div>{blog.title} {blog.author} <button onClick={() => {setVisible(!visible)}}>hide</button></div>
                    <div>{blog.url}</div>
                    <div>likes {blog.likes}</div>
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