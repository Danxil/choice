import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Icon, Button, Modal, Select } from 'antd';
import { compose, pure, withProps, withHandlers } from 'recompose';
import { withRouter } from 'react-router-dom';
import withUser from '../../containers/withUser';
import withMeta from '../../containers/withMeta';
import Spinner from '../common/Spinner';
import Link from '../common/Link';
import styles from './index.module.scss';

const FormItem = Form.Item;
const Option = Select.Option;

const SignUp = ({
  form: { getFieldDecorator },
  compareToFirstPassword,
  handleSubmit,
  showModal,
  history,
  validateLink,
  meta,
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
        <FormItem
          label="Email"
          required={false}
        >
          {getFieldDecorator('email', {
            rules: [
              { required: true, message: 'Будь ласка, введіть email' },
              { type: 'email', message: 'Невалідний email' },
            ],
          })(
            <Input prefix={<Icon type='mail' />} placeholder="Email" />
          )}
        </FormItem>
        <FormItem
          label="Пароль"
          required={false}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Будь ласка, введіть пароль' }],
          })(
            <Input prefix={<Icon type="lock" />} type="password" placeholder="Пароль" />
          )}
        </FormItem>
        <FormItem
          label="Повторіть пароль"
          required={false}
        >
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
        <FormItem
          label="Вік"
          required={false}
        >
          {getFieldDecorator('age', {
            rules: [
              { required: true, message: 'Будь ласка, введіть ваш вік' },
            ],
          })(
            <Input type="number" min={0} placeholder="Ваш вік" />
          )}
        </FormItem>
        <FormItem
          label="Професія"
          required={false}
        >
          {getFieldDecorator('professionId', {
            rules: [
              { required: true, message: 'Будь ласка, оберіть вашу професію' },
            ],
          })(
            <Select
              showSearch
              placeholder="Ваша професія"
              optionFilterProp="name"
              filterOption={(input, option) => option.props.name.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {
                meta.professions.map(profession => (
                  <Option key={`profession${profession.id}`} value={profession.id} name={profession.name}>{profession.name}</Option>
                ))
              }
            </Select>
          )}
        </FormItem>
        <FormItem
          label="Освіта"
          required={false}
        >
          {getFieldDecorator('educationId', {
            rules: [
              { required: true, message: 'Будь ласка, укажіть вашу освіту' },
            ],
          })(
            <Select
              showSearch
              placeholder="Ваша освіта"
              optionFilterProp="name"
              filterOption={(input, option) => option.props.name.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {
                meta.education.map(educationItem => (
                  <Option key={`profession${educationItem.id}`} value={educationItem.id} name={educationItem.name}>{educationItem.name}</Option>
                ))
              }
            </Select>
          )}
        </FormItem>
        <FormItem
          label="Місце проживання"
          required={false}
        >
          {getFieldDecorator('locationId', {
            rules: [
              { required: true, message: 'Будь ласка, оберіть ваше місце проживання' },
            ],
          })(
            <Select
              showSearch
              placeholder="Ваше місце проживання"
              optionFilterProp="name"
              filterOption={(input, option) => option.props.name.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {
                meta.locations.map(location => (
                  <Option key={`location${location.id}`} value={location.id} name={location.name}>{location.name}</Option>
                ))
              }
            </Select>
          )}
        </FormItem>
        <FormItem
          label="Посилання на ваш профіль у соц. мережі (анонімно)"
          required={false}
        >
          {getFieldDecorator('socialLink', {
            rules: [
              { required: true, message: 'Будь ласка, введіть посилання на ваш профіль у будь-який соц. мережі' },
              {
                validator: validateLink,
              }
            ],
          })(
            <Input prefix={<Icon type='mail' />} placeholder="Посилання на ваш профіль у будь-який соц. мережі (facebook, instagram...)" />
          )}
        </FormItem>
        <ul className={styles.vereficationMessage}>
          <li>Для захисту від спаму потрібно пройти верефікацію.</li>
          <li>Для цього введіть посилання на ваш профіль в будь-який соц. мережі (facebook, instagram...)</li>
          <li>Профіль повинен містити контент завантаженість не менше 3-х місяців тому</li>
        </ul>
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
  withMeta(),
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
      validateLink: (rule, value, callback) => {
        if (value && !value.match(new RegExp(/(https?:\/\/[^\s]+\.[^\s]+)/g))) {
          callback('Введіть валідне посилання. (Приклад https://www.facebook.com/somelogin)');
        } else {
          callback();
        }
      },
    });
  }),
  withHandlers({
    handleSubmit: ({ signUp, form: { validateFields } }) => () => {
      validateFields((err, values) => {
        if (!err) {
          signUp({ values });
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
  validateLink: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  showModal: PropTypes.string,
};
