import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { ApiError } from "@/services/UserService";
import { TypeHeader } from "@/types/enum";
import { GetServerSideProps } from "next";
import Link from "next/link";

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

const TermsConditions = (props: Props) => {
  const { token } = props;

  return (
    <>
      <Header logo="/images/logo4.png" token={token} type={TypeHeader.HOME} />
      <div className="container mx-auto px-4 mt-40 max-w-[1210px]">
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-dark mb-6" id="terms">
            Terms & Conditions
          </h3>
        </div>
        <div className="flex flex-col w-full space-y-10 mb-20">
          <div className="px-5 text-justify">
            <p className="mb-1">
              Before registering and shopping on websites and applications
              operating under the names 1TAP and 1TAP, users should review the
              following information.
            </p>
            <p className="mb-1">
              Users are deemed to have read and agreed to these terms if they
              have made a purchase or registered on a 1TAP-branded website or
              application. Please do not register for 1TAP sites or applications
              if you do not accept and read these conditions.
            </p>
            <p className="mb-1">
              Before using
              <Link href="https://1TAP.me/" passHref>
                https://1TAP.me
              </Link>
              , it is recommended that you review the Terms & Conditions, which contain the site&apos;s general rules and legal obligations.
            </p>
            <p className="mb-1">
              1TAP suggests that users visit the user agreement page every time
              they log in to the website.
            </p>
            <p className="mb-1">
              Please do not accept this agreement and discontinue use of this
              website if you do not agree with the specified terms.
            </p>
            <h2 className="text-xl font-semibold mt-2">General</h2>
            <ol className="list-decimal pl-5 mt-4 space-y-2">
              <li>
                The social media service descriptions on 1TAP Panel
                <Link href="https://1TAP.me/" passHref>
                  https://1TAP.me
                </Link>
                are valid for every 1000 orders, and customers who place orders
                should be aware that the numbers will increase proportionally to
                the order quantity.
              </li>
              <li>
                The service descriptions for each service contain varying
                explanations. Prior to placing an order, every customer has read
                and agreed to all of the description&apos;s terms. 1TAP does not
                provide refunds for any orders if the explanation section is not
                read.
              </li>
              <li>
                1TAP will automatically refund the remaining balance of your
                order if a portion of it is completed or canceled due to a
                service issue.
              </li>
              <li>
                1TAP Panel does not provide a guarantee for any of its social
                media services.
              </li>
              <li>
                1TAP customers are prohibited from taking any actions that may
                disturb others, and they do not place orders for topics
                containing obscene, coupons, politics, violence, insults,
                harassment, profanity, or illegal content. If a customer places
                an order with any of them included, their membership will be
                terminated without a refund of their remaining balance and
                without prior notice. 1TAP is not required to review every
                customer order that is placed. 1TAP will not accept any portion
                of an order that has been completed if it has been abused, and
                the customer will be held responsible.
              </li>
              <li>
                DG does not use the return policy and does not return the order
                if a link is removed or altered in an order placed through 1TAP.
              </li>
              <li>
                A customer who has registered and placed an order with 1TAP and
                its applications accepts these rules and has no grounds for
                complaint or legal action.
              </li>
              <li>
                1TAP reserves the right to modify the terms listed above without
                prior notice.
              </li>
              <li>
                Social media platforms are continually updated and revised. In
                addition to the updates, 1TAP services must also be updated. All
                1TAP customers must accept any transaction delays caused by these
                updates, changes, and problems. 1TAP reserves the right not to
                apply the return conditions in the event of an objection.
              </li>
              <li>
                Customers&apos; social media accounts are deactivated, and their
                posts are deleted, etc. 1TAP assumes no responsibility and
                reserves the terms of return, in the event of any action taken
                against their accounts, which is at the discretion of social
                media companies such as 1TAP. 1TAP services are solely responsible
                for completing the specified amounts. 1TAP disclaims all
                liability should the accounts be processed under the
                aforementioned circumstances.
              </li>
              <li>
                Customers of 1TAP should be aware that orders should not be
                placed on accounts whose e-mails have not been confirmed, whose
                Sms verification has not been completed, or which are newly
                opened.
              </li>
              <li>
                All 1TAP services and websites are managed by computer software.
                In the event that a 1TAP security vulnerability is not reported,
                legal action will be taken against the 1TAP customer in question,
                and his account will be closed without prior notice or refund.
              </li>
              <li>
                1TAP does not guarantee any activity or decrease in any order
                placed on 1TAP.
              </li>
              <li>
                Before the order is finalized, a second order should not be
                placed on the same profile/username/link. If this occurs, the
                amount spent may be wasted, the transactions may be delayed, and
                the fee might not be refunded. Whoever has registered and placed
                an order through the 1TAP applications accepts these rules and
                has no grounds for complaint or legal action.
              </li>
            </ol>

            <h2 className="text-xl font-semibold mt-2">General Conditions</h2>
            <p className="mb-1">
              1.a The site contains incorrect, irregular, incomplete, and
              misleading information, as well as statements that do not comply
              with general moral principles.
            </p>
            <p className="mb-1">
              1.b Unauthorized duplication in whole or in part of site content.
            </p>
            <p className="mb-1">
              1.c The user is directly liable for any damages that may result
              from the sharing of information such as username, password, and
              usage rights with third parties or organizations.
            </p>
            <p className="mb-1">
              1.d Using software that will compromise the site&apos;s security and
              prevent it from functioning.
            </p>
            <p className="mb-1">
              1.e Not utilizing practices such as disturbing site users,
              manipulating and enticing site users with improper and unethical
              emails, SMS, and other notifications.
            </p>
            <p className="mb-1">
              Those who disregard the preceding clauses are deemed to have
              accepted any potential legal and penal liability.
            </p>
            <h2 className="text-xl font-semibold mt-2">Terms of Use</h2>
            <p className="mb-1">
              2.a 1TAP websites and applications, with their general appearance
              and design, and all information, pictures, and other technical
              data are proprietary.
            </p>
            <p className="mb-1">
              It cannot be modified, copied, reproduced, translated, licensed,
              or transmitted without permission.
            </p>
            <p className="mb-1">
              The entirety or a portion of 1TAP websites and applications may not
              be used on another website without express permission. In
              contrast, legal and criminal responsibility is required for
              actions. Growers reserves any additional rights not expressly
              granted here.
            </p>
            <p className="mb-1">
              2.b All criticisms of 1TAP and its applications belong to 1TAP and
              its applications, and they may be used for marketing purposes by
              1TAP representatives if they so choose.
            </p>
            <h2 className="text-xl font-semibold mt-2">Responsibilities</h2>
            <p className="mb-1">
              3.a It is possible to track the information (visit time, time,
              pages viewed) of 1TAP and its applications users in order to
              better serve them.
            </p>
            <p className="mb-1">
              3.b The user is prohibited from interfering with or obstructing
              the use of 1TAP websites by others.
            </p>
            <p className="mb-1">
              3.c Messages and conversation records with 1TAP management cannot
              be backed up, stored, or shared without the permission of 1TAP
              administrators. 1TAP reserves all privacy rights.
            </p>
            <p className="mb-1">
              3.d The user can cancel their membership and delete their account
              by submitting a support request. The authorization of a user who
              cancels his 1TAP membership will be revoked for all 1TAP websites
              and applications. The individual who cancels their membership
              acknowledges that this action is irreversible. Administrators of
              1TAP websites and applications are permitted to delete any trace of
              a deactivated user account from 1TAP websites and applications. The
              user is not entitled to any compensation or recourse for the
              deleted records.
            </p>
            <p className="mb-1">
              3.e 1TAP websites and applications may contain links or references
              to external websites that are not managed by 1TAP. 1TAP websites and
              applications are not responsible for their content or links.
            </p>
            <p className="mb-1">
              3.f 1TAP websites and applications can be sent via letter, e-mail,
              e-mail address, e-mail address, e-mail address, fixed and mobile
              phone lines, and other contact information specified by the user
              in the registration form on the websites or applications, or
              updated by the user later. has the right to contact the user for
              communication, marketing, and notification purposes via email,
              SMS, phone, and other means. By accepting this agreement, the user
              accepts and declares that 1TAP websites and applications may engage
              in the aforementioned communication activities unless written
              notice to the contrary is provided.
            </p>
            <p className="mb-1">
              3.g In particular locations on 1TAP websites and applications,
              section-specific rules and obligations may be specified. It is
              assumed that individuals and organizations who utilize these
              sections have accepted these rules in advance.
            </p>
            <p className="mb-1">
              3.h Please review the &apos;Usage Agreement&apos; page to learn about the
              measures we take to protect the personal information and privacy
              of our users, as well as our general policy regarding this matter.
              The user agrees that he/she will be deemed to have accepted all
              terms of this participation agreement as soon as he/she begins to
              use the service and that the agreement will include a provision
              for him/her. The user agrees to indemnify 1TAP for any and all
              damages incurred by 1TAP websites and applications as a result of
              the user&apos;s breach of this agreement&apos;s obligations. 1TAP has
              recourse to the user for any compensation and/or
              administrative/judicial fines that the user may be required to pay
              to public institutions and/or third parties due to the breach of
              contract by 1TAP websites and applications.
            </p>
            <h2 className="text-xl font-semibold mt-2">Service Continuity</h2>
            <p className="mb-1">
              4.a 1TAP and its applications may modify this agreement
              unilaterally and without notice in order to maintain the
              continuity of its services. 1TAPand its applications reserve the
              right to permanently or temporarily discontinue the service they
              provide unilaterally and without explanation, to execute the site
              without refunding the balances and credits in 1TAP applications, to
              close access, and to modify or eliminate the service&apos;s contents.
              Under these terms and conditions, the user accepts every provision
              of the contract and registers for the website. 1TAP and its
              applications will publish updated terms of service under the same
              link with a new revision date, and users will be notified via
              e-mail or SMS if necessary. The updated current terms of service
              will become effective at the time of publication on 1TAP and its
              applications, and the use of 1TAP and its applications will be
              governed by the updated terms of service as of that time. 1TAP and
              its applications may unilaterally terminate the membership of any
              member who has sent 1TAP or its applications materials that violate
              the terms of this agreement without prior notice.
            </p>
            <p className="mb-1">
              4.b Upon registration or service usage, users agree to abide by
              the terms set by 1TAP.
            </p>

            <h2 className="text-xl font-semibold mt-2">
              Confidentiality Agreement
            </h2>
            <ol className="list-decimal pl-5 mt-4 space-y-2">
              <li>
                The records of 1TAP and its members&apos; transactions on the website
                are kept strictly confidential and are never disclosed to third
                parties.
              </li>
              <li>
                Service providers are notified of your orders. On the other
                hand, if requested by official government agencies, records can
                be provided to officials of official government agencies.
              </li>
              <li>
                The credit card information requested on the payment page is
                never stored on 1TAP, its applications, or the servers of the
                companies that serve it in order to maintain the highest level
                of security for our load-balancing customers.
              </li>
              <li>
                1TAP and its applications ensure that all payment transactions
                between payment systems and your device occur via the 1TAP
                interface.
              </li>
              <li>
                You can always reach us using the details provided below. All
                information that the customer enters into the system is
                accessible only to the customer, and only the customer can
                modify this information. This information cannot be accessed or
                modified by any other party.
              </li>
              <li>
                Registration in 1TAP and its applications or placing a successful
                order signifies your consent for our website to send you
                announcements via e-mail and phone. Users may opt out of the
                announcement list at any time, regardless of whether or not they
                notify 1TAP and its applications.
              </li>
            </ol>

            <h2 className="text-xl font-semibold mt-2">Refund Policy</h2>
            <p className="mb-1">
              Every balance, credit, or payment uploaded to 1TAP and its
              applications cannot be refunded. 1TAP may issue repayments if
              necessary.
            </p>
            <p className="mb-1">
              1TAP and its applications reserve the right to remove sent
              followers or likes if abuses are discovered.
            </p>
            <p className="mb-1">
              1TAP and its applications reserve the right to remove sent
              followers or likes if insults or abuse against 1TAP managers and
              employees are discovered.
            </p>
            <p className="mb-1">
              Accounts of individuals who make payments on behalf of another
              individual using a stolen credit card or other payment methods
              through 1TAP and its applications will be closed without
              explanation.
            </p>
            <p className="mb-1">
              After the orders have been entered into the system, your
              cancellation/refund request will be denied. The system will
              automatically issue a refund if the order is not completed or
              partially completed.
            </p>
            <p className="mb-1">
              Every customer who registers for 1TAP applications accepts the
              aforementioned terms and conditions and waives all complaints and
              legal claims.
            </p>
            <p className="mb-1">
              1TAP reserves the right to modify the terms of service without
              prior notification.
            </p>
            <p className="mt-6 font-semibold">Warmest regards,</p>
            <p className="mb-1">1TAP Team</p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default TermsConditions;
