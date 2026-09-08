import RestaurantCard from "./RestaurantCard";

function RestaurantContainer(){
const restaurants = [
  {
    id: 1,
    name: "Paradise",
    cuisine: "Biryani, North Indian",
    rating: 4.3,
    deliveryTime: "30-35 mins",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    name: "Mehfil",
    cuisine: "Biryani, Mughlai",
    rating: 4.2,
    deliveryTime: "25-30 mins",
    image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    name: "Bawarchi",
    cuisine: "Biryani, Indian",
    rating: 4.4,
    deliveryTime: "30-35 mins",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    name: "Domino's Pizza",
    cuisine: "Pizza, Fast Food",
    rating: 4.1,
    deliveryTime: "20-25 mins",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 5,
    name: "Subway",
    cuisine: "Sandwiches, Healthy Food",
    rating: 4.0,
    deliveryTime: "20-25 mins",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 6,
    name: "Chutneys",
    cuisine: "South Indian, Chinese",
    rating: 4.3,
    deliveryTime: "25-30 mins",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
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