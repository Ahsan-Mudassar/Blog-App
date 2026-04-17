import React from 'react'
import { Controller } from 'react-hook-form'
import { Editor } from '@tinymce/tinymce-react'


function RTE({ name, control, label, value, defaultValue = "", }) {
    return (
        <div>
            {label && <label className='inline-block mb-1 pl-1 text-black'>{label}</label>}
            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        value={value}
                        init={{
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "help",
                                "wordcount"
                            ],
                            toolbar: "undo redo | block |image | bold italic forecolor | alignleft aligncenter bold italic forecolor| alignleft aligncenter alignjustify | bullist numlist outdent indent | removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}

export default RTE