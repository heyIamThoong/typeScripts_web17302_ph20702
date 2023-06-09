import { Link } from "react-router-dom";

import { Card, Col, Row, Spin, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Tproduct } from "../types/product";

const { Search } = Input;

const { Meta } = Card;

interface ProductsPage {
  product: Tproduct[];
}

const Test = (props: ProductsPage) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  if (!props.product) return <Spin indicator={antIcon} />;

  const [searchText, setSearchText] = useState("");

  const filterPro = props.product?.filter((item) =>
    item?.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
  );
  return (
    <div style={{ maxWidth: "90%", margin: "0 auto" }}>
      <Search
        style={{ width: "22%", margin: 20, marginBottom: 40, marginLeft: 40 }}
        placeholder="Search name . . ."
        size="large"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        loading
      />
      <Row gutter={[16, 16]}>
        {filterPro?.map((product) => (
          <Col span={6}>
            <Link to={`/products/${product._id}`}>
              <Card
                hoverable
                style={{ width: 280 }}
                cover={<img src={product.image} />}
              >
                <Meta
                  title={product.name}
                  description={product.price?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Test;
