import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useParams } from "react-router";

function QuranUrdu() {
  const [loading, setLoading] = useState(true);

  const { languageSlug } = useParams();

  const [surah, setSurah] = useState();

  const [fullData, setFullData] = useState([]);
  const [showArabic, setShowArabic] = useState(false);
  const [showExplaination, setShowExplaination] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);

      try {
        for (let i = 1; i <= 114; i++) {
          if (cancelled) break;

          // console.log("Fetching", i);

          const res = await fetch(
            `https://quranenc.com/api/v1/translation/sura/${languageSlug}/${i}`,
          );

          const data = await res.json();

          if (cancelled) break;

          setFullData((prev) => [...prev, data.result]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, []);
  //   if(Loading) return <Loading/>
  if (!fullData) return <h3 className="text-center">No data found</h3>;

  return (
    <div>
      {/* <ul class="list-group list-group-flush">
        <li className="list-group-item active">active</li>
        {
            fullData.map((ayat) => (
                <li class="list-group-item">fulldata</li>

            ))
        }
  <li class="list-group-item">A second item</li>
  <li class="list-group-item">A third item</li>
  <li class="list-group-item">A fourth item</li>
  <li class="list-group-item">And a fifth one</li>
</ul> */}
      <div className="p-3 ">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="switchCheckArabic"
            checked={showArabic}
            onChange={() => setShowArabic((prev) => !prev)}
          />
          <label class="form-check-label" for="switchCheckDefault">
            Arabic
          </label>
        </div>

        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="switchCheckExplaination"
            checked={showExplaination}
            onChange={() => setShowExplaination((prev) => !prev)}
          />
          <label class="form-check-label" for="switchCheckExplaination">
            Explaination
          </label>
        </div>
      </div>

      <ul className="list-group">
        {fullData.map((surah, index) => (
          <>
            {/* {console.log(surah)} */}
            <li className="list-group-item active d-flex justify-content-between">
              Surah {index + 1} <span>{surah.length} Ayats</span>
            </li>

            <li key={index} className="list-group-item ">
              {surah.map((ayat) => (
                <>
                  <div class="card mb-4">
                    {showArabic && (
                      <h6
                        className="card-header p-4"
                        style={{ textAlign: "right" }}
                      >
                        {ayat.arabic_text}
                      </h6>
                    )}
                    <li class="list-group-item p-4" style={{ textAlign: "right" }}>{ayat.translation}</li>
                    {showExplaination && (
                      <div class="card-footer" style={{ textAlign: "right" }}>{ayat.footnotes}</div>
                    )}
                  </div>
                </>
              ))}
            </li>
          </>
        ))}
      </ul>

      {loading && <Loading />}
    </div>
  );
}

export default QuranUrdu;
