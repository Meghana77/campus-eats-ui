import RestaurantCard from "./RestaurantCard";

function RestaurantContainer(){
    const restaurants = [
  {
    "id": 1,
    "name": "Paradise",
    "cuisine": "Biryani, North Indian",
    "rating": 4.3,
    "deliveryTime": "30-35 mins"
  },
  {
    "id": 2,
    "name": "Mehfil",
    "cuisine": "Biryani, Mughlai",
    "rating": 4.2,
    "deliveryTime": "25-30 mins"
  },
  {
    "id": 3,
    "name": "Bawarchi",
    "cuisine": "Biryani, Indian",
    "rating": 4.4,
    "deliveryTime": "30-35 mins"
  },
  {
    "id": 4,
    "name": "Domino's Pizza",
    "cuisine": "Pizza, Fast Food",
    "rating": 4.1,
    "deliveryTime": "20-25 mins"
  },
  {
    "id": 5,
    "name": "Subway",
    "cuisine": "Sandwiches, Healthy Food",
    "rating": 4.0,
    "deliveryTime": "20-25 mins"
  },
  {
    "id": 6,
    "name": "Chutneys",
    "cuisine": "South Indian, Chinese",
    "rating": 4.3,
    "deliveryTime": "25-30 mins"
  },
  {
    "id": 7,
    "name": "Shah Ghouse",
    "cuisine": "Biryani, Chinese",
    "rating": 4.2,
    "deliveryTime": "30-40 mins"
  },
  {
    "id": 8,
    "name": "KFC",
    "cuisine": "Burgers, Fast Food",
    "rating": 4.0,
    "deliveryTime": "25-30 mins"
  }
];

    return (
        <div>
            {restaurants.map(function (restaurant){
                return <RestaurantCard name={restaurant.name} rating={restaurant.rating} time={restaurant.deliveryTime} cuisine={restaurant.cuisine} />;
            })
            }
        </div>
    )
}

export default RestaurantContainer;