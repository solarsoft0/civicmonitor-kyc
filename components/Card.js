import Link from "next/link";


export default props => {
  const { name, imgPath, candidate, politicalParty} = props;
  return <div className="w-full md:w-1/2 lg:w-1/3 px-3 flex flex-col mb-8">
      <div className="hover:translateY-2px transition bg-white rounded-lg shadow flex-1 flex flex-col">
        <a className="block no-underline bg-cover h-48" style={{ backgroundImage: `url("https://res.cloudinary.com/civic-monitor/image/upload/${imgPath}")` }} />
        <div className="p-6 flex-1 flex flex-col justify-between">
          <h3 className="font-display mb-4">
            <Link href={{ pathname: "/profile", query: { id: candidate.id } }}>
              <a className="no-underline hover:underline">
                <p className="no-underline hover:underline text-black capitalize">
                  {name}
                </p>
                <a className="block no-underline hover:underline text-black">
                  {/* {party} */}
                  <span className="text-grey-dark text-sm mr-2">
                    {politicalParty.name} ({politicalParty.acronym})
                  </span>
                </a>
              </a>
            </Link>
          </h3>
          <div>
            <Link href={{ pathname: "/profile", query: { id: candidate.id } }}>
              <a>
              Learn More
              </a>
              
            </Link>
          </div>
        </div>
      </div>
    </div>;
};
