import React, { Fragment, useEffect, useState } from "react";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { useNavigate, useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const { isAuthenticated, user } = useSelector((state) => state.user);
  // console.log(product.ratings);
  // if(typeof product !== 'undefined') {
  // console.log("hello " + product);
  // console.log(product.ratings);
  // console.log("by" + product.Stock);
  // }
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    if (isAuthenticated) {
      const myForm = new FormData();
      myForm.set("rating", rating);
      myForm.set("comment", comment);
      myForm.set("productId", id);
      dispatch(newReview(myForm));
      setOpen(false);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  // useEffect(() => {

  //   console.log("hello");
  //   dispatch(getProductDetails(id));
  // }, [dispatch,id,alert,error]);

  console.log("picture");

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div style={{minHeight: '80vh'}}>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className="ProductDetails">
            <div>
              <Carousel
                className="carouselWrapper"
                data-bs-theme="dark"
                style={{
                  height: "calc(12rem + 8vmax)",
                  width: "calc(10rem + 15vmax)",
                }}
              >
                {product.images &&
                  product.images.map((item, i) => (
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        key={i}
                        src={item.url}
                        alt={`${i} Slide`}
                        style={{ height: "calc(12rem + 8vmax)" }}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>

            <div className="productDetailWrapper">
              <div className="detailsBlock-1">
                <div className="productDetailsTitle">{product.name}</div>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <div className="productPrice">{`$ ${product.price}`}</div>
                <div className="reviewWrapper">
                  <Rating
                    {...options}
                    style={{ fontSize: "calc(0.9rem + 0.4vmax)" }}
                  />
                  <span className="detailsBlock-2-span">
                    &nbsp; ({product.numOfReviews} Reviews)
                  </span>
                </div>
              </div>
              <div className="detailsBlock-3">
                <div className="detailsBlock-3-1">
                  <div className="quantityWrapper">
                    <div className="quantityTitle">Quantity:</div>
                    <div className="detailsBlock-3-1-1">
                      <button
                        onClick={decreaseQuantity}
                        style={{ backgroundColor: "white" }}
                      >
                        -
                      </button>
                      <div>{quantity}</div>
                      <button
                        onClick={increaseQuantity}
                        style={{ backgroundColor: "white" }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <div className="statusWrapper">
                  <div className="statusTitle">Status:</div>
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "Out Of Stock" : "In Stock"}
                  </b>
                </div>
              </div>

              <div className="detailsBlock-4">
                <div className="descriptionTitle">Description:</div>
                <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          <h3 className="reviewsHeading">REVIEWS</h3>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </div>
      )}
    </>
  );
};

export default ProductDetails;
