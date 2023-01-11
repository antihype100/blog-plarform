import React, { MouseEvent} from 'react';
import './Pagination.scss';
import Next from '../../assets/next.svg';
import Back from '../../assets/back.svg';
import {useDispatch} from "react-redux";
import {decrement, increment, setPageGlobal} from "../../redux/reducers/paginationSlice";
import {useTypedSelector} from "../../hooks/useTypedSelector";



const Pagination = () => {

    const dispatch = useDispatch()

    const {page} = useTypedSelector(state => state.page)

    let pagesList = [page, page + 1, page + 2, page + 3, page + 4].map(el => {
        return (
            <li className='paginationPanel__pageLink'
                key={el}>
                <button onClick={e => onClickPage(e)}>
                    {el}
                </button>
            </li>
        );
    });

    const onClickPage = (e: MouseEvent<HTMLButtonElement>) => {
        dispatch(setPageGlobal(parseInt(e.currentTarget.innerHTML)))
    }

    return (
        <div className="paginationPanel">

            <button  onClick={() => page > 1 ? dispatch(decrement()) : null}>
                <img src={Back} alt=""/>
            </button>


            <ul className="paginationPanel__pagesList">{pagesList}</ul>


            <button className='paginationPanel__nextPageButton'
                    onClick={() => dispatch(increment())}>
                <img src={Next} alt=""/>
            </button>

        </div>
    );
}

export {Pagination};