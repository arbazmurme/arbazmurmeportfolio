import ContactForm from "../ContactForm";
import { PERSONAL_INFO } from "@/data/portfolioData";

const Contact = () => {
  return (
    <section className="" id="contact">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-4">
          <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
            <p className="text-base font-semibold uppercase tracking-wide">
              Contact
            </p>
            <h2 className="font-heading mb-4 font-bold tracking-tight text-3xl sm:text-5xl text-[#ffb400]">
              Let&apos;s Work Together
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-xl ">
              Let&apos;s discuss how I can contribute to your next big idea. Feel
              free to reach out, and let&apos;s make something great together!
            </p>
          </div>
        </div>
        <div className="flex items-stretch justify-center">
          <div className="grid md:grid-cols-2">
            <div className="h-full pr-6">
              <p className="mt-3 mb-12 text-lg">
                Are you looking for a skilled developer to bring your project to
                life? I&apos;m always excited to collaborate on new and challenging
                projects. Whether you need a complete web solution or just a bit
                of technical expertise, I&apos;m here to help.
              </p>
              <ul className="mb-6 md:mb-0">
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-[#ffb400]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                      <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-[#ffb400]">
                      Our Address
                    </h3>
                    <p>
                      {PERSONAL_INFO.address}
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-[#ffb400]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                      <path d="M15 7a2 2 0 0 1 2 2"></path>
                      <path d="M15 3a6 6 0 0 1 6 6"></path>
                    </svg>
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-[#ffb400]">
                      Contact
                    </h3>
                    <p className="">
                      Mobile:{" "}
                      <a
                        href={PERSONAL_INFO.phoneHref}
                        className="hover:text-[#ffb400] transition-colors"
                      >
                        {PERSONAL_INFO.phone}
                      </a>
                    </p>
                    <p className="">
                      Mail:{" "}
                      <a
                        href={PERSONAL_INFO.emailHref}
                        className="hover:text-[#ffb400] transition-colors"
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-[#ffb400]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                      <path d="M12 7v5l3 3"></path>
                    </svg>
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-[#ffb400]">
                      Available
                    </h3>
                    <p className="">
                      As a Web Developer
                    </p>
                    <p className="">
                      Currently open for freelance projects.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="card h-fit max-w-6xl p-5 md:p-12" id="form">
              <h2 className="mb-4 text-2xl font-bold text-[#ffb400]">
                Ready to Get Started?
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
