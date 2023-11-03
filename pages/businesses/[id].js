import { useRouter } from "next/router";
// import * as api from "../api/yelp-api/api";
import axios from "axios";
import Breadcrumb from "./components/breadcrumb";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import SlideshowPhoto from "./components/slideshow";
import RatingStar from "./components/rating-star";

const BusinessesDet = (props) => {
  const router = useRouter();
  const { detail, reviews } = props;

  const Map = useMemo(
    () =>
      dynamic(() => import("./components/map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <div className="container px-40 my-14">
      <div className="relative">
        <div className="absolute bg-blue-500 blur-[1500px] right-0 top-1/4 rounded-full w-[500px] h-[500px] z-[-1]"></div>
      </div>
      <section>
        <Breadcrumb slug={"/businesses"} name={detail.name} />
      </section>
      <section className="relative overflow-hidden my-11 rounded-lg">
        <SlideshowPhoto photo={detail.photos} />
        <div className="absolute left-5 bottom-5 z-10">
          <div className="absolute bg-black blur-[110px] -left-16 -bottom-32 rounded-xl w-[400px] h-[300px] z-[-1]"></div>
          {!detail.is_closed && (
            <span className="bg-green-100 text-green-800 text-lg font-semibold mr-2 px-2.5 py-0.5 rounded">
              Open
            </span>
          )}
          <h1 className="flex items-center text-4xl font-extrabold text-white w-4/5 mt-3 drop-shadow-2xl">
            {detail.name}
          </h1>
          <p className="flex items-center my-4">
            <RatingStar rating={detail.rating} />
            <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">
              {detail.rating}
            </span>
            <span className="w-1 h-1 mx-1.5 bg-white rounded-full"></span>
            <span className="text-sm font-medium text-white underline">
              {detail.review_count} reviews
            </span>
          </p>
          <div className="flex flex-wrap my-2">
            {detail.categories.map((cat, index) => {
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
            <span className="text-white text-sm font-semibold ml-1 mt-2">
              {detail.price}
            </span>
          </div>
        </div>
      </section>
      <section>
        <hr className="mb-3" />
        <div className="flex flex-row justify-start gap-10 leading-normal">
          <div className="flex items-center mb-1">
            <img
              src="../svg/city.svg"
              alt="price-tag"
              className="w-4 h-4 mr-2"
            />
            <span className="text-blue-950 text-sm font-semibold">
              {detail.location.display_address.join(", ")}
            </span>
          </div>
          <div className="flex items-center mb-1">
            <img
              src="../svg/phone.svg"
              alt="price-tag"
              className="w-4 h-4 mr-2"
            />
            <span className="text-blue-950 text-sm font-semibold">
              {detail.display_phone}
            </span>
          </div>
        </div>
      </section>
      <section>
        <div className="relative">
          <div className="absolute bg-blue-500 blur-[300px] left-0 top-0 rounded-full w-[300px] h-[300px] z-[-1]"></div>
        </div>
        <div className="grid grid-cols-2 mt-14">
          <div className="p-5">
            <h1 className="mb-2 text-3xl font-extrabold leading-none tracking-tight text-gray-900">
              What <span className="text-blue-600">people</span> say...
            </h1>
            <p className="text-lg font-normal text-gray-500 mb-6">
              Below are some reviews given by people who have visited this
              place.
            </p>
            <div className="grid mb-8 border border-gray-200 rounded-lg shadow-sm">
              {reviews.map((item, index) => {
                return (
                  <figure
                    key={index}
                    className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r"
                  >
                    <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8">
                      <div className="flex justify-center">
                        <RatingStar rating={item.rating} />
                      </div>
                      <p className="my-4">{item.text}</p>
                    </blockquote>
                    <figcaption className="flex items-center justify-center space-x-3">
                      <img
                        className="rounded-full w-9 h-9"
                        src={item.user.image_url}
                        alt="profile picture"
                      />
                      <div className="space-y-0.5 font-medium text-left">
                        <div>{item.user.name}</div>
                        <div className="text-sm text-gray-500">
                          posted: {item.time_created}
                        </div>
                      </div>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
          <div className="p-5">
            <Map position={detail.coordinates} zoom={20} />
            <h2 className="mb-2 mt-5 text-lg font-semibold text-gray-900">
              Transactions:
            </h2>
            <ul className="max-w-md space-y-1 text-gray-500 list-inside">
              {detail.transactions.map((item, index) => {
                return (
                  <li className="flex items-center" key={index}>
                    <svg
                      className="w-3.5 h-3.5 mr-2 text-green-500 flex-shrink-0"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <footer>
        <div className="w-full max-w-screen-xl mx-auto p-4 mt-20">
          <span className="block text-sm text-gray-500 sm:text-center">
            © 2023{" "}
            <a href="https://www.62teknologi.com/" className="hover:underline">
              EnamDua™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;

  //   const data = await api.detail("/businesses", id);
  let data;
  let reviews;
  try {
    data = await axios
      .get(`http://localhost:5000/v3/businesses/${id}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));

    reviews = await axios
      .get(`http://localhost:5000/v3/businesses/${id}/reviews`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  } catch (error) {
    console.log("error", error);
  }

  if (!data || !reviews) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      detail: data,
      reviews: reviews,
    },
  };
}

export default BusinessesDet;
