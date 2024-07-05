import { AccordionContent } from "../components/atom/accordion/content/content";
import { AccordionItem } from "../components/atom/accordion/item/item";
import { Accordion } from "../components/particle/accordion/accordion";
import { AccordionTrigger } from "../components/atom/accordion/trigger/trigger";

const storyConfig = {
  title: "Design System/Accordion Example"
};

export default storyConfig;

export const AboutStory = () => (
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>Yo</AccordionTrigger>
      <AccordionContent>
        What's up?
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);