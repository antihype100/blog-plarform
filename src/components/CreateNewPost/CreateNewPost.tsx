import './CreateNewPost.scss'
import {useCreatePostMutation} from "../../redux/reducers/postsApi";
import { SubmitHandler, useForm} from "react-hook-form";
import {IFormInput} from "../Auth/SignIn/SignIn";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const CreateNewPost = () => {

    const [tag, setTag] = useState(0)
    const [createPost, {isSuccess}] = useCreatePostMutation()
    const {register, handleSubmit, formState: {errors}} = useForm()
    let navigate = useNavigate();
    useEffect(() => {
        if (isSuccess){
            return navigate(`/articles`);
        }
    },[isSuccess]);

    const onSubmit: SubmitHandler<IFormInput> = (validate: any) => {

        const {Body, Desc, Title, ...tags} = validate

        let tagList = []

        for (let key in tags) {
            tagList.push(tags[key])
        }

        createPost({
            "article": {
                "title": Title,
                "description": Desc,
                "body": Body,
                "tagList": tagList
            }
        })
    }




    const elements: JSX.Element[] = Array.from(Array(tag).keys()).map(el => {

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


    return (
        <form className='createPostForm' onSubmit={handleSubmit(onSubmit)}>
            <h2>Create new article</h2>
            <div className='createPostInputWrapper'>
                <label htmlFor="">Title</label>
                <input type="text"
                       {...register('Title', {
                           required: true,
                           minLength: 3,
                           maxLength: 60,
                       })}
                       placeholder='Title'/>
                {errors.Title?.type === 'required' ? <span style={{color: 'red'}}>Required field</span> : null}
                {errors.Title?.type === 'maxLength' ? <span style={{color: 'red', marginBottom: '15px'}}>You can enter a maximum of 60 characters</span> : null}
                {errors.Title?.type === 'minLength' ? <span style={{color: 'red', marginBottom: '15px'}}>You need to enter at least 3 characters</span> : null}

            </div>
            <div className='createPostInputWrapper'>
                <label htmlFor="">Short description</label>
                <input type="text"
                       {...register('Desc', {
                           required: true,
                           minLength: 6,
                           maxLength: 250,
                       })}
                       placeholder='Short description'/>
                {errors.Desc?.type === 'minLength' ? <span style={{color: 'red', marginBottom: '15px'}}>You need to enter at least 6 characters</span> : null}
                {errors.Desc?.type === 'maxLength' ? <span style={{color: 'red', marginBottom: '15px'}}>You can enter a maximum of 250 characters</span> : null}
                {errors.Desc?.type === 'required' ? <span style={{color: 'red'}}>Required field</span> : null}
            </div>
            <div className='createPostInputWrapper'>
                <label htmlFor="">Text</label>
                <textarea placeholder='Text'
                          {...register('Body', {
                              required: true,
                              minLength: 6,
                              maxLength: 1000
                          })}/>
                {errors.Body?.type === 'minLength' ? <span style={{color: 'red', marginBottom: '15px'}}>You need to enter at least 6 characters</span> : null}
                {errors.Body?.type === 'maxLength' ? <span style={{color: 'red', marginBottom: '15px'}}>You can enter a maximum of 1000 characters</span> : null}{errors.Body?.type === 'required' ? <span style={{color: 'red'}}>Required field</span> : null}
            </div>
            <div className='createPostInputWrapper'>
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
}

export {CreateNewPost}