import './EditPost.scss'
import {useGetPostQuery, useUpdatePostMutation} from "../../redux/reducers/postsApi";
import {SubmitHandler, useForm} from "react-hook-form";
import {IFormInput} from "../../types/interfaces";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {da} from "date-fns/locale";

const EditPost = () => {
    const [title, setTitle] = useState('.')
    const [desc, setDesc] = useState('.')
    const [textArea, setTextArea] = useState('.')
    const {slug} = useParams()
    let navigate = useNavigate();
    const [tag, setTag] = useState(0)
    const {isSuccess: postInfo, isLoading, data} = useGetPostQuery(slug)
    const [updatePost, {isSuccess}] = useUpdatePostMutation()
    const {register, handleSubmit, formState: {errors}} = useForm()

    useEffect(() => {
        if (isSuccess) {
            return navigate(`/articles`);
        }
    }, [isSuccess]);

    const onSubmit: SubmitHandler<IFormInput> = (validate: any) => {

        const {Body, Desc, Title, ...tags} = validate

        let tagList = []

        for (let key in tags) {
            tagList.push(tags[key])
        }

        updatePost([{
            "article": {
                "title": Title,
                "description": Desc,
                "body": Body,
            }
        }, localStorage.getItem('token')])
    }

    const elements = Array.from(Array(tag).keys()).map(el => {
        return (
            <li key={el + 1}>
                <input type="text"
                       {...register(`Tag${el + 1}`)}
                       placeholder='Tag'/>
                <button onClick={(e) => deleteTag(e)} className='deleteButton'>Delete</button>
            </li>
        )
    })

    const addTag = (e: any) => {
        e.preventDefault()
        setTag(tag + 1)
    }

    const deleteTag = (e: any) => {
        e.preventDefault()
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        if (tag > 0) {
            setTag(tag - 1)
        }
    }

    const changeValue = (e: any) => {
        if (e.target.placeholder === 'Title') {
            setTitle(e.target.value)
        }
        if (e.target.placeholder === 'Short description') {
            setDesc(e.target.value)
        }
        if (e.target.placeholder === 'Text') {
            setTextArea(e.target.value)
        }

    }


    if (postInfo) {
        console.log(data)
        if (title === '.') {
            setTitle(data.article.title)
        }
        if (desc === '.') {
            setDesc(data.article.description)
        }
        if (textArea === '.') {
            setTextArea(data.article.body)
        }

        return (
            <form className='editPostForm' onSubmit={handleSubmit(onSubmit)}>

                <h2>Edit article</h2>


                <div className='editPostInputWrapper'>
                    <label htmlFor="">Title</label>
                    <input type="text"
                           {...register('Title', {
                               required: true,
                               minLength: 3,
                               maxLength: 60,
                           })}
                           placeholder='Title'
                           onChange={(e) => changeValue(e)}
                           value={title}
                    />
                    {errors.Title?.type === 'required' ? <span style={{color: 'red'}}>Required field</span> : null}
                    {errors.Title?.type === 'maxLength' ? <span style={{color: 'red', marginBottom: '15px'}}>You can enter a maximum of 60 characters</span> : null}
                    {errors.Title?.type === 'minLength' ? <span style={{color: 'red', marginBottom: '15px'}}>You need to enter at least 3 characters</span> : null}
                </div>


                <div className='editPostInputWrapper'>
                    <label htmlFor="">Short description</label>
                    <input type="text"
                           {...register('Desc', {
                               required: true,
                               minLength: 6,
                               maxLength: 250,
                           })}
                           placeholder='Short description'
                           onChange={(e) => changeValue(e)}
                           value={desc}/>
                    {errors.Desc?.type === 'minLength' ? <span style={{color: 'red', marginBottom: '15px'}}>You need to enter at least 6 characters</span> : null}
                    {errors.Desc?.type === 'maxLength' ? <span style={{color: 'red', marginBottom: '15px'}}>You can enter a maximum of 250 characters</span> : null}
                    {errors.Desc?.type === 'required' ? <span style={{color: 'red'}}>Required field</span> : null}
                </div>


                <div className='editPostInputWrapper'>
                    <label htmlFor="">Text</label>
                    <textarea placeholder='Text'
                              {...register('Body', {
                                  required: true,
                                  minLength: 6,
                                  maxLength: 1000
                              })}
                              onChange={(e) => changeValue(e)}
                              value={textArea}
                    />
                    {errors.Body?.type === 'minLength' ? <span style={{color: 'red', marginBottom: '15px'}}>You need to enter at least 6 characters</span> : null}
                    {errors.Body?.type === 'maxLength' ? <span style={{color: 'red', marginBottom: '15px'}}>You can enter a maximum of 1000 characters</span> : null}
                    {errors.Body?.type === 'required' ? <span style={{color: 'red'}}>Required field</span> : null}
                </div>


                <div className='editPostInputWrapper'>
                    <label htmlFor="">Tags</label>
                    <ul>
                        {elements.reverse()}
                        <li key={0}>
                            <input type="text"
                                   {...register('Tag0')}
                                   placeholder='Tag'/>
                            <button onClick={(e) => deleteTag(e)} className='deleteButton'>Delete</button>
                            <button onClick={(e) => addTag(e)} className='addButton'>Add Tag</button>
                        </li>
                    </ul>
                </div>


                <button className='sendButton'>Send</button>


            </form>
        )
    } else {
        return <h1>Пост грзиится</h1>
    }
}

export {EditPost}