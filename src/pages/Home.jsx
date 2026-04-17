import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/database'
import Spinner from './Spinner';

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)

        appwriteService.getPosts([])
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [])
     if (loading) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
            <Spinner />
        </div>
    )
}
    
    if (posts.length === 0) {
        return (
            <Container>
                <div className=' w-full text-center py-40'>
                    <h1 className='text-3xl font-bold font-sans text-black'>Login to read posts</h1>
                </div>

            </Container>
        )
    }
    return (

        <>
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap'>
                        {posts.map((post) => {
                            return <div key={post.$id} className='p-2 w-1/2'>
                                <PostCard post={post} />
                            </div>
                        })}
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Home