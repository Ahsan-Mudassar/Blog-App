import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/database";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loader, setLoader] = useState(false)
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            setLoader(true);

            appwriteService.getPost(slug)
                .then((post) => {
                    if (post) {
                        setPost(post);
                    } else {
                        navigate("/");
                    }
                })
                .catch((error) => {
                    console.error(error);
                    navigate("/");
                })
                .finally(() => {
                    setLoader(false);
                });

        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = async () => {
        try {
            setLoader(true);
            const status = await appwriteService.deletePost(post.$id);

            if (status) {
                await appwriteService.deleteFile(post.featuredimages);
                navigate("/");
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoader(false);
        }
    };
    if (loader) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
                <Spinner />
            </div>
        )
    }

    return post ? (
        <div className="my-8">
            <Container>
                <div className="w-full mb-6">
                    <h1 className="text-2xl text-black font-bold">{post.title}</h1>
                </div>
                <div className="text-black">
                    {post.content ? parse(post.content) : <p>No content avaible</p>}
                </div>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex">
                            <Link to={`/edit-post/${post.slug}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    ) : null;
}