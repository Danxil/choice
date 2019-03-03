import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Icon, Button, Modal } from 'antd';
import { compose, pure, withProps, withHandlers } from 'recompose';
import { withRouter } from 'react-router';
import withUser from '../../containers/withUser';
import Spinner from '../common/Spinner';
import Link from '../common/Link';
import styles from './index.module.scss';

const FormItem = Form.Item;

const SignIn = ({
  form: { getFieldDecorator },
  handleSubmit,
  showModal,
  history,
}) => {
  return (
    <Modal
      className={styles.loginModal}
      title="Введіть дані вашого користувача"
      visible={showModal === 'sign-in'}
      footer={
        <Spinner spinnerKey="LOGIN">
          <Button type="primary" onClick={handleSubmit}>
            Відправити
          </Button>
        </Spinner>
      }
      onOk={() => {}}
      onCancel={() => {history.push(`./?`)}}
    >
      <Form>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [
              { required: true, message: 'Будь ласка, введіть email' },
              { type: 'email', message: 'Невалідний email' },
            ],
          })(
            <Input prefix={<Icon type="mail" />} placeholder="Email" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Будь ласка, введіть пароль' }],
          })(
            <Input prefix={<Icon type="lock" />} type="password" placeholder="Пароль" />
          )}
        </FormItem>
        <div className={styles.linksBlock}>
          <Link to={{ pathname: './', search: '?showModal=sign-up' }}>Зарееструвати</Link> нового користувача
        </div>
      </Form>
    </Modal>
  );
};

export default compose(
  Form.create(),
  withRouter,
  withUser(),
  withProps(() => ({ query: new URLSearchParams(location.search) })),
  withProps(({ query }) => {
    return ({
      showModal: query.get('showModal'),
    });
  }),
  withHandlers({
    handleSubmit: ({ signIn, form: { validateFields } }) => () => {
      validateFields((err, values) => {
        if (!err) {
          signIn(values);
        }
      });
    }
  }),
  pure,
)(SignIn);

SignIn.defaultProps = {
  invitedBy: null,
  showModal: null,
};

SignIn.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  showModal: PropTypes.string,
};
