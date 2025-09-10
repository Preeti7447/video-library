import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { VideoContract } from "../contracts/video-contract";
import axios from "axios";
import { addToSaveList } from "../slicers/video-slicer";
import { useDispatch } from "react-redux";
import store from "../store/store";

export function UserDash() {
  const [cookies, setCookie, removeCookie] = useCookies(["user_id"]);
  const [videos, setVideos] = useState<VideoContract[]>();

  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("http://127.0.0.1:4040/videos").then((response) => {
      setVideos(response.data);
    });
  }, []);

  function SignoutClick() {
    removeCookie("user_id");
    navigate("/");
  }

  function AddToWatchLaterClick(video: VideoContract) {
    dispatch(addToSaveList(video));
    alert("Added To Your Watch List");
  }

  function ViewSavedList() {
    console.log(store.getState().videos);
  }

  return (
    <div>
      <h3 className="d-flex mt-4 justify-content-between">
        <span>
          {cookies["user_id"]}
          <button
            className="bi bi-plus btn"
            onClick={ViewSavedList}
          >
            My List
          </button>
        </span>
        User Dash
        <button
          onClick={SignoutClick}
          className="btn btn-link text-black"
        >
          Signout
        </button>
      </h3>

      <div className="my-3 w-50">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search Videos: Java, Aws, React"
          />
          <button className="btn btn-warning bi bi-search"></button>
        </div>
      </div>

      <section className="d-flex flex-wrap">
        {videos?.map((video, index) => (
          <div
            className="card m-2 p-2"
            style={{ width: "300px" }}
            key={video.video_id ?? index}
          >
            <div className="card-header">
              <iframe
                height="200px"
                width="100%"
                src={video.url}
              ></iframe>
            </div>
            <div className="card-body">
              <div className="fw-bold">{video.title}</div>
              <p>{video.description}</p>
            </div>
            <div className="card-footer">
              <button className="btn bi bi-hand-thumbs-up">
                {video.likes}
              </button>
              <button className="btn bi bi-hand-thumbs-down">
                {video.dislikes}
              </button>
              <button className="btn bi bi-eye-fill">
                {video.views}
              </button>
              <button
                className="btn bi bi-plus"
                onClick={() => {
                  AddToWatchLaterClick(video);
                }}
              >
                Watch Later
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
