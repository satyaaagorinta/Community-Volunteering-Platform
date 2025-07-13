import Navbar from "../components/navbar"
  import Slide from "../components/Slide"
 import Categories from "../components/Categories"
 import Listings from "../components/Listings"
 //import Card from '../components/Card'
 import Footer from "../components/Footer"

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Slide />
      {/* <Card/> */}
      <Categories />
      <Listings />
      <Footer />
    </>
  )
}

export default HomePage