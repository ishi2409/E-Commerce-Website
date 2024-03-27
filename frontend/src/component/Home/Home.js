import React, { Fragment, useEffect } from "react";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { clearErrors } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import Carousel from "react-bootstrap/Carousel";
import style from "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  // let { loading, error } = useSelector((state) => state.products);
  let { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />
          <MetaData title="ECOMMERCE" />
          <div className="carouselDiv">
            <Carousel data-bs-theme="dark" style={{height:'33rem'}}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://img.freepik.com/free-photo/cute-woman-with-red-lipstick-looks-into-camera-poses-with-white-big-bags-after-good-shopping_197531-17594.jpg"
                  alt="First slide"
                  style={{height:'33rem'}}
                />
                <Carousel.Caption style={{fontWeight:'600'}}>
                  <h5>First slide label</h5>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://img.freepik.com/free-photo/portrait-happy-lady-sunglasses-standing-with-colorful-shopping-bags-hands-pink-background-young-woman-standing-white-shirt-denim-shorts_574295-1182.jpg"
                  alt="Second slide"
                  style={{height:'33rem'}}
                />
                <Carousel.Caption style={{fontWeight:'600'}}>
                  <h5>Second slide label</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://img.freepik.com/premium-photo/portrait-her-she-nice-attractive-cheerful-cheery-girl-carrying-new-clothing-things-spending-holiday-isolated-bright-vivid-shine-vibrant-green-blue-turquoise-color-wall_274222-15637.jpg"
                  alt="Third slide"
                  style={{height:'33rem'}}
                />
                <Carousel.Caption style={{fontWeight:'600'}}>
                  <h5>Third slide label</h5>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          {/* <div className="banner"> */}
          {/* <p>Welcome to <span>Ecommerce</span></p>
        <h1><span>F</span>IND AMAZING PRODUCTS BELOW</h1>
        <a href="#container">
          <button>
            Scroll
          </button>
        </a> */}
          {/* </div> */}

          <h2 className="homeHeading" id="container">
            LATEST PRODUCTS
          </h2>
          <div className="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
