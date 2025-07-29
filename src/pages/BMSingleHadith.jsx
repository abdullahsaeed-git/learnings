import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import Loading from "../components/Loading";

function BMSingleHadith() {
  const { bookSlug, chapterSlug, hadithId } = useParams();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [urduText, setUrduText] = useState(true);
  const [hadith, setHadith] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch(
      "https://abdullahsaeed-git.github.io/my-database/bulugh-al-maram.json"
    )
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [location]);

  useEffect(() => {
    if (!data.books) return;

    const book = data.books.find((b) => b.bookSlug === bookSlug);
    setBook(book);

    if (book && book.chapters) {
      const chapter = book.chapters.find(
        (ch) => ch.chapterSlug === chapterSlug
      );
      setChapter(chapter);
      const hadith = chapter.hadiths.find((h) => h.id == hadithId);
      setHadith(hadith);
      // console.log("hadith", hadith);
    }

    setLoading(false);
  }, [data, bookSlug, chapterSlug, hadithId]);

  const PreviousHadith = () => {
    let hadithToGo;
    if (hadithId > 1) {
      hadithToGo = Number(hadithId) - 1;
    }
    // console.log("as hadith id is", hadithId , hadithToGo)
    const url = `/bulugh-al-Maram/${book.bookSlug}/${chapter.chapterSlug}/${hadithToGo}`;
    return url;
  };

  const NextHadith = () => {
    let hadithToGo;
    if (hadithId < chapter.hadiths.length) {
      hadithToGo = Number(hadithId) + 1;
    } else {
      hadithToGo = hadithId;
    }
    const url = `/bulugh-al-Maram/${bookSlug}/${chapterSlug}/${hadithToGo}`;
    return url;
  };

  if (loading) return <Loading />;

  return (
    <>
      {/* <div className="m-5 text-center h1"></div> */}

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
            <li class={`breadcrumb-item ${urduText && "urdu"} `}>
              <Link
                to={`/bulugh-al-Maram/${bookSlug}/${chapterSlug}`}
                className={`text-light decor-none ${urduText && "urdu"}`}
              >
                {urduText ? chapter.name.arabic : chapter.name.english}
              </Link>
            </li>
            <li
              class={`breadcrumb-item active  ${urduText && "urdu "} `}
              aria-current="page"
            >
              <span
                className="d-flex gap-1 "
                style={{ flexDirection: urduText && "row-reverse" }}
              >
                <span>{urduText ? "hadees" : "Hadith"} </span>
                <span>{hadithId}</span>
              </span>
            </li>
          </ol>
        </nav>
      </header>

      <main className="container">
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
        <div className="d-flex align-items-center justify-content-center">
          {hadith.ytLink && (
            <div class="p-3 my-5 rounded text-body-emphasis bg-body-secondary lecture-video-container">
              <iframe
                width="656"
                height="369"
                src={hadith?.ytLink}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          )}
        </div>
        <div class="px-4 px-md-5 pt-5  my-4 rounded text-body-emphasis bg-body-secondary">
          <div class="col-lg px-0">
            <h1 class="display-4 fst-italic arabic">{hadith.name.arabic}</h1>
            {urduText ? (
              <p class="lead my-3 urdu">{hadith.name.urdu}</p>
            ) : (
              <p class="lead my-3">{hadith.name.english}</p>
            )}

            <nav aria-label="Page navigation example ">
              <ul class="pagination pagination-lg d-flex justify-content-between p-4">
                <li class="page-item ">
                  <Link
                    class="page-link"
                    to={PreviousHadith()}
                    aria-label="Previous"
                    style={{ visibility: hadithId <= 1 && "hidden" }}
                  >
                    <span aria-hidden="true" className="fs-4">
                      &laquo;
                    </span>
                  </Link>
                </li>

                {/* <li class="page-item">
                  <a class="page-link" href="#">
                     
                  </a>
                </li> */}
                <li class="page-item">
                  <Link
                    class="page-link "
                    to={NextHadith()}
                    style={{
                      justifySelf: "right",
                      visibility:
                        hadithId >= chapter.hadiths.length && "hidden",
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

        <div class="row mb-2" style={{ flexDirection: "row-reverse" }}>
          {hadith.importantWords.map((w) => (
            <div class="col-lg-2 col-md-3 col-6">
              <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                  <strong class="d-inline-block mb-2 text-primary-emphasis fs-4 arabic">
                    العالم
                  </strong>
                  <h3 class={`d-inline-block mb-2 fs-5 ${urduText && "urdu"}`}>
                    {urduText ? w.urdu : w.english}{" "}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          class="row g-5"
          style={{ flexDirection: urduText && "row-reverse" }}
        >
          <div class="col-md-8">
            <div
              class={`  fs-5 fw-bold fst-italic  my-3 ${urduText && "urdu"}`}
            >
              <mark className="p-2 px-3">
                {" "}
                {urduText ? "وضاحت" : "Explanation"}
              </mark>
            </div>

            <article class="blog-post pt-3 mb-5">
              {Array.isArray(hadith?.explanation) ? (
                hadith?.explanation.map((sec, index) =>
                  sec.sectionTitle || sec.sectionData ? (
                    <>
                      <div className="hadith-explaination-section mb-5">
                        {/* <h3 className={`${urduText && "urdu"} sectionTitle my-3`}>
                      {urduText
                        ? sec.sectionTitle?.urdu
                        : sec.sectionTitle.english}
                    </h3> */}

                        <h2
                          class={`pb-4 mb-4 fw-bold border-bottom sectionTitle ${
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
                          {sec?.sectionData?.points.map((p) => (
                            <ul className="sectionData-point list-group my-3  ">
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
                                ? p?.content?.urdu.map((c) => (
                                    <li className=" list-group-item">{c}</li>
                                  ))
                                : p?.content?.english.map((c) => (
                                    <li className=" list-group-item">{c}</li>
                                  ))}
                            </ul>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    "No Explaination"
                  )
                )
              ) : (
                <div className="h1 urdu text-center w-100">Unavailable</div>
              )}
            </article>

            {/* <article class="blog-post pt-3 mb-5">
            

              {hadith.explanation.english.map((e) => (
                <>
                  <h4 className={`${urduText && "urdu"}`}>
                    {urduText ? "عنوان" : e.heading}
                  </h4>
                  <p
                    className={`${urduText && "urdu"}`}
                    style={{ lineHeight: "2rem" }}
                  >
                    {urduText
                      ? "تحصل النباتات على غذائها بواسطة عملية تسمى البناء الضوئي، حيث تقوم النباتات بتحويل ضوء الشمس والماء وثاني أكسيد الكربون الموجود في الغلاف الجوي إلى غذاء وتطلق الأكسجينكمنتجالتفاعل'الكيميائيتحدث هذه العملية في الخضرا'. فالنباتات تستفيد من طاقة ضوء الشمس في تقسيم الماء إلى هيدروجين وأكسجين، وتحدث تفاعلات كيميائية أخرى ينتج عنها سكر الجلكوز الذي تستخدمه كمصدر للغذاء وينطلق الأكسجين من النباتات إلى الغلاف الجوي. وهذا يعني أن النباتات تحوِّل ثاني أكسيد الكربون إلى غذاء من خلال تفاعلات كيميائية معقَّدة. ويُعد البناء الضوئي من أهم التفاعلات الكيميائية على كوكب الأرض، فقد ساعد في الماضي على تطوُّر كوكبنا وظهور الحياة عليه. فالنباتات تستخدم ثاني أكسيد الكربون لصنع غذائها، وتطلق الأكسجين لتساعد الكائنات الأخرى على التنفس!"
                      : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates nam culpa reprehenderit voluptatibus odio optio itaque quo exercitationem laborum sunt aliquid doloribus omnis placeat, explicabo dolorum. Fugiat illo nihil nulla! Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi minus quasi quo beatae cupiditate earum aperiam numquam dolore. Corporis quae culpa repudiandae rerum molestias! Enim blanditiis quasi similique nostrum. Facilis aperiam rem sunt omnis iure harum quas labore, illo nesciunt sequi, esse non nobis recusandae perspiciatis et quam quos saepe ad similique hic ratione facere! Illum earum harum minus eum accusantium similique assumenda odio quo? Officiis sit fugiat officia mollitia voluptatem nulla adipisci sunt neque tempora, nobis harum nesciunt libero necessitatibus est ipsum, vero, corporis doloremque. Dolorem asperiores impedit quisquam ipsam. Quasi corporis deserunt nobis quaerat corrupti esse impedit nisi?"}
                  </p>
                </>
              ))}
            </article> */}
          </div>
          <div class="col-md-4">
            <div class="position" style={{ top: "2rem" }}>
              <div
                className={`d-flex justify-content-start  align-items-center  `}
                style={{
                  flexDirection: urduText ? "row-reverse" : "",
                  flexWrap: "wrap",
                }}
              >
                {hadith.references.map((r) => (
                  <div className="">
                    <strong
                      class="d-inline-block  text-primary-emphasis arabic"
                      style={{ fontSize: "" }}
                    >
                      {urduText ? r.arabic : r.english}
                    </strong>
                    <span className="mx-2">|</span>
                  </div>
                ))}
              </div>
              <hr />

              <div className="mb-5">
                <h4 className={`fst-italic fw-semibold ${urduText && "urdu"}`}>
                  {" "}
                  {urduText
                    ? "صحابہ رضی اللہ عنہ کا تعارف"
                    : "Introduction of Sahaba R.A"}
                </h4>
                <ul className={`list-unstyled ${urduText && "urdu"}`}>
                  {hadith.narrators.map((n) => (
                    <li>
                      <Link
                        class="d-flex btn btn-success my-4   py-3 link-body-emphasis text-decoration-none border-top"
                        to={`/sahaba/${n.narratorSlug}`}
                        style={{ flexDirection: urduText && "row-reverse" }}
                      >
                        <h6 class="mb-0">{urduText ? n.arabic : n.english}</h6>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {hadith.summary && (
                <div class="p-4 mb-3 bg-body-tertiary rounded">
                  <h4
                    className={`fst-italic fw-semibold ${urduText && "urdu"}`}
                  >
                    {urduText ? "حدیث کا خلاصہ" : "Summary of Hadith"}
                  </h4>
                  {urduText ? (
                    <p class="mb-0 urdu">{hadith.summary?.urdu}</p>
                  ) : (
                    <p class="mb-0">{hadith.summary?.english}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default BMSingleHadith;
