import React, {Component} from 'react';
import {getMovies} from '../services/fakeMovieService';
import 'font-awesome/css/font-awesome.css';
import Like from './common/like';
import Paginator from './common/paginator';
import { paginate } from '../utils/paginate';
class Movie extends Component
{
    state = {
        movies: getMovies(),
        size: 4,
        currentPage:1
    };
//  
handleDelete = movie => {
const movies = this.state.movies.filter(m =>m._id !== movie._id);
this.setState({movies});
};
handleLike = (movie)=>
{
    const movies= [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index]={...movies[index]};
    movies[index].like = !movies[index].like;
    this.setState({movies});
};
handlePageChange= page => 
{
this.setState({currentPage: page});
};

    render()
    {
        const { length : count } = this.state.movies;
        const {currentPage, size , movies:allMovie}= this.state;
        if(count === 0) return  <h3>They are no film in to the cinema</h3>;
        const movies = paginate(allMovie, currentPage, size);
        return(
            <React.Fragment>
                <h3> showing {count} hot film in to the cinema</h3>
                <table className="table">
                    <thead>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Stock</th>
                    <th>Rate</th>
                    <th></th>
                    <th></th>
                    </thead>
                    <tbody>
                    {movies.map(movie => (<tr key={movie._id} >
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td><Like liked={movie.like} onClick={()=>this.handleLike(movie)}/> </td>
                            <td><button  onClick={()=> this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                 <div className="row">
                     <div className="col-6 col-md-10">
                         <Paginator totalItem={count} itemsPerPage={size} onPageChange={this.handlePageChange} currentPage={currentPage}/>
                         </div>    
                 </div>
            </React.Fragment>


        )
    }
}
export default Movie;