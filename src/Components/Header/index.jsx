import {
  Menu,
  Typography,
  Badge,
  Drawer,
  Table,
  Form,
  Input,
  InputNumber,
  Button,
  Checkbox,
  message,
} from "antd";
import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { useEffect, useState } from "react";
import { getCart } from "../../API";

const AppHeader = () => {
  const navigate = useNavigate();
  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
  };
  return (
    <div className="appHeader">
      <Menu
        className="appMenu"
        onClick={onMenuClick}
        mode="horizontal"
        items={[
          {
            label: <HomeFilled />,
            key: "",
          },
          {
            label: "Men",
            key: "men",
            children: [
              {
                label: "Men's Shirts",
                key: "mens-shirts",
              },
              {
                label: "Men's Shoes",
                key: "mens-shoes",
              },
              {
                label: "Men's Watches",
                key: "mens-watches",
              },
            ],
          },
          {
            label: "Women",
            key: "women",
            children: [
              {
                label: "Women's Dresses",
                key: "womens-dresses",
              },
              {
                label: "Women's Shoes",
                key: "womens-shoes",
              },
              {
                label: "Women's Watches",
                key: "womens-watches",
              },
              {
                label: "Women's Bags",
                key: "womens-bags",
              },
              {
                label: "Women's Jewellery",
                key: "womens-jewellery",
              },
            ],
          },
          {
            label: "Fragrances",
            key: "fragrances",
          },
        ]}
      />
      <Typography.Title> Gowri's store </Typography.Title>
      <AppCart />
    </div>
  );
};

const AppCart = () => {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutDrawerOpen, setCheckoutDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    getCart().then((res) => {
      setCartItems(res.products);
    });
  }, []);
  const onConfirmOrder = (values) => {
    setCartDrawerOpen(false);
    setCheckoutDrawerOpen(false);
    message.success("Your order has been placed successfully");
  };
  return (
    <div>
      <Badge
        onClick={() => setCartDrawerOpen(true)}
        count={cartItems.length ?? ""}
        className="shoppingCartIcon"
      >
        <ShoppingCartOutlined />
      </Badge>
      <Drawer
        open={cartDrawerOpen}
        onClick={() => {
          setCartDrawerOpen(false);
        }}
        title="Your cart"
        contentWrapperStyle={{ width: 600 }}
      >
        <Table
          pagination={false}
          columns={[
            {
              title: "Title",
              dataIndex: "title",
            },
            {
              title: "Price",
              dataIndex: "price",
              render: (value) => {
                return <span>${value}</span>;
              },
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              render: (value, record) => {
                return (
                  <InputNumber
                    min={0}
                    defaultValue={value}
                    onChange={(value) => {
                      setCartItems((pre) =>
                        pre.map((cart) => {
                          if (record.id === cart.id) {
                            cart.total = cart.price * value;
                          }
                          return cart;
                        })
                      );
                    }}
                  ></InputNumber>
                );
              },
            },

            {
              title: "Total",
              dataIndex: "total",
              render: (value) => {
                return <span>${value}</span>;
              },
            },
          ]}
          dataSource={cartItems}
          summary={(data) => {
            const total = data.reduce((pre, current) => {
              return pre + current.total;
            }, 0);
            return <span>Total Amount:${total}</span>;
          }}
        />
        <Button
          onClick={() => {
            setCheckoutDrawerOpen(true);
          }}
          type="primary"
          style={{ position: "relative", top: "7px" }}
        >
          Checkout Your Cart
        </Button>
      </Drawer>
      <Drawer
        open={checkoutDrawerOpen}
        onClose={() => {
          setCheckoutDrawerOpen(false);
        }}
        title="Confirm Order"
      >
        <Form onFinish={onConfirmOrder}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your full name",
              },
            ]}
            label="Full Name"
            name="full_name"
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter your email",
              },
            ]}
            label="Email"
            name="your_email"
          >
            <Input placeholder="Enter your Email" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your address",
              },
            ]}
            label="Address"
            name="your_address"
          >
            <Input placeholder="Enter your full address" />
          </Form.Item>
          <Form.Item>
            <Checkbox defaultChecked disabled>
              Cash on Delivery
            </Checkbox>
          </Form.Item>
          <Typography.Paragraph type="secondary">
            More methods coming soon
          </Typography.Paragraph>
          <Button type="primary" htmlType="submit">
            {""}Confirm Order
          </Button>
        </Form>
      </Drawer>
    </div>
  );
};

export default AppHeader;
