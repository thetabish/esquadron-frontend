import React from "react";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    <div
      className=" flex justify-center items-center h-screen font-poppins"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-vector/cats-doodle-pattern-background_53876-100663.jpg?w=996&t=st=1685919510~exp=1685920110~hmac=c93e9c8b8acb9414c960e11849fa400ad0e40828664187ccfc4793a3f9457e3d)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-2/3 bg-slate-200 p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
        <p>
          Welcome to our cat-tastic website! By accessing this site, you agree
          to the following feline-fabulous terms and conditions:
        </p>
        <ol className="list-decimal ml-6">
          <li>
            Meow-ltilingual Communication: Our website employs the finest cat
            translators. However, we cannot guarantee the accuracy of the
            translations from human language to "Meow."
          </li>
          <li>
            Catnip Disclaimer: We do not take responsibility for any excessive
            purring, rolling around, or catnip-induced shenanigans that may
            occur while browsing our site.
          </li>
          <li>
            Fur Allergies: If you are allergic to adorable furballs, we
            recommend using our website with caution or consulting a
            professional cat cuddler before proceeding.
          </li>
          <li>
            Purr-sonal Data: Rest assured, we will never share your personal
            information with any third parties. We value your privacy as much as
            a cat values an empty cardboard box.
          </li>
          <li>
            Scratching Post Policy: We cannot be held responsible for any
            furniture scratching incidents that may occur due to your cat's
            excitement or admiration of our website.
          </li>
          <li>
            Cat-clusive Content: Our website is designed for cats and cat
            lovers. If you are a dog enthusiast, you may experience occasional
            confusion or bouts of jealousy.
          </li>
          <li>
            Treats and Surprises: We occasionally offer surprises and treats.
            However, these are subject to availability, and we cannot guarantee
            your cat will share them with you.
          </li>
          <li>
            Paw-some Experience: We strive to make your visit as enjoyable as a
            catnip party. However, we cannot be held responsible for any sudden
            demands for belly rubs or head scratches from your feline companion.
          </li>
        </ol>
        <p>
          By continuing to use our website, you acknowledge that you have read,
          understood, and accept our funny terms and conditions. If you have any
          questions, please feel free to contact our meow-nificent support team.
        </p>
        {/* Add more content as needed */}
        <button
          type="button"
          class=" mt-6 self-start text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          <Link to = "/signup">Go Back</Link>
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
