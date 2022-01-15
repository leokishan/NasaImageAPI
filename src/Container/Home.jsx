import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/home.css";
import DetailsModal from "../Component/DetailModal";
import LikeIcon from "../images/like.png";
import BorderedLikeIcon from "../images/bordered-like.png";

const HomePage = () => {
  const [imageList, setImageList] = useState([]);
  const [modalDetail, setModalDetail] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let preFetch = localStorage.getItem("imageList");
    if (preFetch) {
      setImageList(JSON.parse(preFetch));
    } else {
      getImages();
    }
  }, []);

  const getImages = () => {
    setLoading(true);
    axios
      .get("https://api.nasa.gov/planetary/apod", {
        params: {
          api_key: "PwTl728r7zEa3zniMpIDKh7idDryqkygcmehR4JV",
          count: 20,
        },
      })
      .then((response) => {
        let fetchedList = response.data.map((ele) => ({
          ...ele,
          excerpt: ele.explanation?.substring(0, 120) || "",
          liked: false,
        }));
        setTimeout(() => {
          setImageList(fetchedList);
          localStorage.setItem("imageList", JSON.stringify(fetchedList));
          setLoading(false);
        }, 2000);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  const openModal = (e) => {
    if (e?.target?.dataset?.id) {
      setModalDetail(imageList[e?.target?.dataset?.id]);
    }
  };

  const toggleLike = (e) => {
    if (e?.target?.dataset?.id) {
      let newList = [...imageList];
      newList[e?.target?.dataset?.id].liked =
        !newList[e?.target?.dataset?.id].liked;
      setImageList(newList);
      localStorage.setItem("imageList", JSON.stringify(newList));
    }
  };

  const closeModal = () => setModalDetail({});

  return (
    <div className="home-container">
      <div className="home-title">
        Astronomy Picture of the Day&emsp;
        <button className="btn btn-primary" onClick={getImages}>
          Refresh list
        </button>
      </div>
      <div className="card-container">
        {loading
          ? "Please wait till image list is fetched..."
          : imageList.map((ele, i) => (
              <div key={i} className="card">
                <img src={ele.url} alt={ele.title} className="card-image" />
                <div className="card-details">
                  <p className="card-title">{ele.title}</p>
                  <p className="card-subtitle">{ele.date}</p>
                </div>
                <img
                  src={ele.liked ? LikeIcon : BorderedLikeIcon}
                  alt="Like icon"
                  className="like-icon"
                  data-id={i}
                  onClick={toggleLike}
                />
                <p className="card-description">
                  {ele.excerpt}...{" "}
                  <span data-id={i} className="read-more" onClick={openModal}>
                    Read more
                  </span>
                </p>
              </div>
            ))}
      </div>
      <DetailsModal modalDetail={modalDetail} handleClose={closeModal} />
    </div>
  );
};

export default HomePage;
