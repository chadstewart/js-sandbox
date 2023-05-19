import WithPageLayout from "interfaces/with-page-layouts";
import DefaultLayout from "components/templates/layouts/default-layout";
import ContactContent from "components/organisms/contact-content/contact-content";

interface ContactProps {

};

const Contact: WithPageLayout<ContactProps> = () => {

  return ( 
    <>

      <ContactContent />

    </>
  );
};
Contact.PageLayout = DefaultLayout;
export default Contact;