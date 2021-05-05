import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Paginator = props => {
    const {totalItem, itemsPerPage,currentPage, onPageChange} = props;
    const pagesCount = Math.ceil(totalItem / itemsPerPage);
    if (pagesCount === 1) return null; //
    const pages = _.range(1, pagesCount +1);
    return ( 
    <nav aria-label="..." style={{float: "right"}}>
    <ul className="pagination pagination-lg" >
        {pages.map(page=>(
             <li className={currentPage === page ? "page-item active":"page-item"}key={page} onClick={()=> onPageChange(page)} >
             <a className="page-link" >{page}</a>
             </li>
        ))}
   
    
    </ul>
    </nav>
     );
};
Paginator.propTypes = 
{
    totalItem: PropTypes.number.isRequired, 
    itemsPerPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};
  
 
export default Paginator;