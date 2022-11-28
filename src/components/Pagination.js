import React from 'react'

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    console.log("in pagination " + postsPerPage + " " + totalPosts)
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className="flex gap-2 ">
                {
                    pageNumbers.map(number => (
                        <li key={number} className="float-left">
                            <a onClick={() => paginate(number)} href="#" className="hover:border-sky-600 border-2 px-3 py-1 ">
                                {number}
                            </a>

                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Pagination