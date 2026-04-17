import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/database"
import Spinner from './Spinner';

function AllPost() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        appwriteService.getPosts([])
            .then((result) => {
                if (result) {
                    setPosts(result.documents)
                }
            })
            .catch((err) => {
                console.error("Failed to fetch posts:", err)
                setError("Failed to load posts.")
            })
            .finally(() => setLoading(false))
    }, []);

    if (loading) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
            <Spinner />
        </div>
    )
}
    if (error) return <div className='w-full py-8 text-center text-red-500'>{error}</div>;

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.length === 0 ? (
                        <p className='text-center w-full'>No posts found.</p>
                    ) : (
                        posts.map((post) => (
                            <div key={post.$id} className='p-2 '>
                                <PostCard post={post} />
                            </div>
                        ))
                    )}
                </div>
            </Container>
        </div>
    )
}

export default AllPost;