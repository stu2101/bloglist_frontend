import { useState } from "react"
import Blog from "./Blog"
import Togglable from "./Togglable"

const Blogs = (props) => {
    const [newBlog, setNewBlog] = useState({})

    const clearInputs = () => {
        document.getElementById("title").value = ""
        document.getElementById("author").value = ""
        document.getElementById("url").value = ""
    }

    const addBlog = (event) => {
        event.preventDefault()
        props.createBlog(newBlog)
        setNewBlog({})
    }

    return (
        <div>
            <h2>blogs</h2>
            <p>
                {props.user.name} logged in
                <button
                    id="logoutButton"
                    onClick={props.onClickLogout}
                >logout</button>
            </p>

            <Togglable
                buttonLabel="new blog"
                ref={props.blogFormRef}
                className="buttonNewBlog"
            >
                <h2>create new</h2>
                <form onSubmit={addBlog}>
                    <div>
                        title:
                        <input
                            className="inputTitle"
                            type="text"
                            name="title"
                            id="title"
                            onChange={
                                ({ target }) => {
                                    setNewBlog({ ...newBlog, title: target.value })
                                    console.log(newBlog);
                                }
                            }
                        />
                    </div>
                    <div>
                        author:
                        <input
                            className="inputAuthor"
                            type="text"
                            name="author"
                            id="author"
                            onChange={
                                ({ target }) => {
                                    setNewBlog({ ...newBlog, author: target.value })
                                    console.log(newBlog);
                                }
                            }
                        />
                    </div>
                    <div>
                        url:
                        <input
                            className="inputUrl"
                            type="text"
                            name="url"
                            id="url"
                            onChange={
                                ({ target }) => {
                                    setNewBlog({ ...newBlog, url: target.value })
                                    console.log(newBlog);
                                }
                            }
                        />
                    </div>
                    <button
                        className="buttonCreate"
                        type="submit"
                        onClick={clearInputs}>create</button>
                </form>
            </Togglable>

            {props.blogs
                .sort((a, b) => b.likes - a.likes)
                .map(blog =>
                    <Blog
                        key={blog.id}
                        blog={blog}
                        user={props.user}
                        deleteBlog={props.deleteBlog}
                    />
                )
            }
        </div>
    )

}

export default Blogs