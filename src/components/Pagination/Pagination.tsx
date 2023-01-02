import React from 'react';
import './Pagination.scss';
import Next from './next.svg';
import Back from './back.svg';


function Pagination() {
    let pagesList = [1, 2, 3, 4, 5].map(el => {
        return (
            <li className='paginationPanel__pageLink'
                key={el}>
                {el}
            </li>
        );
    });
    return (
        <div className="paginationPanel">
            <button ><img src={Back} alt=""/></button>
            <ul className="paginationPanel__pagesList">
                {pagesList}
            </ul>
            <button className='paginationPanel__nextPageButton'>
                <img src={Next} alt=""/>
            </button>
        </div>
    );
}

export {Pagination};