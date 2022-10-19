import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from "./Blog"

const blog = {
    title: "test title",
    author: "test author",
    url: "test url",
    likes: 5,
    user: {
        username: "test username"
    }
}

const user = {
    username: "test username",
    name: "test name"
}

test("By default, only the blog's title and author are displayed", async () => {
    const { container } = render(<Blog blog={blog} user={user} />)

    const titleAndAuthor = container.querySelector(".title-and-author")
    const details = container.querySelector(".details")

    expect(titleAndAuthor.textContent).toBe(`${blog.title} ${blog.author} show`)
    expect(details).toBe(null)
})

test("The blog's url and number of likes appear when the \"show\" button is clicked", () => {
    const { container } = render(<Blog blog={blog} user={user} />)

    const titleAndAuthor = container.querySelector(".title-and-author")
    const details = container.querySelector(".details")

    expect(titleAndAuthor.textContent).toBe(`${blog.title} ${blog.author} show`)
    expect(details).toBe(null)
})

