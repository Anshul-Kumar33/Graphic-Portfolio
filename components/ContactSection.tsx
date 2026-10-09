"use client";

import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Backend submission temporarily disabled
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus("");

    // Backend/API intentionally left blank for now
    await new Promise((resolve) => setTimeout(resolve, 500));

    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: "ri-mail-line",
      label: "Email",
      value: "anshukumar921182@gmail.com",
      link: "mailto:anshukumar921182@gmail.com",
    },
    {
      icon: "ri-phone-line",
      label: "Phone",
      value: "+91 9643715949",
      link: "tel:+919643715949",
    },
    {
      icon: "ri-map-pin-line",
      label: "Location",
      value: "New Delhi, India",
      link: null,
    },
  ];

  const socialLinks = [
    {
      icon: "ri-instagram-line",
      name: "Instagram",
      url: "#",
    },
    {
      icon: "ri-linkedin-line",
      name: "LinkedIn",
      url: "#",
    },
    {
      icon: "ri-behance-line",
      name: "Behance",
      url: "#",
    },
    {
      icon: "ri-dribbble-line",
      name: "Dribbble",
      url: "#",
    },
  ];

  return (
    <section
      id="contact"
      className="
        py-20
        bg-[var(--background)]
        transition-colors
        duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADING */}

        <div className="text-center mb-12 animate-fadeInUp">
          <h2
            className="
              text-4xl
              font-bold
              text-[var(--text-primary)]
              mb-4
            "
          >
            Let's Work Together
          </h2>

          <p
            className="
              text-xl
              text-[var(--text-secondary)]
              max-w-3xl
              mx-auto
            "
          >
            Ready to bring your vision to life? Get in touch and let's create
            something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* =================================================
              CONTACT FORM
          ================================================= */}

          <div className="animate-fadeInLeft">
            <h3
              className="
                text-2xl
                font-bold
                text-[var(--text-primary)]
                mb-6
              "
            >
              Send a Message
            </h3>

            <form
              id="anshul-portfolio-contact"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* NAME */}

              <div>
                <label
                  htmlFor="name"
                  className="
                    block
                    text-sm
                    font-medium
                    text-[var(--text-secondary)]
                    mb-2
                  "
                >
                  Name *
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="
                    w-full
                    px-4
                    py-3
                    bg-[var(--card)]
                    border
                    border-[var(--border)]
                    text-[var(--text-primary)]
                    placeholder:text-[var(--text-muted)]
                    rounded-lg
                    focus:ring-2
                    focus:ring-blue-500
                    focus:border-transparent
                    transition-all
                    duration-300
                    text-sm
                    outline-none
                  "
                  placeholder="Your full name"
                />
              </div>

              {/* EMAIL */}

              <div>
                <label
                  htmlFor="email"
                  className="
                    block
                    text-sm
                    font-medium
                    text-[var(--text-secondary)]
                    mb-2
                  "
                >
                  Email *
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="
                    w-full
                    px-4
                    py-3
                    bg-[var(--card)]
                    border
                    border-[var(--border)]
                    text-[var(--text-primary)]
                    placeholder:text-[var(--text-muted)]
                    rounded-lg
                    focus:ring-2
                    focus:ring-blue-500
                    focus:border-transparent
                    transition-all
                    duration-300
                    text-sm
                    outline-none
                  "
                  placeholder="your.email@example.com"
                />
              </div>

              {/* MESSAGE */}

              <div>
                <label
                  htmlFor="message"
                  className="
                    block
                    text-sm
                    font-medium
                    text-[var(--text-secondary)]
                    mb-2
                  "
                >
                  Message *
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  maxLength={500}
                  rows={6}
                  className="
                    w-full
                    px-4
                    py-3
                    bg-[var(--card)]
                    border
                    border-[var(--border)]
                    text-[var(--text-primary)]
                    placeholder:text-[var(--text-muted)]
                    rounded-lg
                    focus:ring-2
                    focus:ring-blue-500
                    focus:border-transparent
                    transition-all
                    duration-300
                    text-sm
                    resize-none
                    outline-none
                  "
                  placeholder="Tell me about your project..."
                />

                <div
                  className="
                    text-right
                    text-sm
                    text-[var(--text-muted)]
                    mt-1
                  "
                >
                  {formData.message.length}/500
                </div>
              </div>

              {/* SUBMIT BUTTON */}

              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  w-full
                  bg-blue-600
                  hover:bg-blue-700
                  dark:bg-blue-500
                  dark:hover:bg-blue-600
                  text-white
                  font-semibold
                  py-4
                  px-6
                  rounded-lg
                  transition-all
                  duration-300
                  transform
                  hover:scale-105
                  shadow-lg
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  cursor-pointer
                  whitespace-nowrap
                "
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {/* STATUS AREA */}

              {submitStatus && (
                <div className="p-4 rounded-lg text-center">{submitStatus}</div>
              )}
            </form>
          </div>

          {/* =================================================
              CONTACT INFORMATION
          ================================================= */}

          <div className="animate-fadeInRight">
            <h3
              className="
                text-2xl
                font-bold
                text-[var(--text-primary)]
                mb-6
              "
            >
              Get in Touch
            </h3>

            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="
                      w-12
                      h-12
                      bg-blue-100
                      dark:bg-blue-950/60
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      mr-4
                      shrink-0
                    "
                  >
                    <i
                      className={`${info.icon} text-xl text-blue-600 dark:text-blue-400`}
                    />
                  </div>

                  <div>
                    <div
                      className="
                        text-sm
                        text-[var(--text-muted)]
                      "
                    >
                      {info.label}
                    </div>

                    {info.link ? (
                      <a
                        href={info.link}
                        className="
                          text-lg
                          font-medium
                          text-[var(--text-primary)]
                          hover:text-blue-600
                          dark:hover:text-blue-400
                          transition-colors
                          cursor-pointer
                        "
                      >
                        {info.value}
                      </a>
                    ) : (
                      <div
                        className="
                          text-lg
                          font-medium
                          text-[var(--text-primary)]
                        "
                      >
                        {info.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* SOCIAL LINKS */}

            <div className="mb-8">
              <h4
                className="
                  text-lg
                  font-semibold
                  text-[var(--text-primary)]
                  mb-4
                "
              >
                Follow Me
              </h4>

              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      w-12
                      h-12
                      bg-[var(--surface)]
                      hover:bg-blue-600
                      dark:hover:bg-blue-500
                      text-[var(--text-secondary)]
                      hover:text-white
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      transition-all
                      duration-300
                      transform
                      hover:scale-110
                      cursor-pointer
                      border
                      border-[var(--border)]
                    "
                    title={social.name}
                  >
                    <i className={`${social.icon} text-xl`} />
                  </a>
                ))}
              </div>
            </div>

            {/* OFFICE LOCATION */}

            <div
              className="
                bg-[var(--surface)]
                p-6
                rounded-xl
                border
                border-[var(--border)]
              "
            >
              <h4
                className="
                  text-lg
                  font-semibold
                  text-[var(--text-primary)]
                  mb-3
                "
              >
                Office Location
              </h4>

              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.48349042588!2d77.04417154101553!3d28.52725473775198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1703847000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
