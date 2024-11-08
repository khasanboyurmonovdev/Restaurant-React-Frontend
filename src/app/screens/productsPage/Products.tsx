import React, { useEffect } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CssVarsProvider } from "@mui/joy/styles";
import Card from "@mui/joy/Card";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";

import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";

/**Redux slice & selector */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});
const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

const returantImg = [
  { restImg: "/img/gurme.webp" },
  { restImg: "/img/seafood.webp" },
  { restImg: "/img/sweets.webp" },
  { restImg: "/img/doner.webp" },
];

export default function Products() {
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 8,
        order: "createdAt",
        productCollection: ProductCollection.DISH,
        search: "",
      })
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={"products"}>
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className={"avatar-big-box"}>
            <Stack className="main-title">
              <Box className={"title"}>Burak Restaurant</Box>
              <Stack className="single-search-form">
                <input
                  className="search-box"
                  type="text"
                  placeholder="Type here..."
                />
                <Button
                  color={"primary"}
                  variant={"contained"}
                  className={"search-btn"}
                >
                  SEARCH
                  <SearchIcon />
                </Button>
              </Stack>
            </Stack>
          </Stack>

          <Stack className={"dishes-filter-section"}>
            <Stack className={"dishes-filter-box"}>
              <Button
                variant={"contained"}
                color={"primary"}
                className={"order"}
              >
                NEW
              </Button>
              <Button
                variant={"contained"}
                color={"secondary"}
                className={"order"}
              >
                Price
              </Button>
              <Button
                variant={"contained"}
                color={"secondary"}
                className={"order"}
              >
                Views
              </Button>
            </Stack>
          </Stack>
          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <Stack className="category-main">
                <Button
                  className={"order"}
                  variant={"contained"}
                  color={"secondary"}
                >
                  OTHER
                </Button>
                <Button
                  className={"order"}
                  variant={"contained"}
                  color={"secondary"}
                >
                  DESSERT
                </Button>
                <Button
                  className={"order"}
                  variant={"contained"}
                  color={"secondary"}
                >
                  DRINK
                </Button>
                <Button
                  className={"order"}
                  variant={"contained"}
                  color={"secondary"}
                >
                  SALAD
                </Button>
                <Button
                  className={"order"}
                  variant={"contained"}
                  color={"primary"}
                >
                  DISH
                </Button>
              </Stack>
            </Stack>

            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productColection === ProductCollection.DRINK
                      ? product.productVolume + "litre"
                      : product.productSize + "size";

                  return (
                    <Stack key={product._id} className={"product-card"}>
                      <Stack
                        className={"product-img"}
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <div className={"product-sale"}>{sizeVolume}</div>
                        <Button className={"shop-btn"}>
                          <img
                            src={"/icons/shopping-cart.svg"}
                            style={{ display: "flex" }}
                          />
                        </Button>
                        <Button className={"view-btn"} sx={{ right: "25px" }}>
                          <Badge
                            badgeContent={product.productViews}
                            color="secondary"
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color:
                                  product.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className={"product-desc"}>
                        <span className={"product-title"}>
                          {product.productName}
                        </span>
                        <div className={"product-desc"}>
                          <MonetizationOnIcon />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className={"no-data"}>Products are not available!</Box>
              )}
            </Stack>
          </Stack>

          <Stack className={"pagination-section"}>
            <Pagination
              count={3}
              page={1}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
            />
          </Stack>
        </Stack>
      </Container>
      <div className={"brands-logo"}>
        <Container>
          <Stack className="restaurant-logo">
            <Box className={"family-brands"}>Our Family Brands</Box>
            <Stack className={"restaurant-img"}>
              <CssVarsProvider>
                {returantImg.map((ele, index) => {
                  return (
                    <Card key={index} className={"card"}>
                      <img src={ele.restImg} alt="" />
                    </Card>
                  );
                })}
              </CssVarsProvider>
            </Stack>
          </Stack>
        </Container>
      </div>

      <div className={"address"}>
        <Container>
          <Stack className={"address-area"}>
            <Box className={"address-title"}>Our address</Box>
            <iframe
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Andijan%20,%20Uzbekistan+(Burak%20Restaurant)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
