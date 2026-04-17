import React, { useEffect, useState } from 'react'
import  Container  from '../components/container/Container'
import appwriteService from "../appwrite/database"
import { useNavigate, useParams } from 'react-router-dom'
import PostForm from '../components/post-form/PostForm'

function EditPost() {
    const [post, setPosts] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPosts(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ) : null
}

export default EditPost