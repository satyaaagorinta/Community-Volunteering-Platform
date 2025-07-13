// import { useEffect, useState } from "react";
// import "../styles/List.scss";
// import Loader from "../components/Loader";
// import Navbar from "../components/navbar";
// import { useDispatch, useSelector } from "react-redux";
// import { setTripList } from "../redux/state";
// import ListingCard from "../components/ListingCard";
//import {  useParams } from "react-router-dom";
// // import Footer from "../components/Footer"

// const TripList = () => {
//   const [loading, setLoading] = useState(true);
//   //  const userId = useSelector((state) => state.user._id);
//   const { userId, tripListParam } = useParams();
//   //    const tripList = useSelector((state) => state.user.tripList);
//   const tripList = useSelector((state) => Array.isArray(state.user.tripList) ? state.user.tripList : []);

//   const dispatch = useDispatch();

//   const getTripList = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/users/${userId}/${tripListParam}`,
//         {
//           method: "GET",
//         }
//       );

//       const data = await response.json();
//       const formattedTripList = Array.isArray(data.tripList)
//         ? data.tripList
//         : [];
//       //   dispatch(setTripList(data));
//       dispatch(setTripList(formattedTripList));
//       setLoading(false);
//     } catch (err) {
//       console.log("Fetch sent request failed!", err.message);
//     }
//   };

//   useEffect(() => {
//     getTripList();
//   }, []);

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
//       <h1 className="title-list">Sent Requests</h1>
//       <div className="list">
//         {/* {tripList?.map(({ listingId, hostId, startDate, endDate,  booking=true }) => ( */}
//         {tripList?.map(
//           ({ listingId, hostId, startDate, endDate, booking = true }) => (
//             <ListingCard
//               listingId={listingId._id}
//               creator={hostId._id}
//               listingPhotoPaths={listingId.listingPhotoPaths}
//               city={listingId.city}
//               state={listingId.state}
//               pincode={listingId.pincode}
//               category={listingId.category}
//               startDate={startDate}
//               endDate={endDate}
//               //         totalPrice={totalPrice}
//               booking={booking}
//             />
//           )
//         )}
//       </div>
//       {/* <Footer />  */}
//     </>
//   );
// };

// export default TripList;


import { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import { useParams } from "react-router-dom";

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const { userId, tripListParam } = useParams();

  const tripList = useSelector((state) =>
    Array.isArray(state.user.tripList) ? state.user.tripList : []
  );

  const dispatch = useDispatch();

  const getTripList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/${tripListParam}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) throw new Error("Failed to fetch trip list.");

      const data = await response.json();
      const formattedTripList = Array.isArray(data.tripList)
        ? data.tripList
        : [];

      dispatch(setTripList(formattedTripList));
    } catch (err) {
      console.error("Fetch sent request failed!", err.message);
      dispatch(setTripList([])); // Fallback to empty list on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTripList();
  }, []);


  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Sent Requests</h1>
      <div className="list">
        {Array.isArray(tripList) && tripList.length > 0 ? (
          tripList.map(({ listingId, hostId, startDate, endDate, booking = true }) => (
            <ListingCard
              key={listingId._id}
              listingId={listingId._id}
              creator={hostId._id}
              listingPhotoPaths={listingId.listingPhotoPaths}
              city={listingId.city}
              state={listingId.state}
              pincode={listingId.pincode}
              category={listingId.category}
              startDate={startDate}
              endDate={endDate}
              booking={booking}
            />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No sent requests found.</p>
        )}
      </div>
    </>
  );
};

export default TripList;
