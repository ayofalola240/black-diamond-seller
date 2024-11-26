import { Routes } from "@/lib/utils";
import Link from "next/link";

export default function Page() {
  return (
    <article className="w-full text-white max-w-container mx-auto flex flex-col py-[30px] sm:py-[60px] px-6 gap-6 ">
      <header className="pb-[10px] sm:pb-[20px] border-b border-[#EEEEEE]">
        <h2 className="section-header">Terms and conditions</h2>
      </header>
      <section className="flex gap-6 flex-col">
        <p>
          <strong> 1. Introduction:</strong> Welcome to Black Diamond Foundation’s auction site. By accessing or using our website, you agree to be bound by these Terms and
          Conditions. If you do not agree, please do not use our website.
        </p>
        <div>
          <p>
            <strong> 2. Definitions:</strong>
            <ul className="ml-4">
              <li>• “User” refers to any individual or entity accessing the website.</li>
              <li>• “Foundation” refers to Black Diamond Foundation.</li>
            </ul>
          </p>
        </div>
        <p>
          <strong>3. Use of the Service:</strong> Users agree to use the website for lawful purposes only. Unauthorized use, such as accessing non-public parts of the site or
          disrupting its functionality, is strictly prohibited.
        </p>
        <p>
          <strong> 4. User Obligations:</strong> Users must provide accurate and complete information when interacting with the site. Users are responsible for maintaining the
          confidentiality of their account information.
        </p>
        <p>
          <strong> 5. Intellectual Property Rights:</strong> All content on this website, including text, graphics, logos, and images, is the property of the Foundation.
          Unauthorized reproduction, distribution, or modification is prohibited.
        </p>
        <p>
          <strong> 6. User-Generated Content:</strong> If users submit content (e.g., comments or feedback), they grant the Foundation a non-exclusive, royalty-free license to use,
          reproduce, and publish this content as necessary. The Foundation reserves the right to remove user content that violates these Terms.
        </p>
        <p>
          <strong>7. Privacy:</strong> Please refer to our{" "}
          <Link className="underline" href={Routes.Privacy}>
            Privacy Policy
          </Link>{" "}
          for details on how we collect, use, and protect user information.
        </p>
        <div>
          <p>
            <strong> 8. Prohibited Activities Users must not:</strong>
            <ul className="ml-4">
              <li>• Engage in any fraudulent activity or post defamatory or harmful content.</li>
              <li>• Attempt to interfere with the website&apos;s functionality or security.</li>
              <li>• Use the site in any manner that violates applicable local or international laws.</li>
            </ul>
          </p>
        </div>
        <p>
          <strong> 9. Third-Party Links and Content:</strong> Our website may include links to third-party sites. The Foundation does not control these sites and is not responsible
          for their content or practices. Users access them at their own risk.
        </p>
        <p>
          <strong> 10. Disclaimers and Limitation of Liability:</strong> The Foundation makes no warranties about the accuracy or completeness of the site content. Users agree that
          the Foundation will not be held liable for any damages resulting from their use or inability to use the website.
        </p>
        <p>
          <strong> 11. Indemnification:</strong> Users agree to indemnify and hold the Foundation harmless from any claims, damages, or expenses (including legal fees) arising from
          their use of the website or violation of these Terms.
        </p>
        <p>
          <strong> 12. Termination:</strong> The Foundation reserves the right to suspend or terminate user access without prior notice for violation of these Terms or any
          applicable law.
        </p>
        <p>
          <strong> 13. Governing Law:</strong> These Terms are governed by the laws of Nigeria. Any disputes arising from the use of this website shall be resolved under Nigerian
          jurisdiction.
        </p>
        <p>
          <strong> 14. Modifications to Terms:</strong> The Foundation reserves the right to amend these Terms at any time. Users will be notified of significant changes through
          updates on this page. Continued use of the website after changes implies acceptance.
        </p>
        <p>
          <strong> 15. Contact Information:</strong> For questions or concerns regarding these Terms, please contact us at{" "}
          <a href="mailto:bdauction@whitepool.co">bdauction@whitepool.co</a>
        </p>
        <p>
          <strong> 16. Acceptance:</strong> By using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
        </p>
        <p>
          <strong> 17. Miscellaneous:</strong> If any part of these Terms is found unenforceable, the remaining sections will still apply. These Terms constitute the entire
          agreement between the Foundation and the user.
        </p>
      </section>
    </article>
  );
}
