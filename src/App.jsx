import { useState, useEffect } from "react";

function App() {

  const [blog, setBlog] = useState([]);

  useEffect(() => {

    fetch("http://localhost:3000/blogs")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBlog(data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  return (
    <>
      <h1 className="text-center mt-4"> My Blogs</h1>

      <div className="container mt-4">
        <div className="row g-4">

          {blog.map((item, index) => {
            return (
              <div className="col-md-4" key={index}>

                <div className="card h-100 shadow">

                  <img src={item.img} className="card-img-top"style={{ height: "200px", objectFit: "cover" }}/>

                  <div className="card-body">
                    <h4>{item.title}</h4>
                    <h6>Author : {item.author}</h6>
                    <p>{item.description}</p>
                    <p>Date : {item.date}</p>
                  </div>

                </div>

              </div>
            );

          })}

        </div>

      </div>
    </>
  );
}

export default App;