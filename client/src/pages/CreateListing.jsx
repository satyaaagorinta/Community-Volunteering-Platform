import "../styles/CreateListing.scss";
import Navbar from "../components/navbar";
//import { categories, types, facilities } from "../Data";
import { categories, facilities } from "../Data";

//import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
//import variables from "../styles/variables.scss";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { IoIosImages } from "react-icons/io";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
 import Footer from "../components/Footer"

const CreateListing = () => {
  const [category, setCategory] = useState("");
  //   const [type, setType] = useState("");

  /* LOCATION */
  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };

  /* BASIC COUNTS */
  //   const [guestCount, setGuestCount] = useState(1);
  //   const [bedroomCount, setBedroomCount] = useState(1);
  //   const [bedCount, setBedCount] = useState(1);
  //   const [bathroomCount, setBathroomCount] = useState(1);

  /* AMENITIES */
  const [amenities, setAmenities] = useState([]);

  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities((prevAmenities) =>
        prevAmenities.filter((option) => option !== facility)
      );
    } else {
      setAmenities((prev) => [...prev, facility]);
    }
  };

  /* UPLOAD, DRAG & DROP, REMOVE PHOTOS */
  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  /* DESCRIPTION */
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    // price: 0,
  });

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };

  // const creatorId = useSelector((state) => state.user._id);   // problem here

  const creatorId = "67f6dff5f55ee6419bd35f77"; // hardcoded for testing

  // const  token  = useSelector((state) => state.user.token);
  // console.log("Token in frontend:", token); // Debug token value

  const token = "67f6dff5f55ee6419bd35f77";

  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      /* Create a new FormData onject to handle file uploads */
      const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      listingForm.append("category", category);
      //   listingForm.append("type", type);
      listingForm.append("streetAddress", formLocation.streetAddress);
      listingForm.append("aptSuite", formLocation.aptSuite);
      listingForm.append("city", formLocation.city);
      listingForm.append("state", formLocation.state);
      listingForm.append("pincode", formLocation.pincode);
      //   listingForm.append("guestCount", guestCount);
      //   listingForm.append("bedroomCount", bedroomCount);
      //   listingForm.append("bedCount", bedCount);
      //   listingForm.append("bathroomCount", bathroomCount);
      listingForm.append("amenities", amenities);
      listingForm.append("title", formDescription.title);
      listingForm.append("description", formDescription.description);
      listingForm.append("highlight", formDescription.highlight);
      listingForm.append("highlightDesc", formDescription.highlightDesc);
      //   listingForm.append("price", formDescription.price);

      /* Append each selected photos to the FormData object */
      photos.forEach((photo) => {
        listingForm.append("listingPhotos", photo);
      });
      /* Retrieve token from localStorage or Redux */
      // const token = localStorage.getItem("authToken"); // Replace with Redux if needed
      // const token = useSelector((state) => state.user.token);

      /* Send a POST request to the server */
      const response = await fetch("http://localhost:3001/properties/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Add the Authorization header
        },
        body: listingForm,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      /* Navigate to home page on success */
      navigate("/");
    } catch (err) {
      console.error("Publish Listing failed:", err.message);
      alert("Failed to create listing. Please try again.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="create-listing">
        <div className="caption_bg">
      <div class="masking-container">
        <h1 class="masked-text">Create a profile for your Event/Organization.</h1>
        </div>
        </div>
        <form onSubmit={handlePost}>
          <div className="create-listing_step1">
            <h2>Step 1: Tell us about yourself</h2>
            <hr />
            <h3>Which category is best suited to your profile?</h3>
            <div className="category-list">
              {categories?.map((item, index) => (
                <div
                  className={`category ${
                    category === item.label ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => {
                    setCategory(item.label);
                    console.log("Selected Category:", category);
                  }}
                >
                  <div className="category_icon">{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>

            {/* <h3>What type of place will guests have?</h3>
            <div className="type-list">
              {types?.map((item, index) => (
                <div
                  className={`type ${type === item.name ? "selected" : ""}`}
                  key={index}
                  onClick={() => setType(item.name)}
                >
                  <div className="type_text">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="type_icon">{item.icon}</div>
                </div>
              ))}
            </div> */}

            <h3>Location of the Event/Organization</h3>
            <div className="full">
              <div className="location">
                <p>Street Address,Locality</p>
                <input
                  type="text"
                  placeholder="Address Line 1"
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Apartment,landmark(if applicable)</p>
                <input
                  type="text"
                  placeholder="Address Line 2"
                  name="aptSuite"
                  value={formLocation.aptSuite}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>City</p>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formLocation.city}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>State</p>
                <input
                  type="text"
                  placeholder="State"
                  name="state"
                  value={formLocation.state}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>Pincode</p>
                <input
                  type="text"
                  placeholder="Pincode"
                  name="pincode"
                  value={formLocation.pincode}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            {/* <h3>Share some basics about your place</h3>
            <div className="basics">
              <div className="basic">
                <p>Guests</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      guestCount > 1 && setGuestCount(guestCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{guestCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setGuestCount(guestCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Bedrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{bedroomCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBedroomCount(bedroomCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Beds</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      bedCount > 1 && setBedCount(bedCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{bedCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBedCount(bedCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Bathrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{bathroomCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBathroomCount(bathroomCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>
            </div> */}
          </div>

          <div className="create-listing_step2">
            <h2>Step 2: Tell us about your Goals</h2>
            <hr />

            <h3>Select Keywords which best describe your purpose</h3>
            <div className="amenities">
              {facilities?.map((item, index) => (
                <div
                  className={`facility ${
                    amenities.includes(item.name) ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => handleSelectAmenities(item.name)}
                >
                  <div className="facility_icon">{item.icon}</div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>

            <h3>
              Add some Pictures.If it is an organization,add pictures of the
              infrastructure,team ,etc. If it is an event,add the poster as
              well.
            </h3>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="photos"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 && (
                      <>
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="alone">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}

                    {photos.length >= 1 && (
                      <>
                        {photos.map((photo, index) => {
                          return (
                            <Draggable
                              key={index}
                              draggableId={index.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="photo"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <img
                                    src={URL.createObjectURL(photo)}
                                    alt="place"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemovePhoto(index)}
                                  >
                                    <BiTrash />
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="together">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <h3>Name and About</h3>
            <h5>This will be visible of your profile </h5>
            <div className="description">
              <p>Name</p>
              <input
                type="text"
                placeholder="Name"
                name="title"
                value={formDescription.title}
                onChange={handleChangeDescription}
                required
              />
              <p>Description</p>
              <textarea
                type="text"
                placeholder="Description"
                name="description"
                value={formDescription.description}
                onChange={handleChangeDescription}
                required
              />
              <p>Goals</p>
              <input
                type="text"
                placeholder="Goals"
                name="highlight"
                value={formDescription.highlight}
                onChange={handleChangeDescription}
                required
              />
              <p>Website Link/Social Media Page Link</p>
              <textarea
                type="text"
                placeholder="Website Link/Social Media Page Link"
                name="highlightDesc"
                value={formDescription.highlightDesc}
                onChange={handleChangeDescription}
                required
              />
              {/* <p>Now, set your PRICE</p>
              <span>$</span> */}
              {/* <input
                type="number"
                placeholder="100"
                name="price"
                value={formDescription.price}
                onChange={handleChangeDescription}
                className="price"
                required
              /> */}
            </div>
          </div>

          <button className="submit_btn" type="submit">
            CREATE
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default CreateListing;

// END OF FIRST TRY
// import "../styles/CreateListing.scss";
// import Navbar from "../components/navbar";
// import { categories, types, facilities } from "../Data";
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
// import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
// import variables from "../styles/variables.scss";
// // import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// import { IoIosImages } from "react-icons/io";
// import { useState } from "react";
// import { BiTrash } from "react-icons/bi";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// // import Footer from "../components/Footer"

// const CreateListing = () => {
//   const [category, setCategory] = useState("");
//   const [type, setType] = useState("");

//   /* LOCATION */
//   const [formLocation, setFormLocation] = useState({
//     streetAddress: "",
//     aptSuite: "",
//     city: "",
//     province: "",
//     country: "",
//   });

//   const handleChangeLocation = (e) => {
//     const { name, value } = e.target;
//     setFormLocation({
//       ...formLocation,
//       [name]: value,
//     });
//   };

//   /* BASIC COUNTS */
//   const [guestCount, setGuestCount] = useState(1);
//   const [bedroomCount, setBedroomCount] = useState(1);
//   const [bedCount, setBedCount] = useState(1);
//   const [bathroomCount, setBathroomCount] = useState(1);

//   /* AMENITIES */
//   const [amenities, setAmenities] = useState([]);

//   const handleSelectAmenities = (facility) => {
//     if (amenities.includes(facility)) {
//       setAmenities((prevAmenities) =>
//         prevAmenities.filter((option) => option !== facility)
//       );
//     } else {
//       setAmenities((prev) => [...prev, facility]);
//     }
//   };

//   /* UPLOAD, DRAG & DROP, REMOVE PHOTOS */
//   const [photos, setPhotos] = useState([]);

//   const handleUploadPhotos = (e) => {
//     const newPhotos = e.target.files;
//     setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
//   };

//   const handleDragPhoto = (result) => {
//     if (!result.destination) return;

//     const items = Array.from(photos);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     setPhotos(items);
//   };

//   const handleRemovePhoto = (indexToRemove) => {
//     setPhotos((prevPhotos) =>
//       prevPhotos.filter((_, index) => index !== indexToRemove)
//     );
//   };

//   /* DESCRIPTION */
//   const [formDescription, setFormDescription] = useState({
//     title: "",
//     description: "",
//     highlight: "",
//     highlightDesc: "",
//     price: 0,
//   });

//   const handleChangeDescription = (e) => {
//     const { name, value } = e.target;
//     setFormDescription({
//       ...formDescription,
//       [name]: value,
//     });
//   };
// //made a change here at 4.40 am
//   const creatorId = useSelector((state) => state.user?.user?._id);

//   const navigate = useNavigate();

//   const handlePost = async (e) => {
//     e.preventDefault();

//     try {
//       /* Create a new FormData onject to handle file uploads */
//       const listingForm = new FormData();
//       listingForm.append("creator", creatorId);
//       listingForm.append("category", category);
//       listingForm.append("type", type);
//       listingForm.append("streetAddress", formLocation.streetAddress);
//       listingForm.append("aptSuite", formLocation.aptSuite);
//       listingForm.append("city", formLocation.city);
//       listingForm.append("province", formLocation.province);
//       listingForm.append("country", formLocation.country);
//       listingForm.append("guestCount", guestCount);
//       listingForm.append("bedroomCount", bedroomCount);
//       listingForm.append("bedCount", bedCount);
//       listingForm.append("bathroomCount", bathroomCount);
//       listingForm.append("amenities", amenities);
//       listingForm.append("title", formDescription.title);
//       listingForm.append("description", formDescription.description);
//       listingForm.append("highlight", formDescription.highlight);
//       listingForm.append("highlightDesc", formDescription.highlightDesc);
//       listingForm.append("price", formDescription.price);

//       /* Append each selected photos to the FormData object */
//       photos.forEach((photo) => {
//         listingForm.append("listingPhotos", photo);
//       });

//       /* Send a POST request to server */
//       const response = await fetch("http://localhost:3001/properties/create", {
//         method: "POST",
//         body: listingForm,
//       });

//       if (response.ok) {
//         navigate("/");
//       }
//     } catch (err) {
//       console.log("Publish Listing failed", err.message);
//     }
//   };
//   return (
//     <>
//       <Navbar />

//       <div className="create-listing">
//         <h1>Publish Your Place</h1>
//         <form onSubmit={handlePost}>
//           <div className="create-listing_step1">
//             <h2>Step 1: Tell us about your place</h2>
//             <hr />
//             <h3>Which of these categories best describes your place?</h3>
//             <div className="category-list">
//               {categories?.map((item, index) => (
//                 <div
//                   className={`category ${
//                     category === item.label ? "selected" : ""
//                   }`}
//                   key={index}
//                   onClick={() => setCategory(item.label)}
//                 >
//                   <div className="category_icon">{item.icon}</div>
//                   <p>{item.label}</p>
//                 </div>
//               ))}
//             </div>

//             <h3>What type of place will guests have?</h3>
//             <div className="type-list">
//               {types?.map((item, index) => (
//                 <div
//                   className={`type ${type === item.name ? "selected" : ""}`}
//                   key={index}
//                   onClick={() => setType(item.name)}
//                 >
//                   <div className="type_text">
//                     <h4>{item.name}</h4>
//                     <p>{item.description}</p>
//                   </div>
//                   <div className="type_icon">{item.icon}</div>
//                 </div>
//               ))}
//             </div>

//             <h3>Where's your place located?</h3>
//             <div className="full">
//               <div className="location">
//                 <p>Street Address</p>
//                 <input
//                   type="text"
//                   placeholder="Street Address"
//                   name="streetAddress"
//                   value={formLocation.streetAddress}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="half">
//               <div className="location">
//                 <p>Apartment, Suite, etc. (if applicable)</p>
//                 <input
//                   type="text"
//                   placeholder="Apt, Suite, etc. (if applicable)"
//                   name="aptSuite"
//                   value={formLocation.aptSuite}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//               <div className="location">
//                 <p>City</p>
//                 <input
//                   type="text"
//                   placeholder="City"
//                   name="city"
//                   value={formLocation.city}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="half">
//               <div className="location">
//                 <p>Province</p>
//                 <input
//                   type="text"
//                   placeholder="Province"
//                   name="province"
//                   value={formLocation.province}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//               <div className="location">
//                 <p>Country</p>
//                 <input
//                   type="text"
//                   placeholder="Country"
//                   name="country"
//                   value={formLocation.country}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//             </div>

//             <h3>Share some basics about your place</h3>
//             <div className="basics">
//               <div className="basic">
//                 <p>Guests</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       guestCount > 1 && setGuestCount(guestCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{guestCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setGuestCount(guestCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="basic">
//                 <p>Bedrooms</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{bedroomCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setBedroomCount(bedroomCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="basic">
//                 <p>Beds</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       bedCount > 1 && setBedCount(bedCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{bedCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setBedCount(bedCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="basic">
//                 <p>Bathrooms</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{bathroomCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setBathroomCount(bathroomCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="create-listing_step2">
//             <h2>Step 2: Make your place stand out</h2>
//             <hr />

//             <h3>Tell guests what your place has to offer</h3>
//             <div className="amenities">
//               {facilities?.map((item, index) => (
//                 <div
//                   className={`facility ${
//                     amenities.includes(item.name) ? "selected" : ""
//                   }`}
//                   key={index}
//                   onClick={() => handleSelectAmenities(item.name)}
//                 >
//                   <div className="facility_icon">{item.icon}</div>
//                   <p>{item.name}</p>
//                 </div>
//               ))}
//             </div>

//             <h3>Add some photos of your place</h3>
//             <DragDropContext onDragEnd={handleDragPhoto}>
//               <Droppable droppableId="photos" direction="horizontal">
//                 {(provided) => (
//                   <div
//                     className="photos"
//                     {...provided.droppableProps}
//                     ref={provided.innerRef}
//                   >
//                     {photos.length < 1 && (
//                       <>
//                         <input
//                           id="image"
//                           type="file"
//                           style={{ display: "none" }}
//                           accept="image/*"
//                           onChange={handleUploadPhotos}
//                           multiple
//                         />
//                         <label htmlFor="image" className="alone">
//                           <div className="icon">
//                             <IoIosImages />
//                           </div>
//                           <p>Upload from your device</p>
//                         </label>
//                       </>
//                     )}

//                     {photos.length >= 1 && (
//                       <>
//                         {photos.map((photo, index) => {
//                           return (
//                             <Draggable
//                               key={index}
//                               draggableId={index.toString()}
//                               index={index}
//                             >
//                               {(provided) => (
//                                 <div
//                                   className="photo"
//                                   ref={provided.innerRef}
//                                   {...provided.draggableProps}
//                                   {...provided.dragHandleProps}
//                                 >
//                                   <img
//                                     src={URL.createObjectURL(photo)}
//                                     alt="place"
//                                   />
//                                   <button
//                                     type="button"
//                                     onClick={() => handleRemovePhoto(index)}
//                                   >
//                                     <BiTrash />
//                                   </button>
//                                 </div>
//                               )}
//                             </Draggable>
//                           );
//                         })}
//                         <input
//                           id="image"
//                           type="file"
//                           style={{ display: "none" }}
//                           accept="image/*"
//                           onChange={handleUploadPhotos}
//                           multiple
//                         />
//                         <label htmlFor="image" className="together">
//                           <div className="icon">
//                             <IoIosImages />
//                           </div>
//                           <p>Upload from your device</p>
//                         </label>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </Droppable>
//             </DragDropContext>

//             <h3>What make your place attractive and exciting?</h3>
//             <div className="description">
//               <p>Title</p>
//               <input
//                 type="text"
//                 placeholder="Title"
//                 name="title"
//                 value={formDescription.title}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Description</p>
//               <textarea
//                 type="text"
//                 placeholder="Description"
//                 name="description"
//                 value={formDescription.description}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Highlight</p>
//               <input
//                 type="text"
//                 placeholder="Highlight"
//                 name="highlight"
//                 value={formDescription.highlight}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Highlight details</p>
//               <textarea
//                 type="text"
//                 placeholder="Highlight details"
//                 name="highlightDesc"
//                 value={formDescription.highlightDesc}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Now, set your PRICE</p>
//               <span>$</span>
//               <input
//                 type="number"
//                 placeholder="100"
//                 name="price"
//                 value={formDescription.price}
//                 onChange={handleChangeDescription}
//                 className="price"
//                 required
//               />
//             </div>
//           </div>

//           <button className="submit_btn" type="submit">
//             CREATE YOUR LISTING
//           </button>
//         </form>
//       </div>

//       {/* <Footer /> */}
//     </>
//   );
// };

// export default CreateListing;
// END OF ANOTHER TRYYYYYYYYYYYYYYYYYYYYYYYYY

// import "../styles/CreateListing.scss";
// import Navbar from "../components/navbar";
// import { categories, types, facilities } from "../Data";
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
// import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
// import variables from "../styles/variables.scss";
// // import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import { IoIosImages } from "react-icons/io";
// import { useState } from "react";
// import { BiTrash } from "react-icons/bi";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// // import Footer from "../components/Footer"

// const CreateListing = () => {
//   const [category, setCategory] = useState("");
//   const [type, setType] = useState("");

//   /* LOCATION */
//   const [formLocation, setFormLocation] = useState({
//     streetAddress: "",
//     aptSuite: "",
//     city: "",
//     province: "",
//     country: "",
//   });

//   const handleChangeLocation = (e) => {
//     const { name, value } = e.target;
//     setFormLocation({
//       ...formLocation,
//       [name]: value,
//     });
//   };

//   /* BASIC COUNTS */
//   const [guestCount, setGuestCount] = useState(1);
//   const [bedroomCount, setBedroomCount] = useState(1);
//   const [bedCount, setBedCount] = useState(1);
//   const [bathroomCount, setBathroomCount] = useState(1);

//   /* AMENITIES */
//   const [amenities, setAmenities] = useState([]);

//   const handleSelectAmenities = (facility) => {
//     if (amenities.includes(facility)) {
//       setAmenities((prevAmenities) =>
//         prevAmenities.filter((option) => option !== facility)
//       );
//     } else {
//       setAmenities((prev) => [...prev, facility]);
//     }
//   };

//   /* UPLOAD, DRAG & DROP, REMOVE PHOTOS */
//   const [photos, setPhotos] = useState([]);

//   const handleUploadPhotos = (e) => {
//     const newPhotos = e.target.files;
//     setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
//   };

//   const handleDragPhoto = (result) => {
//     if (!result.destination) return;

//     const items = Array.from(photos);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     setPhotos(items);
//   };

//   const handleRemovePhoto = (indexToRemove) => {
//     setPhotos((prevPhotos) =>
//       prevPhotos.filter((_, index) => index !== indexToRemove)
//     );
//   };

//   /* DESCRIPTION */
//   const [formDescription, setFormDescription] = useState({
//     title: "",
//     description: "",
//     highlight: "",
//     highlightDesc: "",
//     price: 0,
//   });

//   const handleChangeDescription = (e) => {
//     const { name, value } = e.target;
//     setFormDescription({
//       ...formDescription,
//       [name]: value,
//     });
//   };
//   //made a change here at 4.40 am
//   const creatorId = useSelector((state) => state.user?.user?._id);

//   const navigate = useNavigate();

//   const handlePost = async (e) => {
//     e.preventDefault();

//     try {
//       /* Create a new FormData object to handle file uploads */
//       const listingForm = new FormData();
//       listingForm.append("creator", creatorId);
//       listingForm.append("category", category);
//       listingForm.append("type", type);
//       listingForm.append("streetAddress", formLocation.streetAddress);
//       listingForm.append("aptSuite", formLocation.aptSuite);
//       listingForm.append("city", formLocation.city);
//       listingForm.append("province", formLocation.province);
//       listingForm.append("country", formLocation.country);
//       listingForm.append("guestCount", guestCount);
//       listingForm.append("bedroomCount", bedroomCount);
//       listingForm.append("bedCount", bedCount);
//       listingForm.append("bathroomCount", bathroomCount);
//       listingForm.append("amenities", amenities);
//       listingForm.append("title", formDescription.title);
//       listingForm.append("description", formDescription.description);
//       listingForm.append("highlight", formDescription.highlight);
//       listingForm.append("highlightDesc", formDescription.highlightDesc);
//       listingForm.append("price", formDescription.price);

//       /* Append each selected photos to the FormData object */
//       photos.forEach((photo) => {
//         listingForm.append("listingPhotos", photo);
//       });

//       const token = localStorage.getItem('token'); // Or from Redux

//       const response = await fetch("http://localhost:3001/properties/create", {
//         method: "POST",
//         headers: {
//           'Authorization': `Bearer ${token}`
//         },
//         body: listingForm
//       });

//       if (response.status === 401) {
//         const errorData = await response.json();

//         // Clear token
//         localStorage.removeItem('token');

//         // Alert user
//         alert("Your session has expired. Please log in again.");

//         // Redirect to login page
//         window.location.href = '/login';
//         return;
//       }

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to create listing");
//       }

//       const data = await response.json();
//       console.log("Listing created successfully:", data);

//       // Redirect to home page
//       navigate("/");

//     } catch (error) {
//       console.error("Error creating listing:", error.message);
//       alert("Error: " + error.message);
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="create-listing">
//         <h1>Publish Your Place</h1>
//         <form onSubmit={handlePost}>
//           <div className="create-listing_step1">
//             <h2>Step 1: Tell us about your place</h2>
//             <hr />
//             <h3>Which of these categories best describes your place?</h3>
//             <div className="category-list">
//               {categories?.map((item, index) => (
//                 <div
//                   className={`category ${
//                     category === item.label ? "selected" : ""
//                   }`}
//                   key={index}
//                   onClick={() => setCategory(item.label)}
//                 >
//                   <div className="category_icon">{item.icon}</div>
//                   <p>{item.label}</p>
//                 </div>
//               ))}
//             </div>
//             <h3>What type of place will guests have?</h3>
//             <div className="type-list">
//               {types?.map((item, index) => (
//                 <div
//                   className={`type ${type === item.name ? "selected" : ""}`}
//                   key={index}
//                   onClick={() => setType(item.name)}
//                 >
//                   <div className="type_text">
//                     <h4>{item.name}</h4>
//                     <p>{item.description}</p>
//                   </div>
//                   <div className="type_icon">{item.icon}</div>
//                 </div>
//               ))}
//             </div>

//             <h3>Where's your place located?</h3>
//             <div className="full">
//               <div className="location">
//                 <p>Street Address</p>
//                 <input
//                   type="text"
//                   placeholder="Street Address"
//                   name="streetAddress"
//                   value={formLocation.streetAddress}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="half">
//               <div className="location">
//                 <p>Apartment, Suite, etc. (if applicable)</p>
//                 <input
//                   type="text"
//                   placeholder="Apt, Suite, etc. (if applicable)"
//                   name="aptSuite"
//                   value={formLocation.aptSuite}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//               <div className="location">
//                 <p>City</p>
//                 <input
//                   type="text"
//                   placeholder="City"
//                   name="city"
//                   value={formLocation.city}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="half">
//               <div className="location">
//                 <p>Province</p>
//                 <input
//                   type="text"
//                   placeholder="Province"
//                   name="province"
//                   value={formLocation.province}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//               <div className="location">
//                 <p>Country</p>
//                 <input
//                   type="text"
//                   placeholder="Country"
//                   name="country"
//                   value={formLocation.country}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//             </div>

//             <h3>Share some basics about your place</h3>
//             <div className="basics">
//               <div className="basic">
//                 <p>Guests</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       guestCount > 1 && setGuestCount(guestCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{guestCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setGuestCount(guestCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="basic">
//                 <p>Bedrooms</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{bedroomCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setBedroomCount(bedroomCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>
//               <div className="basic">
//                 <p>Beds</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       bedCount > 1 && setBedCount(bedCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{bedCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setBedCount(bedCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="basic">
//                 <p>Bathrooms</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{bathroomCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setBathroomCount(bathroomCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="create-listing_step2">
//             <h2>Step 2: Make your place stand out</h2>
//             <hr />

//             <h3>Tell guests what your place has to offer</h3>
//             <div className="amenities">
//               {facilities?.map((item, index) => (
//                 <div
//                   className={`facility ${
//                     amenities.includes(item.name) ? "selected" : ""
//                   }`}
//                   key={index}
//                   onClick={() => handleSelectAmenities(item.name)}
//                 >
//                   <div className="facility_icon">{item.icon}</div>
//                   <p>{item.name}</p>
//                 </div>
//               ))}
//             </div>

//             <h3>Add some photos of your place</h3>
//             <DragDropContext onDragEnd={handleDragPhoto}>
//               <Droppable droppableId="photos" direction="horizontal">
//                 {(provided) => (
//                   <div
//                     className="photos"
//                     {...provided.droppableProps}
//                     ref={provided.innerRef}
//                   >
//                     {photos.length < 1 && (
//                       <>
//                         <input
//                           id="image"
//                           type="file"
//                           style={{ display: "none" }}
//                           accept="image/*"
//                           onChange={handleUploadPhotos}
//                           multiple
//                         />
//                         <label htmlFor="image" className="alone">
//                           <div className="icon">
//                             <IoIosImages />
//                           </div>
//                           <p>Upload from your device</p>
//                         </label>
//                       </>
//                     )}

//                     {photos.length >= 1 && (
//                       <>
//                         {photos.map((photo, index) => {
//                           return (
//                             <Draggable
//                               key={index}
//                               draggableId={index.toString()}
//                               index={index}
//                             >
//                               {(provided) => (
//                                 <div
//                                   className="photo"
//                                   ref={provided.innerRef}
//                                   {...provided.draggableProps}
//                                   {...provided.dragHandleProps}
//                                 >
//                                   <img
//                                     src={URL.createObjectURL(photo)}
//                                     alt="place"
//                                   />
//                                   <button
//                                     type="button"
//                                     onClick={() => handleRemovePhoto(index)}
//                                   >
//                                     <BiTrash />
//                                   </button>
//                                 </div>
//                               )}
//                             </Draggable>
//                           );
//                         })}
//                         <input
//                           id="image"
//                           type="file"
//                           style={{ display: "none" }}
//                           accept="image/*"
//                           onChange={handleUploadPhotos}
//                           multiple
//                         />
//                         <label htmlFor="image" className="together">
//                           <div className="icon">
//                             <IoIosImages />
//                           </div>
//                           <p>Upload from your device</p>
//                         </label>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </Droppable>
//             </DragDropContext>

//             <h3>What make your place attractive and exciting?</h3>
//             <div className="description">
//               <p>Title</p>
//               <input
//                 type="text"
//                 placeholder="Title"
//                 name="title"
//                 value={formDescription.title}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Description</p>
//               <textarea
//                 type="text"
//                 placeholder="Description"
//                 name="description"
//                 value={formDescription.description}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Highlight</p>
//               <input
//                 type="text"
//                 placeholder="Highlight"
//                 name="highlight"
//                 value={formDescription.highlight}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Highlight details</p>
//               <textarea
//                 type="text"
//                 placeholder="Highlight details"
//                 name="highlightDesc"
//                 value={formDescription.highlightDesc}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Now, set your PRICE</p>
//               <span>$</span>
//               <input
//                 type="number"
//                 placeholder="100"
//                 name="price"
//                 value={formDescription.price}
//                 onChange={handleChangeDescription}
//                 className="price"
//                 required
//               />
//             </div>
//           </div>

//           <button className="submit_btn" type="submit">
//             CREATE YOUR LISTING
//           </button>
//         </form>
//       </div>

//       {/* <Footer /> */}
//     </>
//   );
// };

// export default CreateListing;

// ANOTHERRRRRRRRRRRRRRRRRRRRRR TRYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY

// import "../styles/CreateListing.scss";
// import Navbar from "../components/navbar";
// import { categories, types, facilities } from "../Data";
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
// import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
// import variables from "../styles/variables.scss";
// import { IoIosImages } from "react-icons/io";
// import { useState } from "react";
// import { BiTrash } from "react-icons/bi";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const CreateListing = () => {
//   const [category, setCategory] = useState("");
//   const [type, setType] = useState("");

//   /* LOCATION */
//   const [formLocation, setFormLocation] = useState({
//     streetAddress: "",
//     aptSuite: "",
//     city: "",
//     province: "",
//     country: "",
//   });

//   const handleChangeLocation = (e) => {
//     const { name, value } = e.target;
//     setFormLocation({
//       ...formLocation,
//       [name]: value,
//     });
//   };

//   /* BASIC COUNTS */
//   const [guestCount, setGuestCount] = useState(1);
//   const [bedroomCount, setBedroomCount] = useState(1);
//   const [bedCount, setBedCount] = useState(1);
//   const [bathroomCount, setBathroomCount] = useState(1);

//   /* AMENITIES */
//   const [amenities, setAmenities] = useState([]);

//   const handleSelectAmenities = (facility) => {
//     if (amenities.includes(facility)) {
//       setAmenities((prevAmenities) =>
//         prevAmenities.filter((option) => option !== facility)
//       );
//     } else {
//       setAmenities((prev) => [...prev, facility]);
//     }
//   };

//   /* UPLOAD, DRAG & DROP, REMOVE PHOTOS */
//   const [photos, setPhotos] = useState([]);

//   const handleUploadPhotos = (e) => {
//     const newPhotos = e.target.files;
//     setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
//   };

//   const handleDragPhoto = (result) => {
//     if (!result.destination) return;

//     const items = Array.from(photos);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     setPhotos(items);
//   };

//   const handleRemovePhoto = (indexToRemove) => {
//     setPhotos((prevPhotos) =>
//       prevPhotos.filter((_, index) => index !== indexToRemove)
//     );
//   };

//   /* DESCRIPTION */
//   const [formDescription, setFormDescription] = useState({
//     title: "",
//     description: "",
//     highlight: "",
//     highlightDesc: "",
//     price: 0,
//   });

//   const handleChangeDescription = (e) => {
//     const { name, value } = e.target;
//     setFormDescription({
//       ...formDescription,
//       [name]: value,
//     });
//   };

//   const creatorId = useSelector((state) => state.user?.user?._id);
//   const token = useSelector((state) => state.user?.token);
//   const navigate = useNavigate();

//   const handlePost = async (e) => {
//     e.preventDefault();

//     try {
//       /* Create a new FormData object to handle file uploads */
//       const listingForm = new FormData();
//       listingForm.append("creator", creatorId);
//       listingForm.append("category", category);
//       listingForm.append("type", type);
//       listingForm.append("streetAddress", formLocation.streetAddress);
//       listingForm.append("aptSuite", formLocation.aptSuite);
//       listingForm.append("city", formLocation.city);
//       listingForm.append("province", formLocation.province);
//       listingForm.append("country", formLocation.country);
//       listingForm.append("guestCount", guestCount);
//       listingForm.append("bedroomCount", bedroomCount);
//       listingForm.append("bedCount", bedCount);
//       listingForm.append("bathroomCount", bathroomCount);
//       listingForm.append("amenities", amenities);
//       listingForm.append("title", formDescription.title);
//       listingForm.append("description", formDescription.description);
//       listingForm.append("highlight", formDescription.highlight);
//       listingForm.append("highlightDesc", formDescription.highlightDesc);
//       listingForm.append("price", formDescription.price);

//       /* Append each selected photos to the FormData object */
//       photos.forEach((photo) => {
//         listingForm.append("listingPhotos", photo);
//       });

//       /* Send a POST request to server WITH Authorization header */
//       const response = await fetch("http://localhost:3001/properties/create", {
//         method: "POST",
//         headers: {
//           'Authorization': `Bearer ${token}`
//         },
//         body: listingForm,
//       });

//       if (response.ok) {
//         navigate("/");
//       }
//     } catch (err) {
//       console.log("Publish Listing failed", err.message);
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="create-listing">
//         <h1>Publish Your Place</h1>
//         <form onSubmit={handlePost}>
//           <div className="create-listing_step1">
//             <h2>Step 1: Tell us about your place</h2>
//             <hr />
//             <h3>Which of these categories best describes your place?</h3>
//             <div className="category-list">
//               {categories?.map((item, index) => (
//                 <div
//                   className={`category ${
//                     category === item.label ? "selected" : ""
//                   }`}
//                   key={index}
//                   onClick={() => setCategory(item.label)}
//                 >
//                   <div className="category_icon">{item.icon}</div>
//                   <p>{item.label}</p>
//                 </div>
//               ))}
//             </div>
//             <h3>What type of place will guests have?</h3>
//             <div className="type-list">
//               {types?.map((item, index) => (
//                 <div
//                   className={`type ${type === item.name ? "selected" : ""}`}
//                   key={index}
//                   onClick={() => setType(item.name)}
//                 >
//                   <div className="type_text">
//                     <h4>{item.name}</h4>
//                     <p>{item.description}</p>
//                   </div>
//                   <div className="type_icon">{item.icon}</div>
//                 </div>
//               ))}
//             </div>

//             <h3>Where's your place located?</h3>
//             <div className="full">
//               <div className="location">
//                 <p>Street Address</p>
//                 <input
//                   type="text"
//                   placeholder="Street Address"
//                   name="streetAddress"
//                   value={formLocation.streetAddress}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="half">
//               <div className="location">
//                 <p>Apartment, Suite, etc. (if applicable)</p>
//                 <input
//                   type="text"
//                   placeholder="Apt, Suite, etc. (if applicable)"
//                   name="aptSuite"
//                   value={formLocation.aptSuite}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//               <div className="location">
//                 <p>City</p>
//                 <input
//                   type="text"
//                   placeholder="City"
//                   name="city"
//                   value={formLocation.city}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="half">
//               <div className="location">
//                 <p>Province</p>
//                 <input
//                   type="text"
//                   placeholder="Province"
//                   name="province"
//                   value={formLocation.province}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//               <div className="location">
//                 <p>Country</p>
//                 <input
//                   type="text"
//                   placeholder="Country"
//                   name="country"
//                   value={formLocation.country}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//             </div>

//             <h3>Share some basics about your place</h3>
//             <div className="basics">
//               <div className="basic">
//                 <p>Guests</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       guestCount > 1 && setGuestCount(guestCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{guestCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setGuestCount(guestCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="basic">
//                 <p>Bedrooms</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{bedroomCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setBedroomCount(bedroomCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>
//               <div className="basic">
//                 <p>Beds</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       bedCount > 1 && setBedCount(bedCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{bedCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setBedCount(bedCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="basic">
//                 <p>Bathrooms</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{bathroomCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setBathroomCount(bathroomCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="create-listing_step2">
//             <h2>Step 2: Make your place stand out</h2>
//             <hr />

//             <h3>Tell guests what your place has to offer</h3>
//             <div className="amenities">
//               {facilities?.map((item, index) => (
//                 <div
//                   className={`facility ${
//                     amenities.includes(item.name) ? "selected" : ""
//                   }`}
//                   key={index}
//                   onClick={() => handleSelectAmenities(item.name)}
//                 >
//                   <div className="facility_icon">{item.icon}</div>
//                   <p>{item.name}</p>
//                 </div>
//               ))}
//             </div>

//             <h3>Add some photos of your place</h3>
//             <DragDropContext onDragEnd={handleDragPhoto}>
//               <Droppable droppableId="photos" direction="horizontal">
//                 {(provided) => (
//                   <div
//                     className="photos"
//                     {...provided.droppableProps}
//                     ref={provided.innerRef}
//                   >
//                     {photos.length < 1 && (
//                       <>
//                         <input
//                           id="image"
//                           type="file"
//                           style={{ display: "none" }}
//                           accept="image/*"
//                           onChange={handleUploadPhotos}
//                           multiple
//                         />
//                         <label htmlFor="image" className="alone">
//                           <div className="icon">
//                             <IoIosImages />
//                           </div>
//                           <p>Upload from your device</p>
//                         </label>
//                       </>
//                     )}

//                     {photos.length >= 1 && (
//                       <>
//                         {photos.map((photo, index) => {
//                           return (
//                             <Draggable
//                               key={index}
//                               draggableId={index.toString()}
//                               index={index}
//                             >
//                               {(provided) => (
//                                 <div
//                                   className="photo"
//                                   ref={provided.innerRef}
//                                   {...provided.draggableProps}
//                                   {...provided.dragHandleProps}
//                                 >
//                                   <img
//                                     src={URL.createObjectURL(photo)}
//                                     alt="place"
//                                   />
//                                   <button
//                                     type="button"
//                                     onClick={() => handleRemovePhoto(index)}
//                                   >
//                                     <BiTrash />
//                                   </button>
//                                 </div>
//                               )}
//                             </Draggable>
//                           );
//                         })}
//                         <input
//                           id="image"
//                           type="file"
//                           style={{ display: "none" }}
//                           accept="image/*"
//                           onChange={handleUploadPhotos}
//                           multiple
//                         />
//                         <label htmlFor="image" className="together">
//                           <div className="icon">
//                             <IoIosImages />
//                           </div>
//                           <p>Upload from your device</p>
//                         </label>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </Droppable>
//             </DragDropContext>

//             <h3>What make your place attractive and exciting?</h3>
//             <div className="description">
//               <p>Title</p>
//               <input
//                 type="text"
//                 placeholder="Title"
//                 name="title"
//                 value={formDescription.title}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Description</p>
//               <textarea
//                 type="text"
//                 placeholder="Description"
//                 name="description"
//                 value={formDescription.description}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Highlight</p>
//               <input
//                 type="text"
//                 placeholder="Highlight"
//                 name="highlight"
//                 value={formDescription.highlight}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Highlight details</p>
//               <textarea
//                 type="text"
//                 placeholder="Highlight details"
//                 name="highlightDesc"
//                 value={formDescription.highlightDesc}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Now, set your PRICE</p>
//               <span>$</span>
//               <input
//                 type="number"
//                 placeholder="100"
//                 name="price"
//                 value={formDescription.price}
//                 onChange={handleChangeDescription}
//                 className="price"
//                 required
//               />
//             </div>
//           </div>

//           <button className="submit_btn" type="submit">
//             CREATE YOUR LISTING
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default CreateListing;
