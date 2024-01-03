import { useState } from "react";
import formatDateToCustomFormat from "@/helpers/dateFormatter";
import ReadCommentModal from "@/components/Modals/readReasonOfRejection";

const DetailedInformation = ({ data}) => {
  const [showReadComment, setShowReadComment] = useState(false)
  const toggleShowReadComment = () => {
    setShowReadComment(!showReadComment)
  }
  return (
    <>
      <div>
        <table className="table">
          <thead>
            <tr className="table-primary">
              <th>DETAILED INFORMATION OF THE REQUEST</th>
            </tr>
          </thead>
        </table>
        <table className="table table-borderless font-monospace">
          <tbody>
            <tr>
              <td>staff names :</td>
              <td>{data.owner.firstname} {data.owner.firstname}</td>
            </tr>
            <tr>
              <td>Item requested:</td>
              <td>{data.item.ItemName} </td>
            </tr>
            <tr>
              <td>Item type :</td>
              <td>{data.item.itemType} </td>
            </tr>
            <tr>
              <td>Approved? :</td>
              <td><span className="text-primary">{data.status === "Approved" ? "Yes,approved" : "No,rejected"}</span> </td>
            </tr>
            {data.status === "Rejected" && (
              <>
                <tr>
                  <td>Rejected On :</td>
                  <td>{formatDateToCustomFormat(data.rejectionDetails.rejectedOn)} </td>
                </tr>
                <tr>
                  <td>Reason of rejection :</td>
                  <td><button className="btn btn-sm btn-primary" onClick={() => toggleShowReadComment()}>click to read the reason</button> </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
        <div>
          {showReadComment && <ReadCommentModal
            isOpen={showReadComment}
            toggle={toggleShowReadComment}
            comment={data.rejectionDetails.comment}
          />
          }
        </div>
      </div>
    </>
  );
};

export default DetailedInformation;
