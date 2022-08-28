import "./Login.scss";
import { Button, Form, Input } from "antd";
import { connect } from "react-redux";
import { login } from "@actions/userActions";
import { message } from "antd";

const _Login = ({ login }) => {
  const onFinish = async values => {
    try {
      await login(values);
      showMessage("success", "Login successfully");
      window.location = "/#/dashboard";
    } catch (error) {
      showMessage("error", "Error login in");
    }
  };
  const showMessage = (type, msg) => {
    message[type](msg);
  };

  return (
    <div className="login-container">
      <div className="login-content glass-bg">
        <h1>Login</h1>
        <Form
          name="basic"
          labelCol={{
            span: 8
          }}
          wrapperCol={{
            span: 16
          }}
          initialValues={{
            email: "test@examples.com",
            password: "test"
          }}
          onFinish={onFinish}
          autoComplete="off">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your username!"
              }
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!"
              }
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16
            }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="circles">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.userReducer.user
});

const mapDispatchToProps = {
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(_Login);
