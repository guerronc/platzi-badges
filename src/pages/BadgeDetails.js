import React from "react";
import { Link } from "react-router-dom";
import Badge from "../components/Badge";
import confLogo from "../images/platziconf-logo.svg";
import "./styles/BadgeDetails.css";
import DeleteBadgeModal from "../components/DeleteBadgeModal";

function useIncreaseCount(max) {
  const [count, setCount] = React.useState(0);

  if (count > max) {
    setCount(0);
  }

  return [count, setCount];
}

function BadgeDetails(props) {
  const [count, setCount] = useIncreaseCount(4);
  const { data } = props;
  return (
    <div>
      <div className="BadgeDetails__hero">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <img src={confLogo} alt="logo de la conferencia" />
            </div>
            <div className="col-6 BadgeDetails__hero-attendant-name">
              <h1>
                {data.firstName} {data.lastName}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col">
            <Badge
              firstName={data.firstName}
              lastName={data.lastName}
              twitter={data.twitter}
              jobTitle={data.jobTitle}
              email={data.email}
            />
          </div>
          <div className="col">
            <h2>Actions</h2>
            <div>
              <button
                onClick={() => {
                  setCount(count + 1);
                }}
                className="btn btn-primary mr-4"
              >
                Increase count: {count}
              </button>
              <Link
                className="btn btn-primary mb-4"
                to={`/badges/${data.id}/edit`}
              >
                Edit
              </Link>
            </div>
            <div>
              <button onClick={props.onOpenModal} className="btn btn-danger">
                Delete
              </button>
              <DeleteBadgeModal
                isOpen={props.modalIsOpen}
                onClose={props.onCloseModal}
                onDeleteBadge={props.onDeleteBadge}
              >
                orem Itsum
              </DeleteBadgeModal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BadgeDetails;
