import ContentLoader from "react-content-loader";

export default props => (
  <div className="w-full md:w-1/2 lg:w-1/3 px-3 flex flex-col mb-8">
    <div className="hover:translateY-2px transition rounded-lg flex-1 flex flex-col">
      <ContentLoader
        height={400}
        width={400}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
        {...props}
      >
        <rect x="0" y="9" rx="5" ry="5" width="100%" height="300" />
        <rect x="18.11" y="366.74" rx="4" ry="4" width="241" height="24.44" />
        <rect x="18.11" y="331.74" rx="4" ry="4" width="100%" height="24.44" />
        <rect x="19" y="455" rx="4" ry="4" width="100%" height="6.32" />
      </ContentLoader>
    </div>
  </div>
);
