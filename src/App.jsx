import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [blog, setBlog] = useState([]);

  const API = "http://localhost:3000/blogs";

  const [id, setID] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [img, setImage] = useState("");



  useEffect(() => {

    fetch(API,
      {
        method: "GET",
        headers:
        {
          "Content-Type": "application/json"
        }
      })
      .then((response) => {

        response.json().then((data) => {

          console.log(data);
          setBlog(data);

        });

      });

  }, []);




  const handleClick = (e) => {
    e.preventDefault();
    const blogs =
    {
      title,
      author,
      description,
      img,
      date
    };



    if (!id) {
      fetch(API,
        {
          method: "POST",
          headers:
          {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(blogs)
        })
        .then((response) => {

          response.json().then((data) => {
            console.log(data);
            setBlog([...blog, data]);
            setTitle("");
            setAuthor("");
            setDescription("");
            setImg("");
            setDate("");

          });

        });

    }


    else {

      fetch(`${API}/${id}`,
        {
          method: "PUT",
          headers:
          {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(blogs)
        })
        .then((response) => {

          response.json().then((data) => {

            console.log(data);

            setBlog(
              blog.map((item) =>
                item.id === id ? data : item
              )
            );

            setID("");
            setTitle("");
            setAuthor("");
            setDescription("");
            setImage("");
            setDate("");

          });

        });

    }

  };


  const handleEdit = (edit) => {

    setID(edit.id);
    setTitle(edit.title);
    setAuthor(edit.author);
    setDescription(edit.description);
    setImage(edit.img);
    setDate(edit.date);

  };


  const handleDelete = (id) => {
    fetch(`${API}/${id}`,
      {
        method: "DELETE"
      })
      .then(() => {
        setBlog(
          blog.filter((item) => item.id !== id)
        );

      });

  };


  return (
    <>


      <form className="container mt-4" onSubmit={handleClick}>
        <div className="card shadow p-4 mx-auto" style={{ maxWidth: "900px" }}>
          <h1 className="text-center mb-4 form">Tech Blog</h1>

          <div className="row g-3">

            <div className="col-md-6">
              <label className="form-label">Title</label>
              <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter blog title" />
            </div>


            <div className="col-md-6">
              <label className="form-label">Author</label>
              <input type="text" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Enter author name" />
            </div>


            <div className="col-md-6">
              <label className="form-label">Image</label>
              <input type="text" className="form-control" value={img} onChange={(e) => setImage(e.target.value)} placeholder="Enter image URL" />
            </div>


            <div className="col-md-6">
              <label className="form-label">Date</label>
              <input type="text" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Enter date" />
            </div>


            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter blog description"></textarea>
            </div>

          </div>


          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary px-5">{(!id) ? "Add Blog" : "Update Blog"}</button>
          </div>

        </div>

      </form>



      <h1 className="text-center mt-4">
        My Blogs
      </h1>


      <div className="container mt-4">

        <div className="row g-4">

          {blog.map((item, index) => (

            <div className="col-md-4" key={index}>
              <div className="card h-100 shadow">

                <img
                  src={item.img}
                  className="card-img-top"
                  style={{
                    height: "200px",
                    objectFit: "cover"
                  }}
                  alt={item.title}
                />

                <div className="card-body">
                  <h4>{item.title}</h4>
                  <h6>Author : {item.author}</h6>
                  <p>{item.description}</p>
                  <p>Date : {item.date}</p>


                  <div className="d-flex gap-2 mt-3">
                    <button className="btn btn-warning" onClick={() => handleEdit(item)}>Update</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </>
  );
}

export default App;