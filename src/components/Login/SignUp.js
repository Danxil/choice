import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Icon, Button, Modal } from 'antd';
import { compose, pure, withProps, withHandlers } from 'recompose';
import { withRouter } from 'react-router-dom';
import withUser from '../../containers/withUser';
import Spinner from '../common/Spinner';
import Link from '../common/Link';
import styles from './index.module.scss';

const FormItem = Form.Item;

const SignUp = ({
  form: { getFieldDecorator },
  compareToFirstPassword,
  handleSubmit,
  showModal,
  history,
}) => {
  return (
    <Modal
      className={styles.loginModal}
      title={'Реестрація'}
      visible={showModal === 'sign-up'}
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
            <Input prefix={<Icon type='mail' />} placeholder="Email" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Будь ласка, введіть пароль' }],
          })(
            <Input prefix={<Icon type="lock" />} type="password" placeholder="Пароль" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('repeatPassword', {
            rules: [
              {
                required: true, message: 'Будь ласка повторіть пароль'
              },
              {
                validator: compareToFirstPassword,
              }
            ],
          })(
            <Input prefix={<Icon type="lock" />} type="password" placeholder="Повторіть пароль" />
          )}
        </FormItem>
        <div className={styles.linksBlock}>
          <Link to={{ pathname: './', search: '?showModal=sign-in' }}>Войти</Link> через існуючого користувача
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
  withProps(({ form, query }) => {
    return ({
      showModal: query.get('showModal'),
      compareToFirstPassword: (rule, value, callback) => {
        if (value && value !== form.getFieldValue('password')) {
          callback('Паролі не співпадають');
        } else {
          callback();
        }
      },
    });
  }),
  withHandlers({
    handleSubmit: ({ query, signUp, form: { validateFields } }) => () => {
      validateFields((err, values) => {
        if (!err) {
          signUp({ ...values, invitedById: query.get('invitedById') || null });
        }
      });
    }
  }),
  pure,
)(SignUp);

SignUp.defaultProps = {
  showModal: null,
};

SignUp.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  compareToFirstPassword: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  showModal: PropTypes.string,
};
