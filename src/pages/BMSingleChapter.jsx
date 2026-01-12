import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import Loading from "../components/Loading";

function BMSingleChapter({urduText, setUrduText}) {
  const { chapterId } = useParams();
  const [loading, setLoading] = useState(true);
  const [chapterDetail, setChapterDetail] = useState(null);
  const [chapterName, setChapterName] = useState(null);
  const [bookName, setBookName] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  //   useEffect(() => {

  //     try{
  // setLoading(true)
  //       fetch(
  //         `https://abdullahsaeed-git.github.io/my-database//bulugh/chapter-detail/chapter-${chapterId}.json`
  //       )
  //         .then((res) => res.json())
  //         .then((data) => {
  //           const bookId = data.bookId;
  //           setChapterDetail(data);

  //           fetch(
  //             `https://abdullahsaeed-git.github.io/my-database/bulugh/book-detail/book-${bookId}.json`
  //           )
  //             .then((res) => res.json())
  //             .then((bookDetailData) => {
  //               setBookDetail(bookDetailData);
  //               setChapterName(
  //                 bookDetailData.chapters.find((c) => c.id == chapterId)
  //               );
  //             });

  //           fetch(
  //             `https://abdullahsaeed-git.github.io/my-database/bulugh/bulugh-books/bulugh-books.json`
  //           )
  //             .then((res) => res.json())
  //             .then((bulughBooksData) => {
  //               setBulughBooks(bulughBooksData);
  //               setBookName(bulughBooksData.find((b) => b.id == bookId));
  //             });
  //         });

  //     }catch(error){
  //       console.error("Error in Single Chapter: " , error)
  //     }finally{
  //       setTimeout(() => {
  //         setLoading(false);

  //       }, 300);
  //     }
  //   }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // First fetch chapter detail
        const chapterRes = await fetch(
          `https://abdullahsaeed-git.github.io/my-database/bulugh/chapter-detail/chapter-${chapterId}.json`
        );
        const chapterData = await chapterRes.json();
        setChapterDetail(chapterData);

        const bookId = chapterData.bookId;

        // Now fetch book detail and books data in parallel
        const [bookDetailRes, booksRes] = await Promise.all([
          fetch(
            `https://abdullahsaeed-git.github.io/my-database/bulugh/book-detail/book-${bookId}.json`
          ),
          fetch(
            `https://abdullahsaeed-git.github.io/my-database/bulugh/bulugh-books/bulugh-books.json`
          ),
        ]);

        const bookDetailData = await bookDetailRes.json();
        const bulughBooksData = await booksRes.json();

        setChapterName(bookDetailData.chapters.find((c) => c.id == chapterId));
        setBookName(bulughBooksData.find((b) => b.id == bookId));
      } catch (error) {
        console.error("Error in Single Chapter: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location, chapterId]); // Added chapterId to dependencies

  const PreviousChapter = () => {
    if (chapterId > 1) {
      const chapteridToGo = Number(chapterId) - 1;
      navigate(`/bulugh-al-maram/chapter/${chapteridToGo}`);
    }
  };

  const NextChapter = () => {
    if (chapterId < 107) {
      const chapteridToGo = Number(chapterId) + 1;
      navigate(`/bulugh-al-maram/chapter/${chapteridToGo}`);
    }
  };

  let summary;
  if (urduText) {
    summary = chapterDetail?.summary?.urdu;
  } else {
    summary = chapterDetail?.summary?.english;
  }

  if (loading) return <Loading />;

  if (!chapterDetail)
    return <h3 className="text-center m-3">Chapter Not Found</h3>;

  return (
    <>
      <header className="border-bottom lh-2 py-4  d-flex align-items-center justify-content-center">
        <nav
          className="bm-breadcrumb-nav text-light w-100 text-center"
          aria-label="breadcrumb"
        >
          <ol
            className="breadcrumb mb-0"
            style={{
              display: "flex",
              flexWrap: "wrap",

              justifyContent: "center",
              flexDirection: urduText && "row-reverse",
              // padding: "0 10px"
            }}
          >
            <li
              className={`breadcrumb-item ${urduText && "urdu"} `}
              style={{ textAlign: urduText && "right" }}
            >
              <Link
                to="/bulugh-al-Maram"
                className={`text-light decor-none ${urduText && "urdu "}`}
              >
                {urduText ? "بلوغ المرام" : "Bulugh Al Maram"}
              </Link>
            </li>
            <li className={`breadcrumb-item ${urduText && "urdu "} `}>
              <Link
                to={`/bulugh-al-maram/${chapterDetail.bookId}`}
                className={`text-light decor-none ${urduText && "urdu"}`}
              >
                {urduText ? bookName?.name.arabic : bookName?.name.english}
              </Link>
            </li>
            {/* <li className={`breadcrumb-item ${urduText && "urdu"} `}>
              <Link
                to={`/bulugh-al-Maram/${bookSlug}/${chapterSlug}`}
                className={`text-light decor-none ${urduText && "urdu"}`}
              ></Link>
            </li> */}
            <li
              className={`breadcrumb-item active  ${urduText && "urdu "} `}
              aria-current="page"
            >
              <span
                className="d-flex gap-1 "
                style={{ flexDirection: urduText && "row-reverse" }}
              >
                {urduText
                  ? chapterName?.name?.arabic
                  : chapterName?.name.english}
              </span>
            </li>
          </ol>
        </nav>
      </header>

      <main className="container">
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

        <div className="p-4   my-4 rounded text-center text-body-emphasis bg-body-secondary position-relative">
          <h1 className=" arabic arabic-heading-center mb-3">
            {chapterName?.name?.arabic}
          </h1>
          {urduText ? (
            <h4 className=" urdu urdu-center">({chapterName?.name?.urdu})</h4>
          ) : (
            <h4 className="">({chapterName?.name.english})</h4>
          )}
          <p
            className="mt-4"
            style={{ textAlign: "center", lineHeight: "2rem" }}
          >
            {urduText
              ? chapterDetail?.description?.urdu
              : chapterDetail?.description?.english}{" "}
          </p>

          <nav aria-label="Page navigation example ">
            <ul className="pagination pagination d-flex justify-content-center p-4">
              <li
                className="page-item "
                style={{
                  cursor: "pointer",
                  pointerEvents: chapterId <= 1 && "none",
                  opacity: chapterId <= 1 && 0.6,
                }}
              >
                <span
                  className="page-link"
                  aria-label="Previous"
                  onClick={() => PreviousChapter()}
                >
                  <span aria-hidden="true" className="fs-5">
                    &laquo;
                  </span>
                </span>
              </li>
              <li className="page-item ">
                <span
                  className="page-link"
                  aria-label="Previous"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    const el = document.getElementById("kitab-summary");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span aria-hidden="true" className="fs-5">
                    {summary ? (urduText ? "خلاصہ" : "Summary") : " - "}
                  </span>
                </span>
              </li>

              {/* <li className="page-item">
                            <a className="page-link" href="#">
                               
                            </a>
                          </li> */}

              <li className="page-item">
                <span
                  className="page-link "
                  to={""}
                  style={{
                    cursor: "pointer",
                    pointerEvents: chapterId >= 107 && "none",
                    opacity: chapterId >= 107 && 0.6,
                  }}
                  aria-label="Next"
                  onClick={() => {
                    NextChapter();
                  }}
                >
                  <span aria-hidden="true" className="fs-5">
                    &raquo;
                  </span>
                </span>
              </li>
            </ul>
          </nav>
        </div>

        <div className="row mb-2 ">
          <div className="col-12  ">
            {chapterDetail?.hadiths.map((h, i) => (
              <div
                key={i}
                className="row g-0  border border rounded overflow-hidden flex-md-row my-5 shadow-lg h-md-250 position-relative "
              >
                {/* <hr className="border border-primary border-3 opacity-75 "/> */}
                <div
                  className={` border-bottom bg-primary border px-3 py-2 fs-6 fw-bold  ${
                    urduText && "urdu"
                  }`}
                >
                  {h.id} حدیث
                </div>
                <div className="col p-4 d-flex flex-column position-static decor-none text-light gap-4">
                  <div
                    className=" rounded-3 d-flex "
                    onClick={() =>
                      navigate(`/bulugh-al-maram/hadith-detail/${h.id}`)
                    }
                    style={{
                      cursor: "pointer",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <h4
                      className=" arabic fs-4"
                      style={{ lineHeight: 2, flex: 1 }}
                    >
                      {h.name.arabic}
                    </h4>
                    {urduText ? (
                      <p
                        className="card-text  fs-5 urdu"
                        style={{ lineHeight: 2, flex: 1 }}
                      >
                        {h.name.urdu}
                      </p>
                    ) : (
                      <p className="card-text ">{h.name.english}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {summary && (
          <div
            className="alert alert-secondary"
            id="kitab-summary"
            style={{ textAlign: urduText && "end" }}
          >
            <div className="h3 mb-4">{urduText ? "خلاصہ" : "Summary"} </div>
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
      </main>
    </>
  );
}

export default BMSingleChapter;
