import React from 'react'
import { Link } from 'react-router-dom'
import parse from "html-react-parser";

function PostCard({ post }) {
    const { $id, title,  } = post

    return (
        <div>
            <Link to={`/post/${$id}`}>
                <div className='text-black bg-gray-200 p-3 h-40 mt-8'>
                    
                    <h2 className='text-xl font-bold'>{title}</h2>
                    <div className="browser-css">
                        {post.content ? <p> {parse(post.content.slice(0, 200))}...</p> : <p>No content avaible</p>}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default PostCard