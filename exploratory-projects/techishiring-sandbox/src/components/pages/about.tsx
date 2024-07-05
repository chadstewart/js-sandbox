import WithPageLayout from "interfaces/with-page-layouts";
import DefaultLayout from "components/templates/layouts/default-layout";
import AboutContent from "components/organisms/about-content/about-content";

interface AboutProps {}

const About: WithPageLayout<AboutProps> = () => {
  return (
    <>  
      <AboutContent />
    </>
  );
};

About.PageLayout = DefaultLayout;

export default About;
