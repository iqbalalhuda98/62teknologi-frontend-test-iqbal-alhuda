const Card = (props) => {
  const businesses = props.data;

  return (
    <>
      {businesses?.map((business) => {
        return (
          <a
            key={business.id}
            href={"/businesses/" + business.id}
            className="mb-5 px-2 py-1 grid grid-cols-4 items-center bg-white border border-gray-200 rounded-lg shadow w-full md:flex-row hover:bg-gray-100"
          >
            <div className="h-48 w-full">
              <img
                className="object-cover w-full h-full rounded-t-lg  md:rounded-none md:rounded-l-lg"
                src={business.image_url}
                alt=""
              />
            </div>
            <div className="ml-1 flex flex-col col-span-2 justify-between p-4 leading-normal w-full">
              <div>
                {business.isClose ? (
                  <span className="mb-1 inline-flex items-center align-middle bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                    <span className="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
                    Close
                  </span>
                ) : (
                  <span className="mb-1 inline-flex items-center align-middle bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                    <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                    Open
                  </span>
                )}
              </div>
              <h5 className="mb-2 text-[22px] font-bold tracking-tight text-gray-900">
                {business.name}{" "}
              </h5>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-yellow-500 mr-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <p className="ml-2 text-sm font-bold text-gray-900">
                  {business.rating}
                </p>
                <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
                <span className="text-sm font-medium text-gray-900 underline">
                  {business.review_count} reviews
                </span>
              </div>
              <div className="flex flex-wrap my-2">
                {business.categories.map((cat, index) => {
                  return (
                    <div key={index}>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                        {cat.title}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center">
                <img
                  src="./svg/price-tag.svg"
                  alt="price-tag"
                  className="w-3 h-3 mr-2"
                />
                <span className="text-green-700 text-sm font-semibold">
                  {business.price}
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-between p-4 leading-normal">
              <div className="flex items-center mb-1">
                <img
                  src="./svg/city.svg"
                  alt="price-tag"
                  className="w-4 h-4 mr-2"
                />
                <span className="text-blue-950 text-sm font-semibold">
                  {business.location.city}
                </span>
              </div>
              <div className="flex items-center mb-1">
                <img
                  src="./svg/phone.svg"
                  alt="price-tag"
                  className="w-4 h-4 mr-2"
                />
                <span className="text-blue-950 text-sm font-semibold">
                  {business.display_phone}
                </span>
              </div>
              <div className="flex items-center">
                <img
                  src="./svg/distance.svg"
                  alt="price-tag"
                  className="w-4 h-4 mr-2"
                />
                <span className="text-blue-950 text-sm font-semibold">
                  {business.distance}
                </span>
              </div>
            </div>
          </a>
        );
      })}
    </>
  );
};

export default Card;
