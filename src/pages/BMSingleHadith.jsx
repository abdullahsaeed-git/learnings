import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import Loading from "../components/Loading";

function BMSingleHadith({ urduText, setUrduText }) {
  // const { hadithDetail.hadithReferences.kitabId, hadithDetail.hadithReferences.kitabIdBab, hadithNo } = useParams();
  const { hadithId } = useParams();

  const [loading, setLoading] = useState(true);
  const [hadithDetail, setHadithDetail] = useState();
  const [hadithName, setHadithName] = useState();
  const [chapterDetail, setChapterDetail] = useState();
  const [bookName, setBookName] = useState();
  const [chapterName, setChapterName] = useState();
  const [editorPass, setEditorPass] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   try {
  //     setLoading(true)
  //     fetch(
  //       `https://abdullahsaeed-git.github.io/my-database/bulugh/hadith-detail/hadith-${hadithId}.json`
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setHadithDetail(data);

  //         fetch(
  //           `https://abdullahsaeed-git.github.io/my-database/bulugh/chapter-detail/chapter-${data.hadithReferences.babId}.json`
  //         )
  //           .then((res) => res.json())
  //           .then((chapterDetailData) => {
  //             setChapterDetail(chapterDetailData);
  //             setHadithName(
  //               chapterDetailData.hadiths.find((h) => h.id == hadithId)
  //             );
  //           });

  //         fetch(
  //           `https://abdullahsaeed-git.github.io/my-database/bulugh/bulugh-books.json`
  //         )
  //           .then((res) => res.json())
  //           .then((bulughBooksData) =>
  //             setBookName(
  //               bulughBooksData.find(
  //                 (b) => b.id == data.hadithReferences.kitabId
  //               )
  //             )
  //           );

  //         fetch(
  //           `https://abdullahsaeed-git.github.io/my-database/bulugh/book-detail/book-${data.hadithReferences.kitabId}.json`
  //         )
  //           .then((res) => res.json())
  //           .then((bookDetailData) =>
  //             setChapterName(
  //               bookDetailData.chapters.find(
  //                 (c) => c.id == data.hadithReferences.babId
  //               )
  //             )
  //           );
  //       });
  //   } catch (error) {
  //     console.error("Error in Single Hadith: ", error);
  //   }
  //   // finally {

  //   //   if(hadithDetail){
  //   //     setLoading(false)
  //   //   }
  //   //   // setTimeout(() => {
  //   //   // }, 300);
  //   // }

  //   // console.log(location)
  // }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // First, fetch the hadith detail
        const hadithRes = await fetch(
          `https://abdullahsaeed-git.github.io/my-database/bulugh/hadith-detail/hadith-${hadithId}.json`
        );
        const hadithData = await hadithRes.json();
        setHadithDetail(hadithData);

        // Now fetch all other data in parallel
        // const [chapterRes, booksRes, bookDetailRes] = await Promise.all([
        //   fetch(
        //     `https://abdullahsaeed-git.github.io/my-database/bulugh/chapter-detail/chapter-${hadithData.hadithReferences.babId}.json`
        //   ),
        //   fetch(
        //     `https://abdullahsaeed-git.github.io/my-database/bulugh/bulugh-books.json`
        //   ),
        //   fetch(
        //     `https://abdullahsaeed-git.github.io/my-database/bulugh/book-detail/book-${hadithData.hadithReferences.kitabId}.json`
        //   ),
        // ]);



        const chapterId = hadithData.hadithReferences.babId;
        const kitabId = hadithData.hadithReferences.kitabId;

        // Fetch all dependent data in parallel
        const [chapterRes, booksRes, bookDetailRes] = await Promise.all([
          fetch(
            `https://abdullahsaeed-git.github.io/my-database/bulugh/chapter-detail/chapter-${chapterId}.json`
          ),
          fetch(
            `https://abdullahsaeed-git.github.io/my-database/bulugh/bulugh-books.json`
          ),
          fetch(
            `https://abdullahsaeed-git.github.io/my-database/bulugh/book-detail/book-${kitabId}.json`
          ),
        ]);

        const chapterData = await chapterRes.json();
        const booksData = await booksRes.json();
        const bookDetailData = await bookDetailRes.json();

        // Set all states
        setChapterDetail(chapterData);
        setHadithName(chapterData.hadiths.find((h) => h.id == hadithId));
        setBookName(
          booksData.find((b) => b.id == hadithData.hadithReferences.kitabId)
        );
        setChapterName(
          bookDetailData.chapters.find(
            (c) => c.id == hadithData.hadithReferences.babId
          )
        );
      } catch (error) {
        console.error("Error in Single Hadith: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location, hadithId]); // Add hadithId to dependencies

  const NextHadith = () => {
    return `/bulugh-al-maram/hadith-detail/${Number(hadithId) + 1}`;
  };
  const PreviousHadith = () => {
    return `/bulugh-al-maram/hadith-detail/${Number(hadithId) - 1}`;
  };

  if (loading) return <Loading />;

  if (!hadithDetail)
    return <h3 className="text-center m-3">Hadith Not Found</h3>;

  return (
    <>
      {/* <div className="m-5 text-center h1"></div> */}

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
                to={`/bulugh-al-Maram/${hadithDetail.hadithReferences.kitabId}`}
                className={`text-light decor-none ${urduText && "urdu"}`}
              >
                {urduText ? bookName?.name.arabic : bookName?.name.english}
              </Link>
            </li>
            <li className={`breadcrumb-item ${urduText && "urdu"} `}>
              <Link
                to={`/bulugh-al-Maram/chapter/${hadithDetail.hadithReferences.babId}`}
                className={`text-light decor-none ${urduText && "urdu"}`}
              >
                {urduText
                  ? chapterName?.name.arabic
                  : chapterName?.name.english}
              </Link>
            </li>
            <li
              className={`breadcrumb-item active  ${urduText && "urdu "} `}
              aria-current="page"
            >
              <span
                className="d-flex gap-1 "
                style={{ flexDirection: urduText && "row-reverse" }}
              >
                {/* <span>{urduText ? "hadees" : "Hadith"} </span> */}
                <span>(Hadith No {hadithDetail.hadithNo})</span>
              </span>
            </li>
          </ol>
        </nav>
      </header>

      <main className="container-fluid p-lg-5 p-3 ">
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
        {/* <div className="d-flex align-items-center justify-content-center">
          {hadithDetail?.ytLink && (
            <div className="p-3 my-5 rounded text-body-emphasis bg-body-secondary lecture-video-container">
              <iframe
                width="656"
                height="369"
                src={hadithDetail?.ytLink}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          )}
        </div> */}
        <div className="px-4 px-md-5 pt-4  my-4 rounded text-body-emphasis bg-body-secondary">
          <div className="col-lg px-0 ">
            <div
              className="mb-3"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <span
                className={`badge rounded text-bg-${
                  hadithDetail?.grade?.arabic == "صحيح" ? "success" : "light"
                } p-3 arabic fs-6 `}
              >
                {hadithDetail?.grade?.arabic}
              </span>
            </div>
            <h3 className=" arabic" style={{ lineHeight: 2 }}>
              {hadithName?.name.arabic}
            </h3>
            {urduText ? (
              <p className="lead my-3 urdu" style={{ lineHeight: 2 }}>
                {hadithName?.name.urdu}
              </p>
            ) : (
              <p className="lead my-3">{hadithName?.name.english}</p>
            )}

            <nav aria-label="Page navigation example ">
              <ul className="pagination pagination-lg d-flex justify-content-between p-4">
                <li className="page-item ">
                  <Link
                    className="page-link"
                    to={PreviousHadith()}
                    aria-label="Previous"
                    style={{ visibility: hadithId <= 1 && "hidden" }}
                  >
                    <span aria-hidden="true" className="fs-4">
                      &laquo;
                    </span>
                  </Link>
                </li>

                <li className="page-item">
                  <a
                    href="#"
                    type="button"
                    className="page-link btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    {urduText ? "تخریج" : "Takhreej"}
                  </a>
                </li>

                <li className="page-item">
                  <Link
                    className="page-link "
                    to={NextHadith()}
                    style={{
                      justifySelf: "right",
                      visibility: hadithId >= 1358 ? "hidden" : "visible",
                    }}
                    aria-label="Next"
                  >
                    <span aria-hidden="true" className="fs-4">
                      &raquo;
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div
          className="row mb-2"
          style={{
            flexDirection: urduText && "row-reverse",
            overflow: "scroll",
            flexWrap: "nowrap",
            overflowY: "hidden",
            scrollbarWidth: "thin",
          }}
        >
          {hadithDetail?.importantWords.map((w, i) => (
            <div className="" style={{ width: "fit-content" }} key={i}>
              <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm px-4 ">
                <div className="col p-4 d-flex flex-column position-static">
                  <strong className="d-inline-block mb-2 text-primary-emphasis fs-4 arabic">
                    {w.arabic}
                  </strong>
                  <h3
                    className={`d-inline-block mb-2 fs-5 ${urduText && "urdu"}`}
                  >
                    {urduText ? w.urdu : w.english}{" "}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="row  p-0"
          style={{ flexDirection: urduText && "row-reverse" }}
        >
          <div className="col-lg-8">
            <div
              className={`  fs-5 fw-bold fst-italic  my-3 ${
                urduText && "urdu"
              }`}
            >
              <mark className="p-2 px-3">
                {" "}
                {urduText ? "وضاحت" : "Explanation"}
              </mark>
            </div>

            <article className="blog-post pt-3 mb-5">
              {Array.isArray(hadithDetail?.explanation) ? (
                hadithDetail?.explanation.map((sec, index) =>
                  sec.sectionTitle || sec.sectionData ? (
                    <div
                      className="hadith-explaination-section mb-5"
                      key={index}
                    >
                      {/* <h3 className={`${urduText && "urdu"} sectionTitle my-3`}>
                        {urduText
                          ? sec.sectionTitle?.urdu
                          : sec.sectionTitle.english}
                        </h3> */}

                      <h2
                        className={`pb-4 mb-4 fw-bold border-bottom sectionTitle ${
                          urduText && "urdu"
                        }`}
                      >
                        {urduText
                          ? sec?.sectionTitle?.urdu || "No Title Found"
                          : sec?.sectionTitle?.english || "No Title Found"}
                      </h2>
                      <div
                        className={`${urduText && "urdu"} sectionData`}
                        style={{ lineHeight: "2rem" }}
                      >
                        {sec?.sectionData?.points.map((p, i) => (
                          <ul
                            className="sectionData-point list-group my-3   "
                            key={i}
                          >
                            <li
                              className="list-group-item active list-group-item-dark text-dark"
                              aria-current="true"
                            >
                              <h5 className="fw-bold mb-0 p-2">
                                {urduText
                                  ? p.title.urdu
                                  : p.title.english || "No Title"}
                              </h5>
                            </li>
                            {urduText
                              ? p?.content?.urdu?.map((c) => (
                                  <li className=" list-group-item" key={c}>
                                    {c}
                                  </li>
                                ))
                              : p?.content?.english.map((c) => (
                                  <li className=" list-group-item" key={c}>
                                    {c}
                                  </li>
                                ))}
                          </ul>
                        ))}
                      </div>
                    </div>
                  ) : (
                    "No Explaination"
                  )
                )
              ) : (
                <div className="h1 urdu text-center w-100">Unavailable</div>
              )}
            </article>
          </div>
          <div className="col-lg-4 mt-5">
            <div className="position" style={{ top: "2rem" }}>
              <div className="list-group">
                {hadithDetail?.references?.map((r, i) => (
                  <a
                    href="#"
                    key={i}
                    className={`list-group-item list-group-item-action disabled ${
                      urduText && "arabic"
                    }`}
                  >
                    {urduText ? r.arabic : r.english}
                  </a>
                ))}
              </div>
              {/* <hr /> */}

              <div className="my-5">
                <h4 className={`fst-italic fw-semibold ${urduText && "urdu"}`}>
                  {" "}
                  {urduText
                    ? "صحابہ رضی اللہ عنہ کا تعارف"
                    : "Introduction of Sahaba R.A"}
                </h4>
                <ul className={`list-unstyled ${urduText && "urdu"}`}>
                  {hadithDetail?.narrators?.map((n, i) => (
                    <li key={i}>
                      <Link
                        className=" d-flex btn btn-success my-4   py-3 link-body-emphasis text-decoration-none border-top"
                        to={`/sahaba/${n.slug}`}
                        style={{ flexDirection: urduText && "row-reverse" }}
                      >
                        <h6 className="mb-0">
                          {urduText ? n.name.arabic : n.name.english}
                        </h6>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {hadithDetail?.summary && (
                <div className="p-4 mb-3 bg-body-tertiary rounded">
                  <h4
                    className={`fst-italic fw-semibold ${urduText && "urdu"}`}
                  >
                    {urduText ? "حدیث کا خلاصہ" : "Summary of Hadith"}
                  </h4>
                  {urduText ? (
                    <p className="mb-0 urdu">{hadithDetail?.summary?.urdu}</p>
                  ) : (
                    <p className="mb-0">{hadithDetail?.summary?.english}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Takhreej Modal */}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {urduText ? "Takhreej" : "Takhreej"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body ">
              {/* {hadithDetail?.takhreej?.arabic} */}
              <p className={`${urduText && "urdu"}`}>
                {urduText
                  ? hadithDetail?.takhreej?.urdu
                  : hadithDetail?.takhreej?.english}
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {/* <button type="button" className="btn btn-primary">
                Save changes
              </button> */}
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        class="btn btn-outline-warning w-100"
        data-bs-toggle="modal"
        data-bs-target="#passwordModal"
      >
        Edit Hadith
      </button>

      {/* <!-- Enter Pasword Modal --> */}
      <div
        class="modal fade"
        id="passwordModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Enter Your Password
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  if (e.target.value == 333) setEditorPass(true);
                  else setEditorPass(false);
                }}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                disabled={!editorPass}
                onClick={() => navigate("edit?password=333")}
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BMSingleHadith;
