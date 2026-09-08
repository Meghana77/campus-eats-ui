import "./RestaurantCard.css";

function RestaurantCard(props){
    return (
        <div className="restaurant-card">
            <img src={props.image} alt={props.name} />
            <h3>{props.name}</h3>
            <p>{props.rating}</p>
            <p>{props.time}</p>
            <p>{props.cuisine}</p>
        </div>
    );
}

export default RestaurantCard;
