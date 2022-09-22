import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPost, setEdit, updatepost } from "./redux/features/PostSlice";
import Spinner from "./Spinner";
const Posts = () => {
  const [id, setid] = useState();
  const dispatch = useDispatch();
  const [textbody, settextbody] = useState("");
  const { loading, post, body, edit } = useSelector((state) => ({
    ...state.post,
  }));

  useEffect(() => {
    if (body) {
      settextbody(body);
    }
  }, [body]);
  const navi = useNavigate();
  const handleFetchData = (e) => {
    e.preventDefault();
    if (!id) {
      window.alert("Plase provide Post");
    } else {
      dispatch(getPost({ id }));
      setid("");
    }
  };
  const handleDelete = ({ id }) => {
    dispatch(deletePost({ id: post[0].id }));
    window.location.reload();
    window.alert("post Delete");
  };
  return (
    <>
      <div className="row d-flex mt-4 align-items-center justify-content-center">
        <div className="col-md-8">
          <form action="">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Search By ID:
              </label>
              <input
                type="number"
                value={id}
                onChange={(e) => setid(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleFetchData}
            >
              Fetch Post
            </button>
            <button
              type="button"
              className="btn btn-warning  ms-4 "
              onClick={() => navi("/createpost")}
            >
              Create Post
            </button>
          </form>
        </div>
      </div>
      <div className="container">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {post.length > 0 && (
              <>
                <div className="card mt-4">
                  <div className="card-body">
                    <h5 className="card-title">{post[0].title}</h5>
                    {edit ? (
                      <>
                        <textarea
                          className="form-control"
                          value={textbody}
                          id="floatingTextarea"
                          defaultValue={""}
                          onChange={(e) => settextbody(e.target.value)}
                        />
                        <div className="d-flex mt-4 align-items-center justify-content-center ">
                          <button className="btn btn-primary"onClick={()=>{
                            dispatch(updatepost({
                              id:post[0].id,
                              title:post[0].title,
                              body:textbody
                            }))
                            dispatch(setEdit({edit:false,body:""}))
                          }}>Save</button>
                          <button className="btn btn-danger ms-4">
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="card-text">{post[0].body}</p>
                      </>
                    )}
                    {!edit&&(
                      <div className="d-flex mt-4 align-items-center justify-content-center ">
                      <button
                        className="btn btn-primary"
                        onClick={()=>dispatch(
                          setEdit({ edit: true, body: post[0].body })
                        )}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger ms-4"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </div>
                    )}
                    
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Posts;
