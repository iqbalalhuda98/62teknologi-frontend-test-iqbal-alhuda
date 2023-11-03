import { useRouter } from "next/router";

const Breadcrumb = (props) => {
  const { slug, name } = props;
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <nav
      className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <a
            // href={slug}
            onClick={goBack}
            className="inline-flex items-center text-md font-bold text-blue-700 hover:text-blue-900 cursor-pointer"
          >
            Businesses
          </a>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <svg
              className="w-3 h-3 mx-1 text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
              {name}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
