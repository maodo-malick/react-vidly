import React from 'react';
const List = props => {
  const {items,genreText,genreValue, onItemSelected, selectedItem} = props;
    return <ul className="list-group">
{items.map(item =>(
      <li className={selectedItem == item ?"list-group-item active": "list-group-item"} aria-current="true" key={item[genreValue]}
      onClick={()=> onItemSelected(item)} >{item[genreText]}</li>
))}
    
    </ul>
};
List.defaultProps = {
      genreText : "name",
      genreValue: "_id"

};
 
export default List ;