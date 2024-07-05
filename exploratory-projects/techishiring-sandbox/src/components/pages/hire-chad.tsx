import WithPageLayout from "interfaces/with-page-layouts";
import DefaultLayout from "components/templates/layouts/default-layout";
import HireChadContent from "components/organisms/hire-chad-content/hire-chad-content";

interface HireChadProps {

};

const HireChad: WithPageLayout<HireChadProps> = () => {

  return ( 
    <>

      <HireChadContent />

    </>
  );
};
HireChad.PageLayout = DefaultLayout;
export default HireChad;