import Link from "next/link";


export default props => {
  const { name, imgPath, candidate} = props;
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-3 flex flex-col mb-8">
      <div className="hover:translateY-2px transition bg-white rounded-lg shadow flex-1 flex flex-col">
        <a
          href="#"
          className="block no-underline bg-cover h-48"
          style={{
            backgroundImage: `url("https://res.cloudinary.com/civic-monitor/image/upload/${imgPath}")`
          }}
        />
        <div className="p-6 flex-1 flex flex-col justify-between">
          <h3 className="font-display mb-4">
            <a href="#" className="no-underline hover:underline text-black">
              {name}
            </a>
            <p href="#" className="no-underline hover:underline text-black">
              {/* {party} */}
              <Link href={{ pathname: '/profile', query: { id: candidate.id } }}>
                <a>Learn More</a>
              </Link>
            </p>
          </h3>
          <div>
            <a className="no-underline inline-flex items-center" href="#">
              <span className="text-grey-dark text-sm mr-2">twitter.com</span>
              <svg
                className="h-4 w-4 text-grey fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
              >
                <path d="M14 3.41l-7.3 7.3a1 1 0 0 1-1.4-1.42L12.58 2H9a1 1 0 1 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V3.41zM12 11a1 1 0 0 1 2 0v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h3a1 1 0 1 1 0 2H2v10h10v-3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
