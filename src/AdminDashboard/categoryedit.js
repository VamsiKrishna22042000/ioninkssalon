import { useEffect, useState } from "react";
import "./index.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InfinitySpin } from "react-loader-spinner";

import Cookies from "js-cookie";

const CategoryEdit = () => {
  const [serviceEdit, setServiceEdit] = useState(false);
  const [productEdit, setProductEdit] = useState(false);
  const [serviceDelete, setServiceDelete] = useState(false);
  const [productDelete, setProductDelete] = useState(false);

  const ModalServiceEdit = () => {
    const [categories, setCategories] = useState("");
    const getId = Cookies.get("jwt_salonId");
    const [newValues, setNewValuse] = useState({
      name: "",
      image: "",
      categoryId: "Select",
      salonId: getId,
    });

    useEffect(() => {
      getTheCategories();
    }, []);

    const getTheCategories = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllSalon`
      );
      const data = await response.json();

      if (response.ok === true) {
        setCategories(data.salons[0].categories);
        /*console.log(data.salons[0].categories)*/

        /*console.log(service)*/
      }
    };

    const editService = (e) => {
      if (e.target.id === "newCategoryname") {
        setNewValuse((prevData) => ({ ...prevData, name: e.target.value }));
      } else if (e.target.id === "newCategoryimage") {
        setNewValuse((prevData) => ({ ...prevData, image: e.target.files[0] }));
      } else {
        const filerId = categories.filter(
          (each) => each.category === e.target.value && each._id
        );
        setNewValuse((prevData) => ({
          ...prevData,
          categoryId: filerId[0]._id,
        }));
      }
    };

    const updateEditService = async () => {
      if (
        newValues.categoryId !== "Select" ||
        newValues.name !== "" ||
        newValues.image !== ""
      ) {
        const fd = new FormData();

        for (var key in newValues) {
          fd.append(`${key}`, newValues[key]);
        }

        const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/salon/editCategory`;

        const options = {
          method: "PUT",
          body: fd,
        };

        const response = await fetch(url, options);

        if (response.ok) {
          toast.success("Edited", {
            position: "top-center",
            autoClose: 2000,
            pauseOnHover: true,
            closeOnClick: true,
            theme: "colored",
          });
          setTimeout(() => {
            setServiceEdit(!serviceEdit);
          }, 2000);
        }
      } else {
        toast.error("Nochanges Made", {
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

        <div className="modal-box20">
          <div style={{ paddingRight: "4rem" }} className="spinner-edit">
            <InfinitySpin color={"#4444D5"} height={100} width={100} />
          </div>
        </div>

        {categories !== "" && (
          <form className="modal-box20">
            <>
              <div className="category-edit-content">
                <h2>Edit Service Category</h2>
                <h4 style={{ marginTop: 5, marginBottom: 5 }}>
                  Select Category You Want to Edit
                </h4>
                <select
                  onChange={editService}
                  style={{ textTransform: "capitalize" }}
                >
                  <option>Select</option>
                  {categories.map((each) => (
                    <option
                      id={each._id}
                      style={{ textTransform: "capitalize" }}
                    >
                      {each.category}
                    </option>
                  ))}
                </select>
                <h4 style={{ marginTop: 5, marginBottom: 5 }}>Type New Name</h4>
                <input
                  id="newCategoryname"
                  onChange={editService}
                  type="text"
                />
                <h4 style={{ marginTop: 5, marginBottom: 5 }}>Add New Image</h4>
                <input
                  id="newCategoryimage"
                  onChange={editService}
                  style={{ marginBottom: 5 }}
                  type="file"
                />
              </div>
              <div className="category-edit-buttons-con">
                <button
                  onClick={updateEditService}
                  className="category-edit-button1"
                  type="button"
                >
                  Edit
                </button>

                <button
                  className="category-edit-button1"
                  onClick={() => {
                    setServiceEdit(!serviceEdit);
                  }}
                  type="button"
                >
                  Close
                </button>
              </div>
            </>
          </form>
        )}
      </>
    );
  };

  const ModalProductEdit = () => {
    const [categories, setCategories] = useState("");

    const [newValues, setNewValuse] = useState({
      type: "",
      image: "",
      categoryId: "Select",
    });

    useEffect(() => {
      getAllCategoryOfProducts();
    }, []);

    const getAllCategoryOfProducts = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllCategory`
      );
      const data = await response.json();
      if (response.ok === true) {
        setCategories(data.categories);
      }
    };

    const editService = (e) => {
      if (e.target.id === "newCategoryname") {
        setNewValuse((prevData) => ({ ...prevData, type: e.target.value }));
      } else if (e.target.id === "newCategoryimage") {
        setNewValuse((prevData) => ({ ...prevData, image: e.target.files[0] }));
      } else {
        const filerId = categories.filter(
          (each) => each.type === e.target.value && each._id
        );
        setNewValuse((prevData) => ({
          ...prevData,
          categoryId: filerId[0]._id,
        }));
      }
    };

    const updateEditService = async () => {
      if (
        newValues.categoryId !== "Select" ||
        newValues.type !== "" ||
        newValues.image !== ""
      ) {
        const fd = new FormData();

        for (var key in newValues) {
          fd.append(`${key}`, newValues[key]);
        }

        const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/category/editCategory1`;

        const options = {
          method: "PUT",
          body: fd,
        };

        const response = await fetch(url, options);

        if (response.ok) {
          toast.success("Edited", {
            position: "top-center",
            autoClose: 2000,
            pauseOnHover: true,
            closeOnClick: true,
            theme: "colored",
          });
          setTimeout(() => {
            setProductEdit(!productEdit);
          }, 2000);
        }
      } else {
        toast.error("Nochanges Made", {
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

        <div className="modal-box20">
          <div style={{ paddingRight: "4rem" }} className="spinner-edit">
            <InfinitySpin color={"#4444D5"} height={100} width={100} />
          </div>
        </div>

        {categories !== "" && (
          <form className="modal-box20">
            <>
              <div className="category-edit-content">
                <h2>Edit Product Category</h2>
                <h4 style={{ marginTop: 5, marginBottom: 5 }}>
                  Select Type You Want to Edit
                </h4>
                <select
                  onChange={editService}
                  style={{ textTransform: "capitalize" }}
                >
                  <option>Select</option>
                  {categories.map((each) => (
                    <option
                      id={each._id}
                      style={{ textTransform: "capitalize" }}
                    >
                      {each.type}
                    </option>
                  ))}
                </select>
                <h4 style={{ marginTop: 5, marginBottom: 5 }}>Type New Name</h4>
                <input onChange={editService} type="text" />
                <h4 style={{ marginTop: 5, marginBottom: 5 }}>Add New Image</h4>
                <input
                  id="newCategoryimage"
                  onChange={editService}
                  style={{ marginBottom: 5 }}
                  type="file"
                />
              </div>
              <div className="category-edit-buttons-con">
                <button
                  onClick={updateEditService}
                  className="category-edit-button1"
                  type="button"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    setProductEdit(!productEdit);
                  }}
                  className="category-edit-button1"
                >
                  Close
                </button>
              </div>
            </>
          </form>
        )}
      </>
    );
  };

  const ModalServiceDelete = () => {
    const [categories, setCategories] = useState("");
    const getId = Cookies.get("jwt_salonId");
    const [newValues, setNewValuse] = useState({
      categoryId: "Select",
      salonId: getId,
    });

    useEffect(() => {
      getTheCategories();
    }, []);

    const getTheCategories = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllSalon`
      );
      const data = await response.json();

      if (response.ok === true) {
        setCategories(data.salons[0].categories);
        /*console.log(data.salons[0].categories)*/

        /*console.log(service)*/
      }
    };

    const editService = (e) => {
      const filerId = categories.filter(
        (each) => each.category === e.target.value && each._id
      );
      setNewValuse((prevData) => ({
        ...prevData,
        categoryId: filerId[0]._id,
      }));
    };

    const [count, setCount] = useState(1);

    const updateEditService = async () => {
      if (newValues.categoryId !== "Select") {
        if (count === 1) {
          alert("Are you Sure you want to Delete Category");
          setCount(2);
        } else if (count === 2) {
          const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/salon/deleteCategory?salonId=${newValues.salonId}&categoryId=${newValues.categoryId}`;

          const options = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          };

          const response = await fetch(url, options);

          if (response.ok) {
            toast.success("Deleted", {
              position: "top-center",
              autoClose: 2000,
              pauseOnHover: true,
              closeOnClick: true,
              theme: "colored",
            });

            setTimeout(() => {
              setServiceDelete(!serviceDelete);
            }, 2000);
          }
        } else {
          toast.error("Select Service To Delete", {
            position: "top-center",
            autoClose: 2000,
            pauseOnHover: true,
            closeOnClick: true,
            theme: "colored",
          });
        }
      }
    };

    return (
      <>
        <ToastContainer />
        <div className="modal-boxcon"></div>

        <div className="modal-box3">
          <div style={{ paddingRight: "4rem" }} className="spinner-edit">
            <InfinitySpin color={"#4444D5"} height={100} width={100} />
          </div>
        </div>

        {categories !== "" && (
          <form className="modal-box3">
            <>
              <div className="category-edit-content">
                <h2>Delete Service Category</h2>
                <h4 style={{ marginTop: 20, marginBottom: 15 }}>
                  Select Category You Want to Delete
                </h4>
                <select
                  onChange={editService}
                  style={{ textTransform: "capitalize" }}
                >
                  <option>Select</option>
                  {categories.map((each) => (
                    <option
                      key={each._id}
                      id={each._id}
                      style={{ textTransform: "capitalize" }}
                    >
                      {each.category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="category-edit-buttons-con">
                <button
                  onClick={updateEditService}
                  className="category-edit-button1"
                  type="button"
                >
                  Delete
                </button>

                <button
                  className="category-edit-button1"
                  onClick={() => {
                    setServiceDelete(!serviceDelete);
                  }}
                  type="button"
                >
                  Close
                </button>
              </div>
            </>
          </form>
        )}
      </>
    );
  };

  const ModalProductDelete = () => {
    const [categories, setCategories] = useState("");
    const [newValues, setNewValuse] = useState({
      categoryId: "Select",
    });

    useEffect(() => {
      getAllCategoryOfProducts();
    }, []);

    const getAllCategoryOfProducts = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllCategory`
      );
      const data = await response.json();
      if (response.ok === true) {
        setCategories(data.categories);
      }
    };

    const editService = (e) => {
      const filerId = categories.filter(
        (each) => each.type === e.target.value && each._id
      );
      setNewValuse((prevData) => ({
        ...prevData,
        categoryId: filerId[0]._id,
      }));
    };

    const [count, setCount] = useState(1);

    const updateEditService = async () => {
      if (newValues.categoryId !== "Select") {
        if (count === 1) {
          alert("Are you Sure you want to Delete Type");
          setCount(2);
        } else if (count === 2) {
          const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/category/deleteProductCategory?categoryId=${newValues.categoryId}`;

          const options = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          };

          const response = await fetch(url, options);

          if (response.ok) {
            toast.success("Deleted", {
              position: "top-center",
              autoClose: 2000,
              pauseOnHover: true,
              closeOnClick: true,
              theme: "colored",
            });

            setTimeout(() => {
              setProductDelete(!productDelete);
            }, 2000);
          }
        } else {
          toast.error("Select Service To Delete", {
            position: "top-center",
            autoClose: 2000,
            pauseOnHover: true,
            closeOnClick: true,
            theme: "colored",
          });
        }
      }
    };

    return (
      <>
        <ToastContainer />
        <div className="modal-boxcon"></div>
        <div className="modal-box3">
          <div style={{ paddingRight: "4rem" }} className="spinner-edit">
            <InfinitySpin color={"#4444D5"} height={100} width={100} />
          </div>
        </div>

        {categories !== "" && (
          <form className="modal-box3">
            <>
              <div className="category-edit-content">
                <h2>Delete Product Category</h2>
                <h4 style={{ marginTop: 20, marginBottom: 15 }}>
                  Select Type You Want to Delete
                </h4>
                <select
                  onChange={editService}
                  style={{ textTransform: "capitalize" }}
                >
                  <option>Select</option>
                  {categories.map((each) => (
                    <option
                      key={each._id}
                      id={each._id}
                      style={{ textTransform: "capitalize" }}
                    >
                      {each.type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="category-edit-buttons-con">
                <button
                  onClick={updateEditService}
                  className="category-edit-button1"
                  type="button"
                >
                  Delete
                </button>

                <button
                  onClick={() => {
                    setProductDelete(!productDelete);
                  }}
                  className="category-edit-button1"
                >
                  Close
                </button>
              </div>
            </>
          </form>
        )}
      </>
    );
  };

  return (
    <>
      {serviceDelete && <ModalServiceDelete />}
      {productDelete && <ModalProductDelete />}
      <div className="dashboard-component3">
        <div className="category-edit-product">
          <img
            src="/CategoryEdit2.png"
            className="category-edit-img"
            alt="category-edit"
          />
          <p>Edit/Delete Service Category</p>
          <div className="edit-delete">
            <button
              onClick={() => {
                setServiceEdit(!serviceEdit);
              }}
              className="category-edit-button"
              type="button"
            >
              Edit
            </button>
            <button
              onClick={() => {
                setServiceDelete(!serviceDelete);
              }}
              className="category-edit-button"
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
        <div className="category-edit-product">
          <img
            src="/CategoryEdit2.png"
            className="category-edit-img"
            alt="category-edit"
          />
          <p>Edit/Delete Product Category</p>
          <div className="edit-delete">
            <button
              onClick={() => {
                setProductEdit(!productEdit);
              }}
              className="category-edit-button"
              type="button"
            >
              Edit
            </button>
            <button
              onClick={() => {
                setProductDelete(!productDelete);
              }}
              className="category-edit-button"
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {serviceEdit && <ModalServiceEdit />}
      {productEdit && <ModalProductEdit />}
    </>
  );
};

export default CategoryEdit;
