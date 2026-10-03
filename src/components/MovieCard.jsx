import React from "react";

const MovieCard = ({ movie, onAddWatchList, isInWatchList }) => {
    const { title, director, release_year, genre, rating } = movie;
    return (
        <article className="movie-card">
            <div className="movie-card-topline">
                <span className="genre-tag">{genre}</span>
                <span className="rating" aria-label={`Rating ${rating} out of 10`}>★ {rating}</span>
            </div>
            <h3>{title}</h3>
            <p className="movie-director">Directed by {director}</p>
            <div className="movie-card-footer">
                <span>{release_year}</span>
                <button className="add-button" onClick={() => onAddWatchList(movie)} disabled={isInWatchList}>
                    {isInWatchList ? 'Added ✓' : '+ Watchlist'}
                </button>
            </div>
        </article>
    )
};

export default MovieCard;
