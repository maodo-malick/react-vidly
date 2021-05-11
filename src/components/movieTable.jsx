import React,  {Component}from 'react';
 import Like from './common/like';
import Table from './common/table';
class movieTable extends Component {
   columns=[
       {path: "title", label: "Title"},
       {path: "genre.name", label: "Genre"},
       {path: "numberInStock", label: "Stock"},
       {path: "dailyRentalRate", label: "Rate"},
       {key: "like", content: movie=><Like liked={movie.like} onClick={()=>this.props.onLiked(movie)}/> },
       {key:"delete", content:movie=><button  onClick={()=> this.props.onDelete(movie)} className="btn btn-danger btn-sm">Delete</button>}
   ]
    render() { 
        const { movies,onSort, sortColumn,} = this.props;
        return (
            <Table onSort={onSort} sortColumn={sortColumn} data={movies}columns={this.columns}/>
          );
    }
}
 

 
export default movieTable;