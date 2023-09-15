import { useState, useEffect } from "react";
import "./index.css";

import { TailSpin } from "react-loader-spinner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Videos = () => {
  const [loadVideos, setLoadVideos] = useState(true);

  const [deleteVideo, setDeleteVideo] = useState("");

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/videosApi`
    );
    const data = await response.json();
    if (response.ok) {
      setVideos(data.videos);
    }
  };

  const [showModal, setModal] = useState(false);
  const settingModal = () => {
    setModal(!showModal);
  };

  const Modal = () => {
    const [dataTobeSent, setData] = useState({ name: "", link: "" });
    const [eventLoad, setEventLoad] = useState(true);

    const addingEvent = (event) => {
      if (event.target.id === "service-name-admin") {
        setData((prevData) => ({ ...prevData, name: event.target.value }));
      } else if (event.target.id === "file") {
        setData((prevData) => ({ ...prevData, link: event.target.value }));
      }
    };

    const updatingEvent = async () => {
      if (dataTobeSent.name === "") {
        toast.error("Please Enter Video Name", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (dataTobeSent.link === "") {
        toast.error("Please upload link", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (dataTobeSent.link !== "") {
        if (!dataTobeSent.link.includes("embed")) {
          toast.error("Please Upload Embed Video Link", {
            position: "top-center",
            autoClose: 2000,
            pauseOnHover: true,
            closeOnClick: true,
            theme: "colored",
          });
        } else {
          setEventLoad(false);

          try {
            const reqConfigure = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(dataTobeSent),
            };

            const res = await fetch(
              `${process.env.REACT_APP_ROOT_URL}/api/admin/video/addVideo`,
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
                getVideos();
              }, 2000);
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    };

    return eventLoad ? (
      <>
        <ToastContainer />
        <div className="modal-boxcon"></div>
        <form className="modal-box3">
          <h1 style={{ marginBottom: 10, color: "#3E3E3E", fontSize: 20 }}>
            Add New Video
          </h1>
          <lable
            style={{ height: 25, marginBottom: 1 }}
            htmlFor="service-name-admin"
          >
            Video Title
          </lable>
          <input
            className="service-admin-input"
            id="service-name-admin"
            type="text"
            style={{ height: 25, marginBottom: 10 }}
            onChange={addingEvent}
          />
          <label
            style={{ height: 25, marginBottom: 1 }}
            htmlFor="service-image-admin"
          >
            Upload new video link
          </label>
          <input
            id="file"
            style={{ height: 25, marginBottom: 10 }}
            className="service-admin-input"
            onChange={addingEvent}
            type="text"
          />
          <div className="service-button-admin-con-event">
            <button
              className="service-button-admin"
              onClick={updatingEvent}
              type="button"
              style={{ height: 25 }}
            >
              Add
            </button>
            <button
              style={{ height: 25 }}
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
      const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/video/deleteVideo/${deleteVideo}`;

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
          getVideos();
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
          + Add new Video
        </button>
        <div className="avialable-products-head">
          <div className="product-video">
            <p className="product-heads">Videos</p>
          </div>

          <div className="product-name">
            <p className="product-heads">Name</p>
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
        {videos.map((each) => (
          <div key={each._id} id={each._id} className="avialable-videos">
            <div className="product-video">
              <iframe
                style={{ cursor: "pointer" }}
                className="productvideo"
                width="560"
                height="315"
                src={each.link}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen="true"
              ></iframe>
            </div>
            <div className="product-name">
              <p style={{ textTransform: "capitalize" }}>{each.name}</p>
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
export default Videos;
