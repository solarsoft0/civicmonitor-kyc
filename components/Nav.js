import React from 'react'
import Link from "next/link";


export default function Nav() {
  return <div className="bg-white">
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center">
          <div>
          <a href="/">
          <img style={{ height: "120px"}} src="https://res.cloudinary.com/civic-monitor/image/upload/v1543350730/logo.png" className="Know your candidates" alt="logo" />
          </a>
          </div>
          <div>{/* search here */}</div>
          <div>
            <ul className="list-reset flex">
              <li className="mr-6">
                <Link prefetch  href={{ pathname: "/" }}>
                  <a className="text-blue no-underline uppercase font-bold text-base hover:text-blue-darker">
                    Home
                  </a>
                </Link>
              </li>
              <li className="mr-6">
                <Link prefetch href={{ pathname: "/aboutus" }}>
                  <a className="text-blue no-underline uppercase font-bold text-base hover:text-blue-darker">
                    About Us
                  </a>
                </Link>
              </li>
              <li className="mr-6">
                <Link prefetch href={{ pathname: "/compare" }}>
                  <a className="text-blue no-underline uppercase font-bold text-base hover:text-blue-darker">
                    Compare Candidate
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>;
}
