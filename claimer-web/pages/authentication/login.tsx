import { Card, Col, Input, Row } from "antd";
import classNames from "classnames";
import React from "react";

import styles from "./login.module.scss";

const Login = (): JSX.Element => {
  return (
    <Row>
      <Col span={8} offset={8}>
        <Card title="Log In" className={classNames(styles.login_form_wrapper)}>
          <Input addonBefore="Username/Email" />
          <Input addonBefore="Password" />
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
