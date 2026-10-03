import React from "react";
const Watchlist = ({ watchlist, onRemoveWatchList }) => {
    return (
        <aside className="watchlist-panel" aria-labelledby="watchlist-title">
            <div className="watchlist-heading">
                <span className="section-kicker">Up next</span>
                <h2 id="watchlist-title">My watchlist</h2>
            </div>
            {watchlist.length === 0 ? (
                <p className="watchlist-empty">Your list is empty. Add a film from the collection to save it for later.</p>
            ) : (
                <ul className="watchlist-list">
                    {watchlist.map((movie) => (
                        <li className="watchlist-item" key={movie.id}>
                            <div>
                                <h3>{movie.title}</h3>
                                <p>{movie.release_year} · {movie.genre}</p>
                            </div>
                            <button className="remove-button" onClick={() => onRemoveWatchList(movie)} aria-label={`Remove ${movie.title} from watchlist`}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </aside>
    );
};

export default Watchlist;
