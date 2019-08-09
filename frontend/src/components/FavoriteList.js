import React, { Component } from 'react'
import {Link} from "react-router-dom";
function sortFunction(a,b){
    var dateA = new Date(a.date).getTime();
    var dateB = new Date(b.date).getTime();
    return dateA < dateB ? 1 : -1;
};
export class FavoriteList extends Component {

    render() {
        function deleteFavorite(data, props) {
            console.log("props",props)
            let test = props.favorite.find(prog => prog.program === data._id)
            console.log("test", )
            fetch('https://jobappexam.herokuapp.com/api/favorite/delete', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({_id:test._id})
            })
        }
        if(this.props.favorite <=0) {
            return <p>Loading ...</p>
        } else {

            let favoriteList = this.props.favorite;
            let programList = this.props.programs;
            const items = favoriteList.map((item, key) =>
                programList.find(fav => fav._id === item.program)
            );
            items.sort(function(a,b){
                return new Date(a.next) - new Date(b.next)
            })
            console.log("favs", items)
            //programList.find(fav => fav._id === x)
            console.log(items);
            console.log(this.props);
            return (
                <div>
                    <h1>Your movie schedule:</h1>
                    <ul>
                    {items.map((favorite, key) =>
                        <li>{favorite.title} | Next on air: {favorite.next} | <button  onClick={() => deleteFavorite({_id: favorite._id}, this.props)}>remove</button></li>
                    )}
                    </ul>
                </div>
            )
        }
    }
}

export default FavoriteList