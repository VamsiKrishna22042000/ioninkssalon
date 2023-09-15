import "./index.css";

import { useEffect, useState } from "react";

import { TailSpin } from "react-loader-spinner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Mode = (props) => {
  const [showType, setShowType] = useState(true);
  const [showCategory, setShowCategory] = useState(true);

  const [addProductLoader, setProductLoader] = useState(false);

  const {
    availableTypes,
    availableCategories,
    settingType,
    settinMode,
    getAllProducts,
  } = props;

  const [dataToBe, setData] = useState({
    name: "",
    type: "",
    category: "",
    price: "",
    about: "",
    photos: "",
    image: "",
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
    } else if (event.target.id === "file-cat") {
      setData((prevData) => ({ ...prevData, image: event.target.files[0] }));
    }
  };

  const updateToProductList = async () => {
    if (dataToBe.name === "") {
      toast.error("Please Enter Product Title", {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: true,
        theme: "colored",
      });
    } else if (dataToBe.type === "") {
      toast.error("Please Select Type or Add New Type", {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: true,
        theme: "colored",
      });
    } else if (dataToBe.category === "") {
      toast.error("Please Select Category or Add New Category", {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: true,
        theme: "colored",
      });
    } else if (dataToBe.price === "") {
      toast.error("Please Enter Price", {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: true,
        theme: "colored",
      });
    } else if (dataToBe.about === "") {
      toast.error("Please Describe About Product", {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: true,
        theme: "colored",
      });
    } else if (dataToBe.photos === "") {
      toast.error("Please Upload Image for the Product", {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: true,
        theme: "colored",
      });
    } else if (!availableTypes.includes(dataToBe.type)) {
      if (dataToBe.image === "") {
        toast.error("Please Upload New Image for Type", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else {
        setProductLoader(true);
        const fd = new FormData();
        const fd2 = new FormData();

        for (var key in dataToBe) {
          fd.append(`${key}`, dataToBe[key]);
        }

        for (var key in dataToBe) {
          if (key === "image") {
            fd2.append(`${key}`, dataToBe[key]);
          }
          if (key === "type") {
            fd2.append(`${key}`, dataToBe[key]);
          }
          if (key === "category") {
            fd2.append(`${key}`, [dataToBe[key]]);
          }
        }

        const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/addProduct`;
        const url2 = `${process.env.REACT_APP_ROOT_URL}/api/admin/addCategory`;

        const reqConfigure = {
          method: "POST",
          body: fd,
        };

        const options = {
          method: "POST",
          body: fd2,
        };

        const response = await fetch(url, reqConfigure);

        const res = await fetch(url2, options);

        if (response.ok && res.ok) {
          setProductLoader(false);
          getAllProducts();
          settinMode();
        }
      }
    } else {
      setProductLoader(true);
      const fd = new FormData();

      for (var key in dataToBe) {
        fd.append(`${key}`, dataToBe[key]);
      }

      const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/addProduct`;

      console.log(Object.fromEntries(fd.entries()));
      const reqConfigure = {
        method: "POST",
        body: fd,
      };

      const response = await fetch(url, reqConfigure);

      if (response.ok) {
        toast.success("Added", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
        setTimeout(() => {
          setProductLoader(false);
          getAllProducts();
          settinMode();
        }, 2000);
      }
    }
  };

  return addProductLoader ? (
    <>
      <ToastContainer />
      <div className="modal-boxcon"></div>
      <div className="modal-box">
        <div className="spinner-edit">
          <TailSpin color={"#F4BD18"} height={50} width={50} />
        </div>
      </div>
    </>
  ) : (
    <>
      <ToastContainer />
      <div className="modal-boxcon"></div>
      <form className="modal-box">
        <h1 style={{ marginBottom: 10, color: "#3E3E3E", fontSize: 20 }}>
          Add New Product
        </h1>
        <lable htmlFor="service-name-admin">Product Title</lable>
        <input
          onChange={addService}
          className="service-admin-input"
          id="service-name-admin"
          type="text"
        />
        {showType && (
          <label htmlFor="service-type-product">
            Select Type of the product
          </label>
        )}
        {showType && (
          <select
            style={{ textTransform: "capitalize" }}
            id="service-type-product"
            className="service-admin-input"
            onChange={(event) => {
              settingType(event);
              addService(event);
            }}
          >
            <option>Select</option>
            {availableTypes.map((each) => (
              <option
                selected={dataToBe.type === each ? true : false}
                style={{ textTransform: "capitalize" }}
                id={each._id}
              >
                {each}
              </option>
            ))}
          </select>
        )}
        {showCategory && (
          <label htmlFor="service-category-product">
            Select Category of the product
          </label>
        )}
        {showCategory && (
          <select
            style={{ textTransform: "capitalize" }}
            id="service-category-product"
            className="service-admin-input"
            onChange={addService}
          >
            <option>Select</option>
            {availableCategories.map((each) => (
              <option style={{ textTransform: "capitalize" }} id={each}>
                {each}
              </option>
            ))}
          </select>
        )}
        {!showType && (
          <button
            onClick={() => {
              setShowType(true);
              setShowCategory(true);
            }}
            type="button"
            className="service-button-admin-category1"
          >
            Click here to get available Type & Categories back
          </button>
        )}
        {!showCategory && (
          <button
            onClick={() => {
              setShowCategory(true);
            }}
            type="button"
            className="service-button-admin-category1"
          >
            Click here to get available Categories back
          </button>
        )}

        <lable htmlFor="service-price-admin">Product Price</lable>
        <input
          className="service-admin-input"
          id="service-price-admin"
          type="text"
          onChange={addService}
        />
        <lable htmlFor="service-description-admin">
          Describe about product
        </lable>
        <textarea
          onChange={addService}
          className="service-admin-text-area-product"
          id="service-about-admin"
          type="text"
        />
        <label htmlFor="service-image-admin">Upload Image for product</label>
        <input id="file" onChange={addService} type="file" />
        <div className="service-button-admin-con">
          <button
            className="service-button-admin"
            type="button"
            onClick={updateToProductList}
          >
            Add
          </button>
          <button
            className="service-button-admin"
            onClick={() => {
              settinMode();
            }}
            type="button"
          >
            close
          </button>
        </div>
        <form className="modal-box2">
          <h1 style={{ margin: 0, color: "#3E3E3E", fontSize: 20 }}>
            Add New Type
          </h1>
          <p>New Type name</p>
          <input
            id="service-type-product"
            onFocusCapture={() => {
              setShowType(false);
              setData((prevData) => ({ ...prevData, type: "", category: "" }));
            }}
            onFocus={() => {
              setShowCategory(false);
            }}
            onChange={addService}
            type="text"
          />

          <p style={{ color: "red", fontSize: 10 }}>
            *Please add Type if needed else leave it blank.
          </p>
          <label htmlFor="service-image-admin">
            Upload Image New Product Type
          </label>
          <input
            style={{ marginBottom: 10, marginTop: 10 }}
            id="file-cat"
            onChange={addService}
            type="file"
          />
          <h1 style={{ margin: 0, color: "#3E3E3E", fontSize: 18 }}>
            Add New Category
          </h1>
          <p>New category name</p>
          <input
            id="service-category-product"
            onFocusCapture={() => {
              setShowCategory(false);
            }}
            onChange={addService}
            type="text"
          />
          <p style={{ color: "red", fontSize: 10 }}>
            *Please add category if needed else leave it blank.
          </p>
        </form>
      </form>
    </>
  );
};
export default Mode;
