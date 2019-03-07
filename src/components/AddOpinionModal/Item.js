import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Icon } from 'antd';
import { compose, pure } from 'recompose';
import withBusinessConfig from '../../containers/withBusinessConfig';
import styles from './Item.module.scss';

const FormItem = Form.Item;

const AddOpinionModal = ({
  form: { getFieldDecorator },
  keys,
  add,
  remove,
  type,
  labelSingular,
  labelPlural,
  businessConfig: { MAX_PROS_AND_CONS_ITEMS },
}) => {
  return (
    <Fragment>
      {
        keys.map((k, index) => (
          <FormItem
            key={k}
            required={false}
            label={index === 0 ? labelPlural : ''}
          >
            {getFieldDecorator(`${type}[${k}]`, {
              rules: [
                { required: true, message: 'Будь ласка, опишіть свою думку' },
              ],
            })(
              <Input.TextArea autosize placeholder={labelSingular} rows={4} />
            )}
            {
              keys.length > 1 && (
                <Icon
                  className={styles.removeItemBtn}
                  type="minus-circle-o"
                  disabled={keys.length === 1}
                  onClick={remove({ k })}
                />
              )
            }
          </FormItem>
        ))
      }
      {
        keys.length < MAX_PROS_AND_CONS_ITEMS && (
          <FormItem>
            <Button type="dashed" onClick={add} className={styles.addItemBtn}>
             <Icon type="plus" /> Додати
            </Button>
          </FormItem>
        )
      }
    </Fragment>
  );
};

export default compose(
  withBusinessConfig(),
  pure,
)(AddOpinionModal);

AddOpinionModal.defaultProps = {
};

AddOpinionModal.propTypes = {
  form: PropTypes.object.isRequired,
  businessConfig: PropTypes.object.isRequired,
  keys: PropTypes.array.isRequired,
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  labelSingular: PropTypes.string.isRequired,
  labelPlural: PropTypes.string.isRequired,
};
