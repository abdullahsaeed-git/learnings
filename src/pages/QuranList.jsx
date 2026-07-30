import React, { useEffect, useState } from 'react'
import { useEffectEvent } from 'react'
import { Link } from 'react-router'
import Loading from '../components/Loading'

function QuranList() {
    const [urduText, setUrduText] = useState(true)
    const [languages, setLanguages] = useState([
        {
            text: "urdu", 
            slug: "urdu_junagarhi"
        }, 
        {
            text: "english", 
            slug: "english_saheeh"
        }
    ])
    const [loading, setLoading] = useState(true)

    
    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
    
            // Fetch both data sources in parallel
//            const languagesRes = await fetch(
//   "https://alquran-api.pages.dev/api/quran/languages"
// );

fetch(
  "https://quranenc.com/api/v1/translation/sura/urdu_junagarhi/1"
).then(res => res.json()).then(data => {console.log(data)})


// console.log(languagesRes.status);
// console.log(languagesRes.ok);

// const languagesData = await languagesRes.json();
// console.log(languagesData);
          } catch (error) {
            console.error("Error Has been Occurred: ", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []); 

      if (loading) return <Loading />;
      if(!languages) return <h1>No Data Found</h1>
  return (
    <div>
       <div className="row align-items-md-stretch justify-content-center "
                style={{flexWrap: ""}}
                >
                {
                    languages.map((l, i) => (
 <Link
                     to={`translation/${l.slug}`}
                     key={1}
                     className="col-lg-4 col-md-4 col-sm-6 my-4  position-relative text-light "
                     style={{ textDecoration: "none" }}
                   >
                     <div
                       className={`h-100 p-4 ${
                        i % 2 === 0 ? "bg-body-tertiary" : "text-bg-dark"
                       }  border rounded-3 single-book-chap-card d-flex flex-column gap-3`}
                     >
                       <h3 className="text-center arabic fw-semibold">
                         {l.text}
                       </h3>
                       {/* {urduText ? (
                         <p className="urdu fw-semibold">Urdu</p>
                       ) : (
                         <p>English</p>
                       )} */}
                     </div>
                     <span className="position-absolute top-0 start-50 px-4 translate-middle badge rounded-pill bg-secondary fs-6">
                       {i + 1}
                       <span className="visually-hidden">Index</span>
                     </span>
                   </Link>
                    ))
                }
                  
                 
               </div>
    </div>
  )
}

export default QuranList
