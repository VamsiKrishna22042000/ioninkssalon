import "./index.css";

import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { TailSpin } from "react-loader-spinner";

import Mode from "./modalboxofproduct.js";

const Products = () => {
  const [productsAvailable, setAvailableProducts] = useState([]);
  const [buttonToggle, setToggleProduct] = useState("");
  const [load, setLoad] = useState(false);
  const [showMode, setMode] = useState(false);
  const [availableTypes, setType] = useState([]);
  const [selectedType, setSele] = useState([]);
  const [availableCategories, setCategories] = useState([]);
  const [serviceTobeDeleted, setServiceToDelete] = useState("");
  const [serviceTobeEdited, setServiceToEdit] = useState("");

  useEffect(() => {
    getAllProducts();
  }, []);

  const ModalDeleteProduct = () => {
    const [loading, setLoad] = useState(true);
    const deleteProduct = async () => {
      setLoad(false);
      const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/product/deleteProduct/${serviceTobeDeleted}`;

      const requestConfigure = {
        method: "DELETE",
      };

      const response = await fetch(url, requestConfigure);
      if (response.ok) {
        toast.error("Deleted", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
        setTimeout(() => {
          setLoad(true);
          getAllProducts();
          setServiceToDelete("");
        }, 2000);
      }
    };

    return (
      <>
        <ToastContainer />
        <div className="modal-boxcon"></div>
        {loading ? (
          <div style={{ width: 250, height: 100 }} className="modal-delete">
            <p style={{ fontSize: 20 }}>Are you sure you want to delete ?</p>
            <div
              style={{
                width: 200,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignSelf: "center",
              }}
            >
              <button
                style={{
                  padding: 5,
                  backgroundColor: "#ffc720",
                  color: "#FFFFFF",
                  borderWidth: 0,
                  borderRadius: 5,
                }}
                type="button"
                onClick={() => {
                  setServiceToDelete("");
                }}
              >
                Cancel
              </button>
              <button
                onClick={deleteProduct}
                style={{
                  padding: 5,
                  backgroundColor: "Red",
                  color: "#FFFFFF",
                  borderWidth: 0,
                  borderRadius: 5,
                }}
                type="button"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div style={{ width: 250, height: 100 }} className="modal-delete">
            <div className="spinner-edit">
              <TailSpin color={"#F4BD18"} height={50} width={50} />
            </div>
          </div>
        )}
      </>
    );
  };

  const ModalEditProduct = () => {
    const [settigEditLoad, setEditLoad] = useState(false);

    const filterdProduct = productsAvailable.filter(
      (each) => each._id === serviceTobeEdited
    );

    const [demodataTobe, setdemodata] = useState({
      name: filterdProduct[0].name,
      type: filterdProduct[0].type,
      category: filterdProduct[0].category,
      price: filterdProduct[0].price,
      about: filterdProduct[0].about,
      photos: filterdProduct[0].image,
    });

    const [dataToBe, setData] = useState({
      name: filterdProduct[0].name,
      type: filterdProduct[0].type,
      category: filterdProduct[0].category,
      price: filterdProduct[0].price,
      about: filterdProduct[0].about,
      photos: filterdProduct[0].image,
    });

    const addService = (event) => {
      if (event.target.id === "service-name-admin") {
        setData((prevData) => ({ ...prevData, name: event.target.value }));
      } else if (event.target.id === "service-type-product") {
        setData((prevData) => ({ ...prevData, type: event.target.value }));
      } else if (event.target.id === "service-category-product") {
        setData((prevData) => ({ ...prevData, category: event.target.value }));
      } else if (event.target.id === "service-price-admin") {
        setData((prevData) => ({ ...prevData, price: event.target.value }));
      } else if (event.target.id === "service-time-admin") {
        setData((prevData) => ({ ...prevData, time: event.target.value }));
      } else if (event.target.id === "service-about-admin") {
        setData((prevData) => ({
          ...prevData,
          about: event.target.value,
        }));
      } else if (event.target.id === "file") {
        setData((prevData) => ({ ...prevData, photos: event.target.files[0] }));
      }
    };

    const updateToProductList = () => {
      const sendEditedData = async () => {
        setEditLoad(true);
        const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/product/editProduct`;

        const reqConfigure = {
          method: "PUT",
          body: fd,
        };

        const response = await fetch(url, reqConfigure);

        if (response.ok) {
          toast.success("Edited", {
            position: "top-center",
            autoClose: 2000,
            pauseOnHover: true,
            closeOnClick: true,
            theme: "colored",
          });
          setTimeout(() => {
            setEditLoad(false);
            setServiceToEdit("");
            getAllProducts();
          }, 2000);
        }
      };

      const fd = new FormData();

      if (dataToBe.name !== demodataTobe.name) {
        fd.append("name", dataToBe.name);
      }
      if (dataToBe.type !== demodataTobe.type) {
        fd.append("type", dataToBe.type);
      }
      if (dataToBe.category !== demodataTobe.category) {
        fd.append("category", dataToBe.category);
      }
      if (dataToBe.price !== demodataTobe.price) {
        fd.append("price", dataToBe.price);
      }
      if (dataToBe.about !== demodataTobe.about) {
        fd.append("about", dataToBe.about);
      }
      if (dataToBe.photos !== demodataTobe.photos) {
        fd.append("photos", dataToBe.photos);
      }

      const editedData = Object.fromEntries(fd.entries());
      let count = 0;

      for (var len in editedData) {
        count = count + 1;
      }

      if (count > 0) {
        fd.append("productId", `${serviceTobeEdited}`);
        console.log(demodataTobe);
        console.log(Object.fromEntries(fd.entries()));
        sendEditedData();
      } else {
        toast.error("No changes made", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      }
    };

    return (
      <>
        <ToastContainer />
        <div className="modal-boxcon"></div>
        {settigEditLoad ? (
          <div className="modal-box">
            <div className="spinner-edit">
              <TailSpin color={"#F4BD18"} height={70} width={70} />
            </div>
          </div>
        ) : (
          <form className="modal-box">
            <h1 style={{ marginBottom: 10, color: "#3E3E3E", fontSize: 20 }}>
              Edit Product
            </h1>
            <lable style={{ margin: 0 }} htmlFor="service-name-admin">
              Product Title
            </lable>
            <input
              style={{ margin: 0 }}
              value={dataToBe.name}
              onChange={addService}
              className="service-admin-input"
              id="service-name-admin"
              type="text"
            />

            <lable style={{ margin: 0 }} htmlFor="service-price-admin">
              Product Price
            </lable>
            <input
              style={{ margin: 0 }}
              value={dataToBe.price}
              className="service-admin-input"
              id="service-price-admin"
              type="text"
              onChange={addService}
            />
            <lable style={{ margin: 0 }} htmlFor="service-description-admin">
              Describe about product
            </lable>
            <textarea
              style={{ margin: 0 }}
              value={dataToBe.about}
              onChange={addService}
              className="service-admin-text-area-product"
              id="service-about-admin"
              type="text"
            />
            <label htmlFor="service-image-admin">
              Upload Image for product
            </label>
            <input id="file" onChange={addService} type="file" />
            <div className="service-button-admin-con">
              <button
                className="service-button-admin"
                type="button"
                onClick={updateToProductList}
              >
                Edit
              </button>
              <button
                className="service-button-admin"
                onClick={() => {
                  setServiceToEdit("");
                }}
                type="button"
              >
                close
              </button>
            </div>
          </form>
        )}
      </>
    );
  };

  const getAllProducts = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllProduct`
    );
    const da = await res.json();
    if (res.ok) {
      setAvailableProducts(da.products);
      setLoad(true);
      /*console.log(da.products)*/
    }
  };

  const getAllCategoryOfProducts = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllCategory`
    );
    const data = await response.json();
    if (response.ok === true) {
      /*console.log(data);*/
      const type = data.categories.map((each) => each.type);
      setType(type);
      const obtainedCategories = data.categories.map((each) => each.category);
      setCategories(obtainedCategories[0]);
    }
  };

  const getSubCategories = async (value) => {
    const response = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllCategory`
    );
    const data = await response.json();
    if (response.ok === true) {
      const obtainedCategories = data.categories.filter(
        (each) => each.type === value
      );
      setCategories(obtainedCategories[0].category);
      /*console.log(obtainedCategories[0].category)*/
    }
  };

  const settinMode = () => {
    setMode(!showMode);
    getAllCategoryOfProducts();
  };

  const settingType = (event) => {
    /*console.log(event.target.value)*/
    setSele(event.target.value);
    getSubCategories(event.target.value);
  };

  const toggleProduct = async (event) => {
    setToggleProduct(event.target.id);

    const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/product/productToggle`;

    const options = {
      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ productId: `${event.target.id}` }),
    };

    const response = await fetch(url, options);

    if (response.ok) {
      setToggleProduct("");
      getAllProducts();
    }
  };

  return load ? (
    <>
      {showMode && (
        <Mode
          selectedType={selectedType}
          availableTypes={availableTypes}
          availableCategories={availableCategories}
          settinMode={settinMode}
          settingType={settingType}
          getAllProducts={getAllProducts}
        />
      )}
      <div className="dashboard-component2">
        <button onClick={settinMode} className="add-service" type="button">
          + Add new product
        </button>
        <div className="avialable-products-head">
          <div className="product-image">
            <p className="product-heads">Image</p>
          </div>
          <div className="product-togglecon">
            <p className="product-heads">Enable/Disable</p>
          </div>
          <div className="product-name">
            <p className="product-heads">Name</p>
          </div>
          <div className="product-toggle">
            <p className="product-heads">Price</p>
          </div>
          <div className="product-togglecon">
            <p className="product-heads">Type</p>
          </div>
          <div className="product-category">
            <p className="product-heads">Category</p>
          </div>
          <div className="product-togglecon">
            <p className="product-heads">Rating</p>
          </div>
          <div className="product-togglecon">
            <p className="product-heads">Reviews</p>
          </div>
          <div className="product-action">
            <p className="product-heads">Action</p>
            <img src="./updown.png" className="updown" alt="updown" />
          </div>
        </div>
        {productsAvailable.map((each) => (
          <div key={each._id} id={each._id} className="avialable-products">
            <div className="product-image">
              <img
                className="productimage"
                src={each.photos[0]}
                alt="productimage"
              />
            </div>
            <div id={each._id} className="product-togglecon">
              {buttonToggle === each._id ? (
                <TailSpin color={"#F4BD18"} height={50} width={50} />
              ) : (
                <div className={each.active ? "toggle-con3" : "toggle-con4"}>
                  <button
                    onClick={toggleProduct}
                    id={each._id}
                    type="button"
                    className={each.active ? "togglebutton2" : "togglebutton1"}
                  ></button>
                </div>
              )}
            </div>
            <div className="product-name">
              <p
                style={{
                  textTransform: "capitalize",
                  textTransform: "capitalize",

                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {each.name}
              </p>
            </div>
            <div id={each._id} className="product-toggle">
              <p style={{ textTransform: "capitalize" }}>₹ {each.price}</p>
            </div>
            <div className="product-togglecon">
              <p
                style={{
                  textTransform: "capitalize",
                  fontWeight: 400,
                  textTransform: "capitalize",

                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                className="product-heads"
              >
                {each.type}
              </p>
            </div>
            <div className="product-category">
              <p
                style={{
                  textTransform: "capitalize",
                  textTransform: "capitalize",

                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {each.category}
              </p>
            </div>
            <div className="product-togglecon">
              <p
                style={{ textTransform: "capitalize", fontWeight: 400 }}
                className="product-heads"
              >
                {each.rating}
              </p>
            </div>
            <div className="product-togglecon">
              <p
                style={{ textTransform: "capitalize", fontWeight: 400 }}
                className="product-heads"
              >
                {each.productReviews.length}
              </p>
            </div>
            <div className="product-action">
              <div className="actions-con">
                <button
                  onClick={() => {
                    setServiceToEdit(each._id);
                  }}
                  className="actions-button"
                >
                  <img className="actions-img" src="./edit.png" alt="edit" />
                </button>
                <button
                  onClick={() => {
                    setServiceToDelete(each._id);
                  }}
                  className="actions-button"
                >
                  <img
                    className="actions-img"
                    src="./delete-fill.png"
                    alt="delete"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {serviceTobeDeleted !== "" && <ModalDeleteProduct />}
      {serviceTobeEdited !== "" && <ModalEditProduct />}
    </>
  ) : (
    <div className="loader-spinner-admin">
      <TailSpin color={"#F4BD18"} height={70} width={70} />
    </div>
  );
};
export default Products;
