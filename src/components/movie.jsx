import React, {Component} from 'react';
import {getMovies} from '../services/fakeMovieService';
import 'font-awesome/css/font-awesome.css';
import Paginator from './common/paginator';
import List from './common/list'
import { paginate } from '../utils/paginate';
import {getGenres} from '../services/fakeGenreService';
import MovieTable from './movieTable';
import _ from 'lodash';
class Movie extends Component
{
    state = {
        movies:[],
        size: 4,
        currentPage:1,
        genres: [],
        sortColumn: {path:"title", order:"asc"}
    };
    componentDidMount ()
    {
        const genres= [{ _id:"",name:"All genres"},...getGenres()];
        this.setState({movies: getMovies(), genres});
    };
    getPageData=()=>{
        const {currentPage, size ,selectedGenres,
            movies:allMovie,sortColumn}= this.state;

        const filtered = selectedGenres && selectedGenres._id? allMovie.filter(m=>m.genre._id === selectedGenres._id): allMovie
        const sort=  _.orderBy(filtered,[sortColumn.path],[sortColumn.order])
         const movies = paginate(sort, currentPage, size);
         return {totalCount:filtered.length, data:movies};

    }
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
handleGenresSelected = genre => 
{
   this.setState({selectedGenres:genre, currentPage:1});
};
handleSort = sortColumn => {
   
   this.setState({sortColumn});
};

    render()
    {
        const { length : count } = this.state.movies;
        const {currentPage, size ,sortColumn}= this.state;
        if(count === 0) return  <h3>They are no film in to the cinema</h3>;
        const {data:movies,totalCount}=this.getPageData();
        return(
            <React.Fragment>
                <div className="container">
                    <div className="row justify-content-md-center">
                      <div className="col-6 col-sm-3">
                         <List items={this.state.genres} onItemSelected={this.handleGenresSelected} selectedItem={this.state.selectedGenres}/>
                      </div>
                      <div className="col">
                      <h3> showing {totalCount} hot film in to the cinema</h3>
                        <MovieTable onLiked={this.handleLike} 
                        onDelete={this.handleDelete}
                         movies= {movies}
                         onSort={this.handleSort}
                         sortColumn={sortColumn}/>
                      </div>

                    </div>
               
                 <div className="row">
                     <div className="col-6 col-md-10">
                         <Paginator totalItem={totalCount}
                          itemsPerPage={size}
                           onPageChange={this.handlePageChange}
                          currentPage={currentPage}/>
                         </div>    
                 </div>

                </div>
            </React.Fragment>


        )
    }
}
export default Movie;