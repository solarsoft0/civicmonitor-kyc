import React from "react";

export default function IssuePositions(props) {
  const { IssuePositions } = props;
  console.log(IssuePositions);
  return (
    <div>
      <div className="flex border-b-2 border-grey-light mb-4">
        <span className="font-display font-bold tracking-wide uppercase py-4 border-b-2 border-indigo -mb-2px">
          Issue Positions
        </span>
      </div>
      {/* another info card */}

      {IssuePositions &&
        IssuePositions.map(position => (
          <div key= {position.id} className="bg-white w-full shadow rounded mt-5 p-5 whitespace-pre-wrap">
            {position.issue.title && (
              <h3 className="mb-5">{position.issue.title}</h3>
            )}
            {position.title && <h4 className="mb-5">{position.title}</h4>}
            <div dangerouslySetInnerHTML={{ __html: position.body }} />
          </div>
        ))}
    </div>
  );
}
