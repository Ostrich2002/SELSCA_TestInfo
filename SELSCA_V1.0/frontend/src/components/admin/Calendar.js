import React from 'react';
import { Accordion, AccordionItem } from 'smart-webcomponents-react/accordion';//for calendar -- working fine
import 'smart-webcomponents-react/source/styles/smart.default.css';//for calendar -- working fine


const MyScheduler = () => {
      return (
        <Accordion>  
        <AccordionItem label="First Item">First Item Content.</AccordionItem>  
        <AccordionItem label="Second Item">Second Item Content.</AccordionItem>  
        <AccordionItem label="Third Item">Third Item Content.</AccordionItem>  
        <AccordionItem label="Fourth Item">Fourth Item Content.</AccordionItem>  
        </Accordion> 
      ); 
  };
  export default MyScheduler;