import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { ApiError } from "@/services/UserService";
import { TypeHeader } from "@/types/enum";
import { GetServerSideProps } from "next";
import { useState } from "react";

type Props = {
  error: ApiError | null;
  token: string | null;
  isLayout: boolean;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const token = context.req.cookies.access_token;

  return {
    props: {
      error: null,
      token: token ?? null,
      isLayout: false,
    },
  };
};

const FAQ = (props: Props) => {
  const { token } = props;
  const faqs = [
    {
      question: "Why was my refill request rejected?",
      answer:
        "A refill can be rejected for a variety of reasons such as: 1. The order has dropped below the start count of the original order, in this case the number must be brought up organically or through a new quick service order so that the system can refill the original order. 2. The refill period outlined in the description of the order has now ended. 3. The service does not offer refill. 4.A new order has been made for the same link and there is overlap. If none of these reasons apply to you, please open a ticket with the support team for further assistance or clarification.",
    },
    {
      question: "Why was my order canceled?",
      answer:
        "Your orders will be canceled for one of the following reasons: 1. Placing two or more orders for the same link at the same time without waiting for completion. 2. The link format is incorrect or does not follow the instructions provided in the service description. 3. The service is currently being updated or under service. 4. In some cases, the quantity was not in increments of 100's or 1000's.",
    },
    {
      question: "Is it possible for the quantity ordered to decrease?",
      answer:
        "A drop is normal, that is why most services offer a refill guarantee. A drop can depend on many factors such as an update made by the social media platform, or on the quality of service chosen. Always make sure to read the service descriptions carefully to ensure you are making the correct order for your needs.",
    },
    {
      question: "How many tickets can I open?",
      answer:
        "You must open only one ticket for all your orders so we can help you better. After the request has been submitted or the issue has been solved, the ticket will be closed. Only then should you open a new ticket for new orders. The maximum limit for pending tickets is 3. A response must be made by the support team to be able to open a new ticket.",
    },
    {
      question: "Why is my order not completed yet?",
      answer:
        "Check the status of your order from the orders tab in your user dashboard before opening a ticket.To know the speed of the orders please refer to the service description. In the rare event that the status of your order has become complete but the service was not delivered, please open a ticket and tell us so to check the order for you.",
    },
    {
      question: "How can I send a screenshot to you?",
      answer:
        "You can send us a screenshot using this website : https://imgur.com/upload",
    },
  ];

  return (
    <>
      <Header logo="/images/logo4.png" token={token} type={TypeHeader.HOME} />
      <div className="container mx-auto px-4 py-12 pt-40">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-4 text-left text-lg font-medium text-gray-800 hover:bg-gray-100 focus:outline-none"
      >
        <span>{question}</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="p-4 text-gray-700 bg-gray-50">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQ;
