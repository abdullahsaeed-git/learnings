import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Loading from "../components/Loading";

function BMSingleChapter() {
  const { bookSlug, chapterSlug } = useParams();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [urduText, setUrduText] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://abdullahsaeed-git.github.io/my-database/bulugh-al-maram.json"
    )
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    if (!data.books) return;

    const book = data.books.find((b) => b.bookSlug === bookSlug);
    setBook(book);

    if (book && book.chapters) {
      const chapter = book.chapters.find(
        (ch) => ch.chapterSlug === chapterSlug
      );
      setChapter(chapter);
      //  const hadith = chapter.hadiths.find((h) => h.id == hadithId);
      //  setHadith(hadith);
      // console.log("hadith", hadith);
    }

    setLoading(false);
  }, [data, bookSlug, chapterSlug]);

const PreviousChapter = () => {
  if (chapter.id > 1) {
    const chapteridToGo = chapter.id - 1;
    const prevChap = book.chapters.find((c) => c.id === chapteridToGo);
    if (prevChap) {
      navigate(`/bulugh-al-Maram/${bookSlug}/${prevChap.chapterSlug}`);
    }
  }
};

  const NextChapter = () => {
    // console.log(book.chapters.length)
    if (chapter.id < book?.chapters.length) {

      const chapteridToGo = Number(chapter.id) + 1;
      const nextchap = book.chapters.find((c) => c.id === chapteridToGo);
      if(nextchap){
        navigate(`/bulugh-al-Maram/${bookSlug}/${nextchap.chapterSlug}`);
      }
      

    }
  };

  let summary;
  if (urduText) {
    summary = chapter?.summary?.urdu;
  } else {
    summary = chapter?.summary?.english;
  }


  if (!chapter) return <div className="container">Chapter not found</div>;

  if (loading) return <Loading />;

  return (
    <>
      <header class="border-bottom lh-2 py-4  d-flex align-items-center justify-content-center">
        <nav
          className="bm-breadcrumb-nav text-light w-100 text-center"
          aria-label="breadcrumb"
        >
          <ol
            class="breadcrumb mb-0"
            style={{
              display: "flex",
              flexWrap: "wrap",

              justifyContent: "center",
              flexDirection: urduText && "row-reverse",
              // padding: "0 10px"
            }}
          >
            <li
              class={`breadcrumb-item ${urduText && "urdu"} `}
              style={{ textAlign: urduText && "right" }}
            >
              <Link
                to="/bulugh-al-Maram"
                className={`text-light decor-none ${urduText && "urdu "}`}
              >
                {urduText ? "بلوغ المرام" : "Bulugh Al Maram"}
              </Link>
            </li>
            <li class={`breadcrumb-item ${urduText && "urdu "} `}>
              <Link
                to={`/bulugh-al-Maram/${bookSlug}`}
                className={`text-light decor-none ${urduText && "urdu"}`}
              >
                {urduText ? book.name.arabic : book.name.english}
              </Link>
            </li>
            {/* <li class={`breadcrumb-item ${urduText && "urdu"} `}>
              <Link
                to={`/bulugh-al-Maram/${bookSlug}/${chapterSlug}`}
                className={`text-light decor-none ${urduText && "urdu"}`}
              ></Link>
            </li> */}
            <li
              class={`breadcrumb-item active  ${urduText && "urdu "} `}
              aria-current="page"
            >
              <span
                className="d-flex gap-1 "
                style={{ flexDirection: urduText && "row-reverse" }}
              >
                {urduText ? chapter.name.arabic : chapter.name.english}
              </span>
            </li>
          </ol>
        </nav>
      </header>

      <main class="container">
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
        <div class="p-4   my-4 rounded text-center text-body-emphasis bg-body-secondary position-relative">
          <h1 class=" arabic arabic-heading-center mb-3">
            {chapter.name.arabic}
          </h1>
          {urduText ? (
            <h4 class=" urdu urdu-center">({chapter.name.urdu})</h4>
          ) : (
            <h4 class="">({chapter.name.english})</h4>
          )}
          <p
            className="mt-4"
            style={{ textAlign: "center", lineHeight: "2rem" }}
          >
            {urduText
              ? chapter?.description?.urdu
              : chapter?.description?.english}{" "}
          </p>
          {/* <button
            class="btn btn-dark "
            type="button"
            onClick={() => {
              const el = document.getElementById("kitab-summary");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {urduText ? "« Khulasa" : "Summary »"}
          </button> */}
          <nav aria-label="Page navigation example ">
            <ul class="pagination pagination d-flex justify-content-center p-4">
              <li
                class="page-item "
                style={{
                  cursor: "pointer",
                  pointerEvents: chapter.id <= 1 && "none",
                  opacity: chapter.id <= 1 && 0.6,
                }}
              >
                <span
                  class="page-link"
                  aria-label="Previous"
                  onClick={() => PreviousChapter()}
                >
                  <span aria-hidden="true" className="fs-5">
                    &laquo;
                  </span>
                </span>
              </li>
              <li class="page-item ">
                <span
                  class="page-link"
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

              {/* <li class="page-item">
                            <a class="page-link" href="#">
                               
                            </a>
                          </li> */}

              <li class="page-item">
                <span
                  class="page-link "
                  to={""}
                  style={{
                    cursor: "pointer",
                    pointerEvents:
                      chapter.id >= book?.chapters.length && "none",
                    opacity: chapter.id >= book?.chapters.length && 0.6,
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

        <div class="row mb-2">
          <div class="col-12">
            {chapter?.hadiths.map((h, i) => (
              <div class="row g-0  border rounded overflow-hidden flex-md-row my-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static decor-none text-light gap-4">
                  <div
                    className={`d-flex justify-content-start  align-items-center  `}
                    style={{
                      flexDirection: urduText ? "row-reverse" : "",
                      flexWrap: "wrap",
                    }}
                  >
                    {h.references.map((r) => (
                      <div className="">
                        <strong
                          class="d-inline-block  text-primary-emphasis arabic"
                          style={{ fontSize: "0.8rem" }}
                        >
                          {urduText ? r.arabic : r.english}
                        </strong>
                        <span className="mx-2">|</span>
                      </div>
                    ))}
                  </div>
                  <div
                    className=" rounded-3 p-4 border"
                    onClick={() => navigate(`${h.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <h4 class=" arabic " style={{lineHeight: 2}}>{h.name.arabic}</h4>
                    {urduText ? (
                      <p class="card-text urdu" style={{lineHeight: 2}}>{h.name.urdu}</p>
                    ) : (
                      <p class="card-text ">{h.name.english}</p>
                    )}
                  </div>
                  <div
                    className={`d-flex justify-content-start gap-2`}
                    style={{
                      flexDirection: urduText && "row-reverse",
                      flexWrap: "wrap",
                    }}
                  >
                    {h.narrators.map((n) => (
                      <span
                        class="badge text-bg-success px-2 py-2 mx-1 decor-none "
                        style={{ fontSize: "0.8rem", cursor: "pointer" }}
                        onClick={() => {
                          const url = n.narratorSlug;
                          navigate(`/sahaba/${url}`);
                        }}
                      >
                        {urduText ? n.arabic : n.english}
                      </span>
                    ))}
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
