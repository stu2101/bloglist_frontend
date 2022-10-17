import Blog from "./Blog"
import Togglable from "./Togglable"

const Blogs = (props) => {

    const clearInputs = () => {
        document.getElementById("title").value = ""
        document.getElementById("author").value = ""
        document.getElementById("url").value = ""
    }

    return (
        <div>
            <h2>blogs</h2>
            <p>
                {props.user.name} logged in
                <button
                    onClick={props.onClickLogout}
                >logout</button>
            </p>

            <Togglable buttonLabel="new blog" ref={props.blogFormRef}>
                <h2>create new</h2>
                <form onSubmit={props.createBlog}>
                    <div>
                        title:
                        <input
                            type="text"
                            name="title"
                            id="title"
                            onChange={
                                ({ target }) => {
                                    props.setBlog({ ...props.blog, title: target.value })
                                    console.log(props.blog);
                                }
                            }
                        />
                    </div>
                    <div>
                        author:
                        <input
                            type="text"
                            name="author"
                            id="author"
                            onChange={
                                ({ target }) => {
                                    props.setBlog({ ...props.blog, author: target.value })
                                    console.log(props.blog);
                                }
                            }
                        />
                    </div>
                    <div>
                        url:
                        <input
                            type="text"
                            name="url"
                            id="url"
                            onChange={
                                ({ target }) => {
                                    props.setBlog({ ...props.blog, url: target.value })
                                    console.log(props.blog);
                                }
                            }
                        />
                    </div>
                    <button type="submit" onClick={clearInputs}>create</button>
                </form>
            </Togglable>

            {
                props.blogs.map(blog =>
                    <Blog
                        key={blog.id}
                        blog={blog}
                    />
                )
            }
        </div>
    )

}

export default Blogs