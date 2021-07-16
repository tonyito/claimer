import { Button, Col, Row } from "antd";
import classNames from "classnames";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { ChildrenProps } from "types/reactTypes";

import layoutStyles from "./layoutStyles.module.scss";

const Layout = ({ children }: ChildrenProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Claimer</title>
        <meta name="description" content="Claimer Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Row className={classNames(layoutStyles.header_container)}>
          <Col span={4}>
            <h2
              className={classNames(
                "text_light",
                layoutStyles.title_top_left_h2
              )}
            >
              Claimer
            </h2>
          </Col>
          <Col span={4} offset={16}>
            <div
              className={classNames(
                "flex_box_row",
                "flex_end",
                layoutStyles.button_top_right_wrapper
              )}
            >
              <Button
                className={classNames(layoutStyles.button_top_right)}
                type="default"
              >
                Sign Up
              </Button>
              <Link href={"/authentication/login"}>
                <a>
                  <Button
                    className={classNames(layoutStyles.button_top_right)}
                    type="primary"
                  >
                    Log In
                  </Button>
                </a>
              </Link>
            </div>
          </Col>
        </Row>
      </header>
      {children}
      <footer className={layoutStyles.footer}>
        <span>Claimer Marketplace</span>
      </footer>
    </>
  );
};

export default Layout;
