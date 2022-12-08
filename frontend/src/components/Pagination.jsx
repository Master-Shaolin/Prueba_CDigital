import React from 'react';

function Pagination({ productsPerPage, totalProducts, currentPage, paginate}) {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    const onPaginate = (e,number) => {
        e.preventDefault();
        paginate(number);
        setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight);
        }, 10);
    }

    return (
        <nav id='shopPagination'>
            <ul className='pagination'>
                { pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <button onClick={(e) => onPaginate(e,number)} href="" className={`page-link btn btn-link ${number !== currentPage ? "" : "active" }`} >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination