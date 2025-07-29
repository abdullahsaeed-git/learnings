import React from 'react'
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router';

function Home() {
  return (
    <div>
      {/* <Sidebar/>  */}
      {/* <div>Home</div> */}
      <Link to={`/bulugh-al-maram`} className=" border p-5 text-decoration-none d-flex flex-column gap-3 m-3">
        <h1 className="text-center text-light ">Bulugh - alMaram</h1>
        <h1 className="text-center text-info ">بلوغ المرام</h1>

        <button type="button" class="btn btn-info ">
          OPEN
        </button>
      </Link>
    </div>
  );
}

export default Home;