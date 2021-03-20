import React from "react";
import { useSelector } from "react-redux";

import "../../styles/form.scss";

function Alert() {
  const alerts = useSelector((state) => state.alert);

  const alertMessage =
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => {
      return (
        <div key={alert.id} className={`alert-${alert.alertType} tada`}>
          {alert.msg}
        </div>
      );
    });

  return alertMessage;
}

export default Alert;
