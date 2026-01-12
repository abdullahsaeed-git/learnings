import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import Loading from "../components/Loading";

function BMEditHadith({ urduText, setUrduText }) {
  const { hadithId } = useParams();

  const [loading, setLoading] = useState(true);
  const [hadithDetail, setHadithDetail] = useState();
  const [hadithName, setHadithName] = useState();
  const [newHadithDetail, setNewHadithDetail] = useState();
  const [newHadithName, setNewHadithName] = useState({});
  const [stringHadithName, setStringHadithName] = useState('')
  const [stringHadithDetail, setStringHadithDetail] = useState('')
  const [chapterDetail, setChapterDetail] = useState();
  const [bookName, setBookName] = useState();
  const [chapterName, setChapterName] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const pass = search.get("password");
  const submitHadithMailRef = useRef();
  const checkPasswordModalBtnRef = useRef();
  const [enteredPassword, setEnteredPassword ] = useState("");
  const goToURLRef = useRef();


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // First fetch hadith detail
        const hadithRes = await fetch(
          `https://abdullahsaeed-git.github.io/my-database/bulugh/hadith-detail/hadith-${hadithId}.json`
        );
        const hadithData = await hadithRes.json();
        setHadithDetail(hadithData);
        setNewHadithDetail(hadithData);

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
        const bulughBooksData = await booksRes.json();
        const bookDetailData = await bookDetailRes.json();

        // Find the hadith name from chapter data
        const foundHadithName = chapterData.hadiths.find(
          (h) => h.id == hadithId
        );

        // Update all states
        setChapterDetail(chapterData);
        setHadithName(foundHadithName);
        setNewHadithName(foundHadithName);
        setBookName(bulughBooksData.find((b) => b.id == kitabId));
        setChapterName(bookDetailData.chapters.find((c) => c.id == chapterId));
      } catch (error) {
        console.error("Error in Single Hadith: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location, hadithId]); // Added hadithId to dependencies



  if(pass != 333){
    return (
      <>
      
        <h2 className="text-center my-4">{pass ? "Wrong Password" : "Enter password"}</h2>
        {/* <!-- Button trigger modal --> */}
        <button
          type="button"
          style={{ display: "", width: "100%" }}
          class="btn btn-outline-warning"
          data-bs-toggle="modal"
          data-bs-target="#passwordCheckModal"
          ref={checkPasswordModalBtnRef}
        >
          Enter Password
        </button>

        <>
          {/* <!-- Modal Check Passwords --> */}
          <div
            class="modal fade"
            id="passwordCheckModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">
                    Enter Password
                  </h1>
      
                </div>
                <div class="modal-body">
                  <input type="text" className="form-control" value={enteredPassword} onChange={(e) => setEnteredPassword(e.target.value)} />
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={() => {
                      console.log(`/${window.location.origin}${window.location.pathname}?password=${enteredPassword}`)
                      goToURLRef.current.click();
                    }}
                    data-bs-dismiss="modal"
                  >
                    Enter
                  </button>

                  <a href={`${window.location.origin}${window.location.pathname}?password=${enteredPassword}`} style={{display: "none"}} ref={goToURLRef}></a>
                 
                </div>
              </div>
            </div>
          </div>
        </>
      </>
    );
  }

  if (loading) return <Loading />;


  if (!hadithDetail)
    return <h2 className="text-center my-4">Hadith {hadithId} Not Found</h2>;

  return (
    <div>
      <div class="container">
        <main>
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
          <div class="py-5 text-center">
            <h1 class="h2">Edit Hadith</h1>
            <p class="lead">
              Hadith will not directly edited to the database instead will be
              first approved by admin.
            </p>
          </div>

          <div className="row ">
            <div class="col-12">
              {/* <h4 class={`mb-3 ${urduText && "arabic"}`}>Billing address</h4> */}

              <form class="needs-validation" novalidate="">
                <div class="row">
                  <div class="col-12 arabic">
                    <label for="firstName" class="form-label">
                      Arabic
                    </label>
                    <textarea
                      rows={5}
                      type="text"
                      class="form-control arabic p-3"
                      id="firstName"
                      placeholder=""
                      value={newHadithName?.name?.arabic}
                      onChange={(e) => {
                        setNewHadithName((prev) => ({
                          ...prev,
                          name: {
                            arabic: e.target.value,
                            english: prev.name.english,
                            urdu: prev.name.urdu,
                          },
                        }));
                      }}
                      required=""
                    />
                    <div class="invalid-feedback">
                      Valid arabic is required.
                    </div>
                  </div>

                  {urduText ? (
                    <div class={`col-12 urdu `}>
                      <label for="lastName" class="form-label">
                        Urdu Tarjama
                      </label>
                      <textarea
                        rows={5}
                        type="text"
                        class={`form-control urdu p-3`}
                        id="lastName"
                        placeholder=""
                        value={newHadithName?.name?.urdu}
                        onChange={(e) => {
                          setNewHadithName((prev) => ({
                            ...prev,
                            name: {
                              arabic: prev.name.arabic,
                              english: prev.name.english,
                              urdu: e.target.value,
                            },
                          }));
                        }}
                        required=""
                      />
                      <div class="invalid-feedback">
                        Valid urdu tarjama is required.
                      </div>
                    </div>
                  ) : (
                    <div class={`col-12 `}>
                      <label for="lastName" class="form-label">
                        English Translation
                      </label>
                      <textarea
                        rows={5}
                        type="text"
                        class={`form-control `}
                        id="lastName"
                        placeholder=""
                        value={newHadithName?.name?.english}
                        onChange={(e) => {
                          setNewHadithName((prev) => ({
                            ...prev,
                            name: {
                              arabic: prev.name.arabic,
                              english: e.target.value,
                              urdu: prev.name.urdu,
                            },
                          }));
                        }}
                        required=""
                      />
                      <div class="invalid-feedback">
                        Valid English Translation is required.
                      </div>
                    </div>
                  )}

                  <div class={`col-12 ${urduText && "arabic"}`}>
                    <label for="state" class="form-label">
                      Sanad
                    </label>
                    <select
                      class="form-select"
                      id="state"
                      required=""
                      onChange={(e) =>
                        setNewHadithDetail((prev) => ({
                          ...prev,
                          grade: {
                            arabic: e.target.value,
                            english: prev.grade.english,
                          },
                        }))
                      }
                    >
                      <option value="" className={`${"arabic"}`}>
                        Choose...
                      </option>
                      <option value={"صحيح"} className={`${"arabic"}`}>
                        صحيح
                      </option>
                      <option value={"حسن"} className={`${"arabic"}`}>
                        حسن
                      </option>
                      <option value={"حسن صحيح"} className={`${"arabic"}`}>
                        حسن صحيح
                      </option>
                      <option value={"ضعيف"} className={`${"arabic"}`}>
                        ضعيف
                      </option>
                    </select>
                    <div class="invalid-feedback">
                      Please provide a valid state.
                    </div>
                  </div>

                  <hr class="my-4" />
                  <h4 class={`mb-3  ${urduText && "urdu"}`}>
                    {urduText ? "Lafzi Maani" : "Important Words"}{" "}
                  </h4>
                  <div
                    className="d-flex "
                    style={{
                      flexDirection: urduText && "row-reverse",
                      flexWrap: "wrap",
                      gap: 20,
                    }}
                  >
                    {newHadithDetail?.importantWords?.map((w, index) => (
                      <div
                        key={index}
                        className="col-12 border-secondary border rounded"
                      >
                        {/* Arabic Input */}
                        <textarea
                          type="text"
                          className="form-control arabic text-center fw-bold p-2"
                          value={w.arabic}
                          onChange={(e) =>
                            setNewHadithDetail((prev) => ({
                              ...prev,
                              importantWords: prev.importantWords.map(
                                (word, i) =>
                                  i === index
                                    ? { ...word, arabic: e.target.value }
                                    : word
                              ),
                            }))
                          }
                          required
                        />

                        {/* Urdu or English Input */}
                        {urduText ? (
                          <textarea
                            type="text"
                            className="form-control arabic text-center p-2"
                            onChange={(e) =>
                              setNewHadithDetail((prev) => ({
                                ...prev,
                                importantWords: prev.importantWords.map(
                                  (word, i) =>
                                    i === index
                                      ? { ...word, urdu: e.target.value }
                                      : word
                                ),
                              }))
                            }
                            value={w.urdu}
                            required
                          />
                        ) : (
                          <textarea
                            type="text"
                            className="form-control text-center p-2"
                            onChange={(e) =>
                              setNewHadithDetail((prev) => ({
                                ...prev,
                                importantWords: prev.importantWords.map(
                                  (word, i) =>
                                    i === index
                                      ? { ...word, english: e.target.value }
                                      : word
                                ),
                              }))
                            }
                            value={w.english}
                            required
                          />
                        )}

                        <div class="invalid-feedback">Something needed</div>
                      </div>
                    ))}
                  </div>

                  <hr class="my-4" />
                  <h4 class={`mb-3  ${urduText && "urdu"}`}>
                    {urduText ? "وضاحت" : "Explaination"}{" "}
                  </h4>

                  <article className="blog-post pt-3 mb-5">
                    {Array.isArray(hadithDetail?.explanation) ? (
                      newHadithDetail?.explanation.map((sec, secIndex) =>
                        sec.sectionTitle || sec.sectionData ? (
                          <div
                            className="hadith-explaination-section mb-5"
                            key={secIndex}
                          >
                            {/* <h3 className={`${urduText && "urdu"} sectionTitle my-3`}>
                        {urduText
                          ? sec.sectionTitle?.urdu
                          : sec.sectionTitle.english}
                        </h3> */}

                            <textarea
                              className={` form-control pb-4 mb-4 fw-bold fs-3 border-bottom sectionTitle w-100 ${
                                urduText && "urdu"
                              }`}
                              value={
                                urduText
                                  ? sec?.sectionTitle?.urdu || "No Title Found"
                                  : sec?.sectionTitle?.english ||
                                    "No Title Found"
                              }
                              onChange={(e) =>
                                setNewHadithDetail((prev) => ({
                                  ...prev,
                                  explanation: prev.explanation.map((s, i) =>
                                    i === secIndex
                                      ? {
                                          ...s,
                                          sectionTitle: {
                                            ...s.sectionTitle,
                                            [urduText ? "urdu" : "english"]:
                                              e.target.value,
                                          },
                                        }
                                      : s
                                  ),
                                }))
                              }
                            />
                            <div
                              className={`${urduText && "urdu"} sectionData`}
                              style={{ lineHeight: "2rem" }}
                            >
                              {sec?.sectionData?.points.map((p, pIndex) => (
                                <ul
                                  className="sectionData-point list-group my-3   "
                                  key={pIndex}
                                >
                                  {/* <li className=" " aria-current="true"> */}
                                  <textarea
                                    className={`form-control fw-bold  list-group-item active list-group-item-dark text-dark mb-0 p-2 ${
                                      urduText && "arabic"
                                    }`}
                                    value={
                                      urduText
                                        ? p.title.urdu
                                        : p.title.english || "No Title"
                                    }
                                    onChange={(e) =>
                                      setNewHadithDetail((prev) => ({
                                        ...prev,
                                        explanation: prev.explanation.map(
                                          (s, i) =>
                                            i === secIndex
                                              ? {
                                                  ...s,
                                                  sectionData: {
                                                    ...s.sectionData,
                                                    points:
                                                      s.sectionData.points.map(
                                                        (point, pi) =>
                                                          pi === pIndex
                                                            ? {
                                                                ...point,
                                                                title: {
                                                                  ...point.title,
                                                                  [urduText
                                                                    ? "urdu"
                                                                    : "english"]:
                                                                    e.target
                                                                      .value,
                                                                },
                                                              }
                                                            : point
                                                      ),
                                                  },
                                                }
                                              : s
                                        ),
                                      }))
                                    }
                                  />
                                  {/* </li> */}

                                  {(urduText
                                    ? p.content.urdu
                                    : p.content.english
                                  ).map((c, cIndex) => (
                                    <textarea
                                      key={cIndex}
                                      className={`form-control list-group-item ${
                                        urduText && "arabic"
                                      }`}
                                      value={c}
                                      onChange={(e) =>
                                        setNewHadithDetail((prev) => ({
                                          ...prev,
                                          explanation: prev.explanation.map(
                                            (s, i) =>
                                              i === secIndex
                                                ? {
                                                    ...s,
                                                    sectionData: {
                                                      ...s.sectionData,
                                                      points:
                                                        s.sectionData.points.map(
                                                          (point, pi) =>
                                                            pi === pIndex
                                                              ? {
                                                                  ...point,
                                                                  content: {
                                                                    ...point.content,
                                                                    [urduText
                                                                      ? "urdu"
                                                                      : "english"]:
                                                                      point.content[
                                                                        urduText
                                                                          ? "urdu"
                                                                          : "english"
                                                                      ].map(
                                                                        (
                                                                          cc,
                                                                          ci
                                                                        ) =>
                                                                          ci ===
                                                                          cIndex
                                                                            ? e
                                                                                .target
                                                                                .value
                                                                            : cc
                                                                      ),
                                                                  },
                                                                }
                                                              : point
                                                        ),
                                                    },
                                                  }
                                                : s
                                          ),
                                        }))
                                      }
                                    />
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
                      <div className="h1 urdu text-center w-100">
                        Unavailable
                      </div>
                    )}
                  </article>
                  <div className="col-12 mt-5">
                    <div className="position" style={{ top: "2rem" }}>
                      <div className="list-group">
                        {newHadithDetail?.references.map((r, rIndex) => (
                          <textarea
                            rows={3}
                            href="#"
                            key={rIndex}
                            className={`form-control list-group-item  list-group-item-action ${
                              urduText && "arabic"
                            }`}
                            value={urduText ? r.arabic : r.english}
                            onChange={(e) => {
                              setNewHadithDetail((prev) => ({
                                ...prev,
                                references: prev.references.map((ref, i) =>
                                  i == rIndex
                                    ? {
                                        ...ref,
                                        [urduText ? "arabic" : "english"]:
                                          e.target.value,
                                      }
                                    : ref
                                ),
                              }));
                            }}
                          />
                        ))}
                      </div>
                      {/* <hr /> */}

                      {newHadithDetail?.summary && (
                        <div className="p-4 my-3 bg-body-tertiary rounded">
                          <h4
                            className={`fst-italic fw-semibold ${
                              urduText && "urdu"
                            }`}
                          >
                            {urduText ? "حدیث کا خلاصہ" : "Summary of Hadith"}
                          </h4>
                          {urduText ? (
                            <textarea
                              rows={5}
                              className=" form-control p-3 mb-0 urdu w-100"
                              value={newHadithDetail?.summary?.urdu}
                              onChange={(e) => {
                                setNewHadithDetail((prev) => ({
                                  ...prev,
                                  summary: e.target.value,
                                }));
                              }}
                            />
                          ) : (
                            <textarea
                              className="form-control p-2 mb-0 w-100"
                              value={newHadithDetail?.summary?.english}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <hr class="my-4" />
                <div class="form-check">
                  <label class="form-check-label" for="same-address">
                    Do It Now !
                  </label>
                </div>
                <hr class="my-4" />

                <div
                  class="w-100 btn btn-success btn-lg mb-4"
                  type="submit"
                  onClick={() => {
                    console.log("========== After Editing ==========");
                    console.log("Hadith Name: ", newHadithName);
                    console.log("Hadith Detail: ", newHadithDetail);
                    const stringOfHadithName = JSON.stringify(newHadithName);
                    const stringOfHadithDetail =
                      JSON.stringify(newHadithDetail);
                    setStringHadithDetail(stringOfHadithDetail);
                    setStringHadithName(stringOfHadithName);
                    const stringed = JSON.stringify(newHadithName);
                    // setNewHadithName(newHadithName.stringify());
                    console.log("String hadith name; ", stringOfHadithName);
                    console.log("String hadith Detail; ", stringOfHadithDetail);

                    // setTimeout(() => {
                    //   submitHadithMailRef.current.click();
                    // }, 0);
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Save
                </div>
              </form>
            </div>
          </div>
        </main>

        {/* <!-- Button trigger modal --> */}
        {/* <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Launch static backdrop modal
        </button> */}

        {/* <!-- Modal Submit edited hadith--> */}
        <div
          class="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">
                  Enter your name
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form
                  action="https://api.web3forms.com/submit"
                  method="POST"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  {/* <!-- Replace with your Access Key --> */}
                  <input
                    type="hidden"
                    name="access_key"
                    value="f2f0fe10-3b35-47c5-8529-b2fd66506fad"
                  />
                  <input
                    type="hidden"
                    name="subject"
                    value={"Bulugh-Al-Maram"}
                  />
                  <input
                    type="hidden"
                    name="from_name"
                    value="Hadith Editing"
                  />

                  {/* <!-- Form Inputs. Each input must have a name="" attribute --> */}
                  <input
                    type="text"
                    name="Submitted By"
                    className="form-control"
                  />
                  <input
                    type="hidden"
                    name="Hadith Text"
                    placeholder="Hadith Text"
                    value={stringHadithName}
                  />
                  <input
                    type="hidden"
                    name="Hadith Explaination"
                    placeholder="Hadith Detail"
                    value={stringHadithDetail}
                  />

                  {/* <!-- Honeypot Spam Protection --> */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    class="hidden"
                    style={{ display: "none" }}
                  />

                  {/* <!-- Custom Confirmation / Success Page --> */}
                  {/* <input type="hidden" name="redirect" value="/" /> */}

                  <input
                    type="hidden"
                    name="redirect"
                    value={`${window.location.origin}/bulugh-al-maram/hadith-detail/${hadithId}`}
                  />

                  <button
                    style={{ display: "None" }}
                    type="submit"
                    ref={submitHadithMailRef}
                  >
                    Submit Form
                  </button>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => submitHadithMailRef.current.click()}
                  data-bs-dismiss="modal"
                >
                  Submit
                </button>
                {/* <button type="button" class="btn btn-primary">
                  Understood
                </button> */}
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
}

export default BMEditHadith;
