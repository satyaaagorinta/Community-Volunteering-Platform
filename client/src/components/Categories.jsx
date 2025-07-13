import { categories } from "../Data";
import "../styles/Categories.scss"
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="categories">
      <div class="masking-container">
      <h1 class="masked-text">Explore</h1>
      </div>
      <p>
        Find a cause you are passionate about , stay updated on the latest events, connect with leading organizations, and be part of the change!
      </p>

      <div className="categories_list">
        {categories?.slice(0, 7).map((category, index) => (
          <Link to={`/properties/category/${category.label}`}>
            <div className="category" key={index}>
            
            
              <img src={category.img} alt={category.label} />
              <div className="overlay"></div>
              
              <div className="category_text">
                <div className="category_text_icon">{category.icon}</div>
                <p>{category.label}</p>
                </div>
                
              
              
              
            </div>
            

          </Link>
          
        ))}
      </div>
    </div>
  );
};

export default Categories;