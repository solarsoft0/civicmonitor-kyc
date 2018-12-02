import React from "react";
import "react-accessible-accordion/dist/fancy-example.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';

export default function IssuePositions(props) {
  const { IssuePositions } = props;
  console.log(IssuePositions);
  return <div style={{ textAlign : "justify"}}>
      <div className="flex border-b-2 border-grey-light mb-4">
        <span className="font-display font-bold tracking-wide uppercase py-4 border-b-2 border-indigo -mb-2px">
          Issue Positions
        </span>
      </div>
      {/* another info card */}

      {IssuePositions && IssuePositions.map(position => (
          <div
            key={position.id}
            className="bg-white w-full shadow rounded mt-5 p-5 whitespace-pre-wrap"
          >
        <Accordion className="no-border">
          <AccordionItem > 
            <AccordionItemTitle>
                  {position.issue.title && (
                    <h3 className="mb-5 u-position-relative u-margin-bottom-s">
                      {position.issue.title}{" "}
                      <div className="accordion__arrow" role="presentation" />
                    </h3>
                  )}
                </AccordionItemTitle>
                <AccordionItemBody>
                  {position.title && (
                    <h4 className="mb-5">{position.title}</h4>
                  )}
                  <div
                  style={{textAlign: "justify", lineHeight: "2.4", fontSize: "20px", background: "rgb(52, 144, 220)", color: "#fff", padding: "15px", borderRadius: "5px"}}

                    className="leading-loose"
                    dangerouslySetInnerHTML={{ __html: position.body }}
                  />{" "}
                </AccordionItemBody>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
    </div>;
}
