import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Loading from "../components/Loading";

function BMSingleBook({urduText, setUrduText}) {
  const { bookId } = useParams();

  // const [bookChapterData, setBookChapterData] = useState([]);
  // const [bookData , setBookData] = useState([]);
  // const [bookChapters, setBookChapters]  = useState([])
  // const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const[bookDetail, setBookDetail] = useState({});
  const[bookName, setBookName] = useState(null);

//   useEffect(() => {

//     try{
// setLoading(true)
//       fetch(
//         `https://abdullahsaeed-git.github.io/my-database/bulugh/book-detail/book-${bookId}.json`
//       )
//         .then((res) => res.json())
//         .then((data) => setBookDetail(data));
      
//       fetch(
//         `https://abdullahsaeed-git.github.io/my-database/bulugh/bulugh-books.json`
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           setBookName(data.find((b) => b.id == bookId));
//         });
//     } catch(error){
//       console.error("Error Has been Occurred: " , error)
//     } finally {
//       setTimeout(() => {
//         setLoading(false)
//       }, 200);
//     }
      
//     // setTimeout(() => {
//     //   setLoading(false)
      
//     // }, 100);

//   }, []);

//   // useEffect(() => {
//   //   // setTimeout(() => {

      
//   //   //   setLoading(false);
//   //   // }, 500);
//   //   // console.log(book)
//   // }, [ bookId]);




useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch both data sources in parallel
        const [bookDetailRes, booksRes] = await Promise.all([
          fetch(
            `https://abdullahsaeed-git.github.io/my-database/bulugh/book-detail/book-${bookId}.json`
          ),
          fetch(
            `https://abdullahsaeed-git.github.io/my-database/bulugh/bulugh-books.json`
          )
        ]);

        const bookDetailData = await bookDetailRes.json();
        const booksData = await booksRes.json();

        // Find the specific book from booksData
        const foundBook = booksData.find((b) => b.id == bookId);

        setBookDetail(bookDetailData);
        setBookName(foundBook);
      } catch (error) {
        console.error("Error Has been Occurred: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bookId]); // Added bookId dependency



  let summary;
  if (urduText) {
    summary = bookName?.summary?.urdu;
  } else {
    summary = bookName?.summary?.english;
  }

  
  if (loading) return <Loading />;

  if (!bookDetail || !bookName) return <h1 className="text-center m-3"> No Book Found</h1>
  return (
    <>

      <main>
        <div className="container py-4">
          <p className="lead mt-5" style={{ cursor: "pointer" }}>
            <span
              href="#"
              className={`px-2 py-2  border border-2 border-white text-body-emphasis fw-bold fs-6 border-end-0 ${
                !urduText && "bg-success"
              }`}
              onClick={() => setUrduText(false)}
            >
              English
            </span>
            <span
              href="#"
              className={`px-2 py-2  border border-2 border-white text-body-emphasis fw-bold fs-6 border-start-0 ${
                urduText && "bg-success"
              }`}
              onClick={() => setUrduText(true)}
            >
              Urdu
            </span>
          </p>

          <div
            className="p-5 mb-4 bg-body-tertiary rounded-3  single-book-data-container "
            style={{}}
          >
            <div className="container-fluid py-5 single-book-data col-md-7 m-0">
              <h3 className="display-5 fw-bold">{bookName?.name?.english}</h3>
              <p className="mt-4" style={{ textAlign: "", lineHeight: "2rem" }}>
                {urduText ? bookName?.description?.urdu : bookName?.description?.english}
              </p>
              {summary && (
                <button
                  className="btn btn-primary btn-lg"
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
                src={`/assets/bulugh-al-maram/books/${bookId}.png`}
                alt=""
                style={{ width: "80%", borderRadius: "50%" }}
                className="kitab-image"
              />
            </div>
          </div>

          <h1 className="text mb-4 d-flex justify-content-center">
            {!bookDetail ? (
              <span>No Chapter found</span>
            ) : urduText ? (
              <span
                className=" mx-3 arabic-heading-center arabic"
                style={{ justifySelf: "" }}
              >
                {" "}
                ابواب
              </span>
            ) : (
              <span> Chapters </span>
            )}
          </h1>
          <div className="row align-items-md-stretch justify-content-center "
           style={{flexWrap: ""}}
           >
            {bookDetail.chapters?.map((ch, i) => (
              <Link
                to={`/bulugh-al-maram/chapter/${ch.id}`}
                key={i}
                className="col-lg-4 col-md-4 col-sm-6 my-4  position-relative text-light "
                style={{ textDecoration: "none" }}
              >
                <div
                  className={`h-100 p-4 ${
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
                <span className="position-absolute top-0 start-50 px-4 translate-middle badge rounded-pill bg-secondary fs-6">
                  {i + 1}
                  <span className="visually-hidden">Index</span>
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
          <footer className="pt-3 mt-4 text-body-secondary border-top ">
            © 2025
          </footer>
        </div>
      </main>
    </>
  );
}

export default BMSingleBook;
