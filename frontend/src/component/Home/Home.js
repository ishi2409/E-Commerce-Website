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
            <Carousel data-bs-theme="dark" style={{height:'calc(10rem + 25vmax)'}}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://img.freepik.com/free-photo/cute-woman-with-red-lipstick-looks-into-camera-poses-with-white-big-bags-after-good-shopping_197531-17594.jpg"
                  alt="First slide"
                  style={{height:'calc(10rem + 25vmax)'}}
                />
                <Carousel.Caption style={{fontWeight:'600'}}>
                  <h5>First slide label</h5>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://img.freepik.com/free-photo/portrait-happy-lady-sunglasses-standing-with-colorful-shopping-bags-hands-pink-background-young-woman-standing-white-shirt-denim-shorts_574295-1182.jpg"
                  alt="Second slide"
                  style={{height:'calc(10rem + 25vmax)'}}
                />
                <Carousel.Caption style={{fontWeight:'600'}}>
                  <h5>Second slide label</h5>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://img.freepik.com/premium-photo/portrait-her-she-nice-attractive-cheerful-cheery-girl-carrying-new-clothing-things-spending-holiday-isolated-bright-vivid-shine-vibrant-green-blue-turquoise-color-wall_274222-15637.jpg"
                  alt="Third slide"
                  style={{height:'calc(10rem + 25vmax)'}}
                />
                <Carousel.Caption style={{fontWeight:'600'}}>
                  <h5>Third slide label</h5>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>

          <div className="homeHeading" id="container">
            LATEST PRODUCTS
          </div>
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
