import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faXmark } from "@fortawesome/free-solid-svg-icons";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "SmartPhones",
];

const Products = () => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [activeCategory, setActiveCategory] = useState("");
  const [width, setWidth] = useState(window.innerWidth);
  const [isOpen, setOpen] = useState(false);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <div className="productContainer">
            <div className={`filterBox ${isOpen ? "showFilterBox" : ""}`}>
              <div className="filterTitleWrapper">
                <div className="sliderTitle">Categories</div>
                {width < 600 && (
                  <div className="crossIcon">
                    <FontAwesomeIcon icon={faXmark} style={{height: 'calc(1.2rem + 0.3vmax)'}} onClick={() => setOpen((prev) => !prev)}/>
                  </div>
                )}
              </div>
              <ul className="categoryBox">
                {categories.map((category) => (
                  <li
                    className={`category-link ${
                      category === activeCategory ? "active" : ""
                    }`}
                    key={category}
                    onClick={() => {
                      setCategory(category);
                      setActiveCategory(category);
                    }}
                  >
                    {category}
                  </li>
                ))}
              </ul>

              <div className="sliderTitle">Price</div>
              <div className="sliderWrapper">
                <p style={{ marginBottom: "0.3rem" }}>Set Price Range:</p>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={25000}
                  style={{ color: "#1e1e27" }}
                />
              </div>

              <fieldset>
                <div className="sliderTitle" component="legend">
                  Ratings
                </div>
                <div className="sliderWrapper">
                  <p style={{ marginBottom: "0.3rem" }}>Set Rating Range:</p>
                  <Slider
                    value={ratings}
                    onChange={(e, newRating) => {
                      setRatings(newRating);
                    }}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                    style={{ color: "#1e1e27" }}
                  />
                </div>
              </fieldset>
            </div>
            <div className="productWrapper">
              <div className="filterTitleWrapper">
                {width < 600 && (
                  <div className="filterButton">
                    <FontAwesomeIcon
                      icon={faFilter}
                      style={{ height: "calc(1.2rem + 0.5vmax)" }}
                      onClick={() => setOpen((prev) => !prev)}
                    />
                  </div>
                )}
                <div className="productsHeading">Products</div>
              </div>
              <div className="products">
              {!products ?
                <p>Loading...</p> :
                products &&
                  products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              }
              </div>
              {resultPerPage < count && (
                <div className="paginationBox">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                  />
                </div>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
