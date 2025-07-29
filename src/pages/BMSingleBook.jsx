import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Loading from "../components/Loading";

function BMSingleBook() {
  const { bookSlug } = useParams();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState(null);
  const [urduText, setUrduText] = useState(true);

  useEffect(() => {
    fetch(
      "https://abdullahsaeed-git.github.io/my-database/bulugh-al-maram.json"
    )
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const book = data.books.find((b) => b.bookSlug === bookSlug);
      setBook(book);
      setLoading(false);
    }, 500);
  }, [data, bookSlug]);

  let summary;
  if (urduText) {
    summary = book?.summary?.urdu;
  } else {
    summary = book?.summary?.english;
  }

  
  if (loading) return <Loading />;

  if (!book ) return <h1 className="text-center m-3"> No Book Found</h1>
  return (
    <>
      {/* <div>BMSingleBook ({bookSlug})</div> */}

      <main>
        <div class="container py-4">
          <p class="lead mt-5" style={{ cursor: "pointer" }}>
            <span
              href="#"
              class={`px-2 py-2  border border-2 border-white text-body-emphasis fw-bold fs-6 border-end-0 ${
                !urduText && "bg-success"
              }`}
              onClick={() => setUrduText(false)}
            >
              English
            </span>
            <span
              href="#"
              class={`px-2 py-2  border border-2 border-white text-body-emphasis fw-bold fs-6 border-start-0 ${
                urduText && "bg-success"
              }`}
              onClick={() => setUrduText(true)}
            >
              Urdu
            </span>
          </p>
          <div
            class="p-5 mb-4 bg-body-tertiary rounded-3  single-book-data-container "
            style={{}}
          >
            <div class="container-fluid py-5 single-book-data col-md-7 m-0">
              <h3 class="display-5 fw-bold">{book?.name.english}</h3>
              <p className="mt-4" style={{ textAlign: "", lineHeight: "2rem" }}>
                {urduText ? book.description?.urdu : book.description?.english}
              </p>
              {summary && (
                <button
                  class="btn btn-primary btn-lg"
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("kitab-summary");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {urduText ? "خلاصہ »»" : "Summary »"}
                </button>
              )}
            </div>
            <div className="col-md-4 text-center">
              <img
                src={`/assets/bulugh-al-maram/books/${book.id}.png`}
                alt=""
                srcset=""
                style={{ width: "80%", borderRadius: "50%" }}
                className="kitab-image"
              />
            </div>
          </div>
          <h1 className="text mb-4 d-flex justify-content-center">
            {!book.chapters ? (
              <span>No Chapter found</span>
            ) : urduText ? (
              <span
                class=" mx-3 arabic-heading-center arabic"
                style={{ justifySelf: "" }}
              >
                {" "}
                ابواب
              </span>
            ) : (
              <span> Chapters </span>
            )}
          </h1>
          <div class="row align-items-md-stretch justify-content-center">
            {book.chapters?.map((ch, i) => (
              <Link
                to={`/bulugh-al-Maram/${book.bookSlug}/${ch.chapterSlug}`}
                class="col-lg-3 col-md-4 col-sm-6 my-4  position-relative text-light "
                style={{ textDecoration: "none" }}
              >
                <div
                  class={`h-100 p-4 ${
                    i % 2 === 0 ? "bg-body-tertiary" : "text-bg-dark"
                  }  border rounded-3 single-book-chap-card d-flex flex-column gap-3`}
                >
                  <h3 className="text-center arabic fw-semibold">
                    {ch.name.arabic}{" "}
                  </h3>
                  {urduText ? (
                    <p className="urdu fw-semibold">{ch.name.urdu}</p>
                  ) : (
                    <p>{ch.name.english}</p>
                  )}
                </div>
                <span class="position-absolute top-0 start-50 px-4 translate-middle badge rounded-pill bg-secondary fs-6">
                  {i + 1}
                  <span class="visually-hidden">Index</span>
                </span>
              </Link>
            ))}
          </div>
          {summary && (
            <div
              className="alert alert-secondary"
              id="kitab-summary"
              style={{ textAlign: urduText && "end" }}
            >
              <div className="h2 mb-4">{urduText ? "خلاصہ" : "Summary"} </div>
              {summary?.map((s) => (
                <>
                  <li
                    className="alert alert-info"
                    style={{
                      display: "flex",
                      flexDirection: urduText && "row-reverse",
                    }}
                  >
                    <span className="mx-2">{urduText ? "‹‹‹" : "›››"}</span> {s}
                  </li>
                  <li
                    className="alert alert-light"
                    style={{
                      display: "flex",
                      flexDirection: urduText && "row-reverse",
                    }}
                  >
                    <span className="mx-2">{urduText ? "‹‹‹" : "›››"}</span> {s}
                  </li>
                </>
              ))}
            </div>
          )}
          <footer class="pt-3 mt-4 text-body-secondary border-top ">
            © 2025
          </footer>
        </div>
      </main>
    </>
  );
}

export default BMSingleBook;
