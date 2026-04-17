import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import appwriteService from '../../appwrite/database'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Spinner from '../../pages/Spinner'

export default function PostForm({ post }) {
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || '',
            status: post?.status || "active",
        },
    })
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const submit = async (data) => {
        if (!userData?.$id) {
            console.error("Cannot submit: user is not authenticated.");
            return;
        }
        try {
            setLoading(true)
            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
                if (file) {
                    appwriteService.deleteFile(post.featuredimages)
                }
                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredimages: file ? file.$id : undefined,
                })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            } else {
                let fileId = null;

                if (data.image && data.image[0]) {
                    try {
                        const file = await appwriteService.uploadFile(data.image[0]);

                        if (file && file.$id) {
                            fileId = file.$id;
                        } else {
                            console.error("Upload succeeded but file object is invalid:", file);
                        }
                    } catch (uploadError) {
                        console.error("File upload failed:", uploadError);
                    }
                }
                const dbPost = await appwriteService.createPost({
                    ...data,
                    documentId: data.slug,
                    featuredimages: fileId,
                    userId: userData.$id
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); 
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]/g, '')
                .replace(/\s+/g, '-')

        return ''
    }, [])

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue('slug', slugTransform(value.title, { shouldValidate: true }))
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])
    if (loading) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
            <Spinner />
        </div>
    )
}

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 bg-gray-800"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredimages)}
                            alt={post.title}
                            className="w-full h-auto rounded-xl object-cover "
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                 type="submit"
                 bgColor={post ? "bg-green-500" : undefined}
                 disabled={loading}
                className="w-full cursor-pointer">
                    
                    {loading ? "Submitting..." : post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}
