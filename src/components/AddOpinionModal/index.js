import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Modal } from 'antd';
import { compose, pure, withProps, withHandlers, withState } from 'recompose';
import { withRouter } from 'react-router';
import withUser from '../../containers/withUser';
import withOpinions from '../../containers/withOpinions';
import withBusinessConfig from '../../containers/withBusinessConfig';
import Spinner from '../common/Spinner';
import styles from './index.module.scss';
import Item from './Item';

const FormItem = Form.Item;

const AddOpinionModal = ({
  form,
  handleSubmit,
  showModal,
  history,
  prosKeys,
  consKeys,
  addPro,
  addCon,
  removePro,
  removeCon,
}) => {
  return (
    <Modal
      className={styles.addOpinionModal}
      title="Ваша думка"
      visible={showModal === 'add-opinion'}
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
        <Item
          form={form}
          keys={prosKeys}
          remove={removePro}
          add={addPro}
          type="pros"
          labelSingular="Перевага"
          labelPlural="Переваги"
        />
        <Item
          form={form}
          keys={consKeys}
          remove={removeCon}
          add={addCon}
          type="cons"
          labelSingular="Недолік"
          labelPlural="Недоліки"
        />
        <FormItem
          label="Загальна думка"
        >
          {form.getFieldDecorator('overallText', {
            rules: [
              { required: true, message: 'Будь ласка, загально опишіть свою думку' },
            ],
          })(
            <Input.TextArea placeholder="Загальна думка" rows={4} />
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

export default compose(
  Form.create(),
  withRouter,
  withUser(),
  withOpinions(),
  withBusinessConfig(),
  withState('idCons', 'setIdCons', 0),
  withState('idPros', 'setIdPros', 0),
  withProps(() => ({ query: new URLSearchParams(location.search) })),
  withProps(({ idPros, idCons, query, form: { getFieldValue, getFieldDecorator } }) => {
    getFieldDecorator('prosKeys', { initialValue: [idPros] });
    getFieldDecorator('consKeys', { initialValue: [idCons] });
    return ({
      showModal: query.get('showModal'),
      prosKeys: getFieldValue('prosKeys') || [],
      consKeys: getFieldValue('consKeys') || [],
    });
  }),
  withHandlers({
    addItem: ({
      idCons,
      idPros,
      setIdCons,
      setIdPros,
      form: { setFieldsValue, getFieldValue },
      businessConfig: { MAX_PROS_AND_CONS_ITEMS },
    }) => ({ type }) => {
      const keys = getFieldValue(`${type}Keys`);
      if (keys.length === MAX_PROS_AND_CONS_ITEMS) {
        return;
      }
      const id = type === 'pros' ? idPros : idCons;
      const setIdFn = type === 'pros' ? setIdPros : setIdCons;
      const newId = id + 1;
      const nextKeys = keys.concat(newId);
      setIdFn(newId);
      setFieldsValue({
        [`${type}Keys`]: nextKeys,
      });
    },
    removeItem: ({ form: { getFieldValue, setFieldsValue } }) => ({ k, type }) => {
      const keys = getFieldValue(`${type}Keys`);
      if (keys.length === 1) {
        return;
      }

      setFieldsValue({
        [`${type}Keys`]: keys.filter(key => key !== k),
      });
    }
  }),
  withHandlers({
    handleSubmit: ({
      match: { params: { candidateId } },
      history,
      addOpinion,
      form: { validateFields, resetFields },
    }) => () => {
      validateFields((err, values) => {
        if (!err) {
          addOpinion({
            candidateId,
            values,
            cb: () => {
              history.push('./?');
              resetFields();
            },
          });
        }
      });
    },
    addPro: ({ addItem }) => () => {
      addItem({ type: 'pros' });
    },
    addCon: ({ addItem }) => () => {
      addItem({ type: 'cons' });
    },
    removePro: ({ removeItem }) => ({ k }) => {
      return removeItem.bind(null, { type: 'pros', k });
    },
    removeCon: ({ removeItem }) => ({ k }) => {
      return removeItem.bind(null, { type: 'cons', k });
    }
  }),
  pure,
)(AddOpinionModal);

AddOpinionModal.defaultProps = {
  showModal: null,
};

AddOpinionModal.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  businessConfig: PropTypes.object.isRequired,
  prosKeys: PropTypes.array.isRequired,
  consKeys: PropTypes.array.isRequired,
  showModal: PropTypes.string,
  addPro: PropTypes.func.isRequired,
  addCon: PropTypes.func.isRequired,
  removePro: PropTypes.func.isRequired,
  removeCon: PropTypes.func.isRequired,
};
