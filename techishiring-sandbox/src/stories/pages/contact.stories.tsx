import DefaultLayout from "components/templates/layouts/default-layout";
import Contact from "../../components/pages/contact";

const storyConfig = {
  title: "Design System/Pages/Contact"
};

export default storyConfig;

export const ContactStory = () => (
  <DefaultLayout>
    <Contact />
  </DefaultLayout>
);