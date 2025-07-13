import "../styles/List.scss";
import { useSelector } from "react-redux";
import Navbar from "../components/navbar";
import ListingCard from "../components/ListingCard";
 import Footer from "../components/Footer"

const WishList = () => {
  const wishList = useSelector((state) => state.user.wishList);

  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Wish List</h1>
      <div className="list">
        {wishList?.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
            city,
            state,
            pincode,
            category,
            // type,
            // price,
            booking = false,
          }) => (
            <ListingCard
              listingId={_id}
              creator={creator}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              state={state}
              pincode={pincode}
              category={category}
            //   type={type}
            //   price={price}
              booking={booking}
            />
          )
        )}
      </div>
      <Footer />
    </>
  );
};

export default WishList;