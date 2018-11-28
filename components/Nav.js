import React from 'react'


export default function Nav() {
  return <div className="bg-white">
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center">
          <div>
          <img style={{ height: "120px"}} src="https://res.cloudinary.com/civic-monitor/image/upload/v1543350730/logo.png" className="Know your candidates" alt="logo" />
          </div>
          <div>{/* search here */}</div>
          <div>
            <ul className="list-reset flex">
              <li className="mr-6">
                <a className="text-blue no-underline uppercase font-bold text-base hover:text-blue-darker" href="/">
                  Home
                </a>
              </li>
              <li className="mr-6">
                <a className="text-blue no-underline uppercase font-bold text-base hover:text-blue-darker" href="/aboutus">
                  About Us
                </a>
              </li>
              <li className="mr-6">
                <a className="text-blue no-underline uppercase font-bold text-base hover:text-blue-darker" href="#">
                  Compare Candidates
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>;
}
