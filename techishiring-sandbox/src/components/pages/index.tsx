import WithPageLayout from "interfaces/with-page-layouts";
import DefaultLayout from "components/templates/layouts/default-layout";
import TwitterFeed from "components/organisms/twitter-feed/twitter-feed";
import Hero from "components/molecules/hero-section/hero";
import WhyChooseSection from "components/molecules/why-choose/why-choose-section";
import HighlightsContent from "components/organisms/highlights-content/highlights-content";

interface HomeProps {}

const Home: WithPageLayout<HomeProps> = () => {
  return (
    <>
      <Hero />
      <WhyChooseSection />
      <HighlightsContent />
      <TwitterFeed />
    </>
  );
};

Home.PageLayout = DefaultLayout;

export default Home;
