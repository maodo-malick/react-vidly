import React from 'react';
import TableHeader from'./tableHeader';
import TableBody from'./tableBody';
const table = ({onSort, data,sortColumn,columns}) => {
    
    return (
        <table className="table ">
                      <TableHeader
                      onSort={onSort}
                      sortColumn={sortColumn}
                      columns={columns}/>
                        <TableBody data={data} columns={columns}/>
                    </table>
      );
}
 
export default table;