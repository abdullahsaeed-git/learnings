import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { Link, Outlet, useNavigate } from "react-router";
import "../styles/bulugh-al-maram.css";


function Quran() {

  const navigate = useNavigate();
  const [searchHadith, setSearchHadith] = useState("")
  return (
    <>
      <nav
        class="navbar navbar-dark bg-dark"
        aria-label="Dark offcanvas navbar"
      >
        <div class="container-fluid">
          <a class="navbar-brand fw-semibold" href="/bulugh-al-maram">
           Quran
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbarDark"
            aria-controls="offcanvasNavbarDark"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="offcanvas offcanvas-end text-bg-dark"
            tabindex="-1"
            id="offcanvasNavbarDark"
            aria-labelledby="offcanvasNavbarDarkLabel"
          >
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbarDarkLabel">
                Quran Sidebar
              </h5>
              <button
                type="button"
                class="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body">
            
              {/* <div class="d-flex mt-3">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Hadith Number (1 - 1538)"
                  value={searchHadith}
                  onChange={(e) => setSearchHadith(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.code == "Enter") {
                      document.getElementById("search-hadith-btn").click();
                    }
                  }}
                  // aria-label="Search"
                />
                <a
                  class="btn btn-outline-success"
                  id="search-hadith-btn"
                  href={`/bulugh-al-maram/hadith-detail/${searchHadith}`}
                  // data-bs-dismiss="offcanvas"
                  // onClick={() =>
                  //   navigate(`/bulugh-al-maram/hadith-detail/${searchHadith}`)
                  // }
                >
                  Search
                </a>


              </div> */}
            </div>
          </div>
        </div>
      </nav>

      <Outlet />


      
    </>
  );
}

export default Quran
