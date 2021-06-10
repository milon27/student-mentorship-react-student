import React, { useContext } from "react";
import { Alert, Col, Spinner } from "react-bootstrap";
import AppAction from "./../../utils/context/actions/AppAction";
import {
  DispatchContext,
  StateContext
} from "./../../utils/context/MainContext";

export default function AlertLoading({ loadColor }) {
  const { app } = useContext(StateContext);
  const { appDispatch } = useContext(DispatchContext);
  const removeResponse = () => {
    new AppAction(appDispatch).REMOVE_RESPONSE();
  };
  return (
    <Col xs={12} className="d-flex justify-content-center mb-3">
      <div>
        {app.loading ? (
          <Spinner animation="border" variant={loadColor} />
        ) : (
          <></>
        )}
        {app.response.type ? (
          <>
            <Alert
              variant={app.response.type}
              onClose={removeResponse}
              dismissible
            >
              <Alert.Heading>{app.response.title}</Alert.Heading>
              <p>{app.response.desc}</p>
            </Alert>
          </>
        ) : (
          <></>
        )}
      </div>
    </Col>
  );
}
