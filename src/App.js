import { useState, useEffect, useRef } from 'react'

// components
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import Message from './components/Message'

// services
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [blogs, setBlogs] = useState([])

    const [msgType, setMsgType] = useState("")
    const [msgText, setMsgText] = useState(null)

    const blogFormRef = useRef()

    const createBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility()
        const newBlog = await blogService.create(blogObject)

        setBlogs(blogs.concat(newBlog))

        setMsgText("Blog added successfully")
        setTimeout(() => {
            setMsgText(null)
        }, 3500)
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({ username, password });

            window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))

            blogService.setToken(user.token)
            setUser(user);
            setUsername("")
            setPassword("")
        }
        catch (error) {
            setMsgType("error")
            setMsgText("Wrong username or password")
            setTimeout(() => {
                setMsgText(null)
                setMsgType("")
            }, 3500)
        }
    }

    const logOut = (event) => {
        window.localStorage.removeItem("loggedBlogappUser")

        // Calling setUser() modifies the state of the component, causing it to re-render.
        // The details of the logged in user are erased, but if setUser() isn't called, the application
        // will stay on the same page, going back to the login form only after the page is refreshed
        setUser(null)
    }

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem("loggedBlogappUser")

        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    return (
        <div>
            <Message type={msgType} message={msgText} />
            {user === null ? (
                <LoginForm
                    onSubmit={handleLogin}
                    usernameValue={username}
                    setUsername={setUsername}
                    passwordValue={password}
                    setPassword={setPassword}
                />
            ) : (
                <Blogs
                    blogFormRef={blogFormRef}
                    createBlog={createBlog}
                    onClickLogout={logOut}
                    user={user}
                    blogs={blogs}
                />
            )
            }
        </div>
    )
}

export default App
