import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Loading from "../components/Loading";

function BMMain() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/assets/bulugh/bulugh-books.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [data]);

  if (loading) return <Loading />;
  return (
    
    <>
      <main>
        <div
          id="myCarousel"
          class="carousel slide mb-5 text-light"
          data-bs-ride="carousel"
        >
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide-to="0"
              class="active"
              aria-label="Slide 1"
              aria-current="true"
            ></button>
            <button
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide-to="1"
              aria-label="Slide 2"
              class=""
            ></button>
            <button
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide-to="2"
              aria-label="Slide 3"
              class="text-light"
            ></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active ">
              <img
                src="https://images.unsplash.com/photo-1587617425953-9075d28b8c46?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                srcset=""
                width="100%"
                style={{ height: "70vh", objectFit: "cover", opacity: "0.7" }}
              />
              <div class="container">
                <div class="carousel-caption text-start text-light">
                  <h1 className="">Essence of Islamic Teachings </h1>
                  <p class="opacity-75">
                    Explore Hadiths that shape the foundation of daily Muslim
                    life.
                  </p>
                  <p>
                    <a class="btn btn-lg btn-primary" href="#">
                      Start Reading
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                srcset=""
                width="100%"
                style={{ height: "70vh", objectFit: "cover", opacity: "0.7" }}
              />
              <div class="container">
                <div class="carousel-caption text-light">
                  <h1>From Knowledge to Action</h1>
                  <p>
                    Authentic narrations guiding you through worship, ethics,
                    and law
                  </p>
                  <p>
                    <a class="btn btn-lg btn-primary" href="#">
                      View Chapters
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1570206916435-745fc43bb9c1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                srcset=""
                width="100%"
                style={{ height: "70vh", objectFit: "cover", opacity: "0.7" }}
              />
              <div class="container">
                <div class="carousel-caption text-end text-light">
                  <h1>The Light of the Prophet ﷺ</h1>
                  <p>Learn what the Prophet ﷺ said, did, and approved.</p>
                  <p>
                    <a class="btn btn-lg btn-primary" href="#">
                      Search Hadith
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

        <div class="container marketing">
          <h1 className="text-center mb-4">
            {!data ? <h1>No Books Found</h1> : "Books"}
             {/* <small className=" mx-3 float-end arabic"> کتابیں</small> */}
            {" "}
          </h1>
          <div class="row">
             {data?.map((book, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-4 col-6 mb-5 "
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <img
                  src={`/assets/bulugh-al-maram/books/${book.id}.png`}
                  alt=""
                  srcSet=""
                  width={150}
                  height={150}
                  style={{ borderRadius: "50%", justifySelf: "center" }}
                />
                <h2 className="  mt-2" style={{ fontSize: "1.4rem" }}>
                  {book.name.english}
                </h2>
                <p></p>
                <p>
                  <Link
                    className="btn btn-secondary"
                    to={`/bulugh-al-maram/${book.id}`}
                  >
                    View details »
                  </Link>
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default BMMain;
