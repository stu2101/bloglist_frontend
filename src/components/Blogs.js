import Blog from "./Blog"

const Blogs = (props) => {
    return (
        <div>
            <h2>blogs</h2>
            <p>
                {props.user.name} logged in
                <button
                    onClick={props.onClickLogout}
                >logout</button>
            </p>

            <h2>create new</h2>

            <form onSubmit={props.createBlog}>
                <div>
                    title:
                    <input
                        type="text"
                        name="title"
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
                        onChange={
                            ({ target }) => {
                                props.setBlog({ ...props.blog, url: target.value })
                                console.log(props.blog);
                            }
                        }
                    />
                </div>

                <button type="submit">create</button>
            </form>

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