import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createpost } from "./redux/features/PostSlice";
import Spinner from "./Spinner";
const CreatePost = () => {
  const [values, setvalues] = useState({ title: "", body: "" });
  const [Show, setShow] = useState(false);
  const { loading, post } = useSelector((state) => ({ ...state.post }));
  const { title, body } = values;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createpost({ values }));
    setvalues({ title: "", body: "" });
    setShow(true);
  };
  const showCreatedPost = () => {
    return (
      <>
        {loading ? (
          <Spinner />
        ) : (
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">{post[0].title}</h5>
              <p className="card-text">{post[0].body}</p>
            </div>
          </div>
        )}
      </>
    );
  };
  return (
    <div>
      <h1 className="text-center bg-dark  text-white p-2">Create Post</h1>
      <form action="">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Post title"
            onChange={(e) => setvalues({ ...values, title: e.target.va })}
          />
        </div>
        <div className="form-floating">
          <textarea
            className="form-control"
            value={body}
            onChange={(e) => setvalues({ ...values, body: e.target.value })}
            placeholder="Leave a comment here"
            id="floatingTextarea"
            defaultValue={""}
          />
          <label htmlFor="floatingTextarea">Add post description</label>
        </div>
        <div className="d-flex mt-4 align-items-center justify-content-center ">
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Go home
          </button>
          <button
            className="btn btn-danger ms-4"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
      <div className="mt-4">
        {
            Show&&<div>{showCreatedPost()}</div>
        }
      </div>
    </div>
  );
};

export default CreatePost;
