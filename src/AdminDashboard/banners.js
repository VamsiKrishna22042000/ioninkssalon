import { useState, useEffect } from "react";
import "./index.css";

import { TailSpin } from "react-loader-spinner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Banners = () => {
  const [loadVideos, setLoadVideos] = useState(true);

  const [deleteVideo, setDeleteVideo] = useState("");

  const [banners, setBanners] = useState([]);

  const [bannerCategory, setBannerCategory] = useState([]);

  useEffect(() => {
    getBanners();
  }, []);

  const getBanners = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllBanners`
    );
    const data = await response.json();
    console.log(data);
    if (response.ok === true) {
      const bannersDestructure = data.banners.filter((each) => ({
        id: each._id,
        image: each.image,
        offer: each.offer,
        text: each.text,
        link: each.link,
      }));
      setBanners(bannersDestructure);
      const categories = bannersDestructure.map((each) => each.category);
      setBannerCategory([...new Set(categories)]);
    }
  };

  const [showModal, setModal] = useState(false);
  const settingModal = () => {
    setModal(!showModal);
  };

  const Modal = () => {
    const [dataTobeSent, setData] = useState({ category: "", image: "" });
    const [eventLoad, setEventLoad] = useState(true);

    const addingEvent = (event) => {
      if (event.target.id === "service-name-admin") {
        setData((prevData) => ({ ...prevData, category: event.target.value }));
      } else if (event.target.id === "file") {
        setData((prevData) => ({ ...prevData, image: event.target.files[0] }));
      }
    };

    const updatingEvent = async () => {
      if (dataTobeSent.category === "" || dataTobeSent.category === "Select") {
        toast.error("Please Select Category", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (dataTobeSent.image === "") {
        toast.error("Please upload image", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else {
        setEventLoad(false);

        const fd = new FormData();

        for (var key in dataTobeSent) {
          fd.append(`${key}`, dataTobeSent[key]);
        }

        try {
          const reqConfigure = {
            method: "POST",
            body: fd,
          };

          const res = await fetch(
            `${process.env.REACT_APP_ROOT_URL}/api/admin/addBanner`,
            reqConfigure
          );

          if (res.ok) {
            toast.success("Added", {
              position: "top-center",
              autoClose: 2000,
              pauseOnHover: true,
              closeOnClick: true,
              theme: "colored",
            });
            setTimeout(() => {
              setEventLoad(true);
              settingModal();
              getBanners();
            }, 2000);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    console.log(dataTobeSent);

    return eventLoad ? (
      <>
        <ToastContainer />
        <div className="modal-boxcon"></div>
        <form className="modal-box3">
          <h1 style={{ marginBottom: 10, color: "#3E3E3E", fontSize: 20 }}>
            Add New Banner
          </h1>
          <lable
            style={{ height: 25, marginBottom: 1 }}
            htmlFor="service-name-admin"
          >
            Banner Category
          </lable>
          <select
            className="service-admin-input"
            style={{
              height: 25,
              marginBottom: 10,
              textTransform: "capitalize",
            }}
            onChange={addingEvent}
            id="service-name-admin"
          >
            <option>Select</option>
            {bannerCategory.map((each) => (
              <option>{each}</option>
            ))}
          </select>
          <label
            style={{ height: 25, marginBottom: 1 }}
            htmlFor="service-image-admin"
          >
            Upload new banner image
          </label>
          <input
            id="file"
            style={{ height: 25, marginBottom: 10 }}
            className="service-admin-input"
            onChange={addingEvent}
            type="file"
          />
          <div className="service-button-admin-con-event">
            <button
              className="service-button-admin"
              onClick={updatingEvent}
              type="button"
            >
              Add
            </button>
            <button
              className="service-button-admin"
              onClick={settingModal}
              type="button"
            >
              close
            </button>
          </div>
        </form>
      </>
    ) : (
      <>
        <ToastContainer />
        <div className="modal-boxcon"></div>
        <div className="modal-box3">
          <div className="spinner-edit">
            <TailSpin color={"#F4BD18"} height={50} width={50} />
          </div>
        </div>
      </>
    );
  };

  const DeleteModal = () => {
    const [loadingDelete, setLoadingDelete] = useState(false);

    const deletingCust = async () => {
      setLoadingDelete(true);
      const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/deleteBanner/${deleteVideo}`;

      const options = {
        method: "DELETE",
      };

      const response = await fetch(url, options);
      if (response.ok) {
        toast.error("Deleted", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
        setTimeout(() => {
          setLoadingDelete(false);
          setDeleteVideo("");
          getBanners();
        }, 2000);
      } else {
        setLoadingDelete(false);
      }
    };

    return (
      <>
        <ToastContainer />
        <div className="modal-boxcon"></div>
        {loadingDelete ? (
          <div style={{ width: 250, height: 100 }} className="modal-delete">
            <div className="spinner-edit">
              <TailSpin color={"#F4BD18"} height={50} width={50} />
            </div>
          </div>
        ) : (
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
                  setDeleteVideo("");
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deletingCust();
                }}
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
        )}
      </>
    );
  };

  return loadVideos ? (
    <>
      {showModal && <Modal />}
      <div className="dashboard-component2">
        <button onClick={settingModal} className="add-service" type="button">
          + Add new Banner
        </button>
        <div className="avialable-products-head">
          <div className="product-video">
            <p className="product-heads">Banners</p>
          </div>

          <div className="product-name">
            <p className="product-heads">Category</p>
          </div>
          <div className="product-id">
            <p className="product-heads">Id</p>
            <img src="./updown.png" className="updown" alt="updown" />
          </div>
          <div className="product-action">
            <p className="product-heads">Action</p>
            <img src="./updown.png" className="updown" alt="updown" />
          </div>
        </div>
        {banners.map((each) => (
          <div key={each._id} id={each._id} className="avialable-videos">
            <div className="product-video">
              <img
                style={{ cursor: "pointer" }}
                className="productvideo"
                width="560"
                height="315"
                src={each.image}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen="true"
              />
            </div>
            <div className="product-name">
              <p style={{ textTransform: "capitalize" }}>{each.category}</p>
            </div>
            <div className="product-id">
              <p>{each._id}</p>
            </div>
            <div className="product-action">
              <div className="actions-con">
                <button
                  onClick={() => {
                    setDeleteVideo(each._id);
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
      {deleteVideo !== "" && <DeleteModal />}
    </>
  ) : (
    <div className="loader-spinner-admin">
      <TailSpin color={"#F4BD18"} height={70} width={70} />
    </div>
  );
};
export default Banners;
