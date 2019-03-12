import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import withUser from '../../containers/withUser';
import { compose, pure, withHandlers } from 'recompose';
import classNames from 'classnames';
import { Form, Select, Button, Slider } from 'antd';
import styles from './FilterCandidatesForm.module.scss';

const FormItem = Form.Item;
const Option = Select.Option;

const FilterCandidatesForm = ({
  form: { getFieldDecorator },
  professions,
  locations,
  education,
  apply,
}) => {
  return (
    <Form className={styles.filterCandidatesForm}>
      <FormItem
        label="Професія"
        required={false}
      >
        {getFieldDecorator('professionId', { initialValue: null })(
          <Select
            showSearch
            placeholder="Ваша професія"
            optionFilterProp="name"
            filterOption={(input, option) => option.props.name.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option key={`anyProfession`} value={null} name="Будь-яка">Будь-яка</Option>
            {
              professions.map(profession => (
                <Option
                  key={`profession${profession.id}`}
                  value={profession.id}
                  name={profession.name}
                  title={profession.name}
                >
                  {profession.name}
                </Option>
              ))
            }
          </Select>
        )}
      </FormItem>
      <FormItem
        label="Освіта"
        required={false}
      >
        {getFieldDecorator('educationId', { initialValue: null })(
          <Select
            showSearch
            placeholder="Ваша освіта"
            optionFilterProp="name"
            filterOption={(input, option) => option.props.name.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option key={`anyEducation`} value={null} name="Будь-яка">Будь-яка</Option>
            {
              education.map(educationItem => (
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
        {getFieldDecorator('locationId', { initialValue: null })(
          <Select
            showSearch
            placeholder="Ваше місце проживання"
            optionFilterProp="name"
            filterOption={(input, option) => option.props.name.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option key={`anyLocation`} value={null} name="Будь-яка">Будь-яке</Option>
            {
              locations.map(location => (
                <Option key={`location${location.id}`} value={location.id} name={location.name}>{location.name}</Option>
              ))
            }
          </Select>
        )}
      </FormItem>
      <FormItem
        label="Вік"
        required={false}
      >
        {getFieldDecorator('age', { initialValue: [1, 100] })(
          <Slider range />
        )}
      </FormItem>
      <Button
        type="primary"
        className={classNames(styles.applyBtn)}
        onClick={apply}
      >
        Застосувати
      </Button>
    </Form>
  );
};

export default compose(
  Form.create(),
  withRouter,
  withUser(),
  withHandlers({
    apply: ({
      onApply,
      form: { validateFields },
    }) => () => {
      validateFields((err, values) => {
        if (!err) {
          onApply(values);
        }
      });
    },
  }),
  pure,
)(FilterCandidatesForm);

FilterCandidatesForm.defaultProps = {
};
FilterCandidatesForm.propTypes = {
  form: PropTypes.object.isRequired,
  education: PropTypes.array.isRequired,
  professions: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  onApply: PropTypes.func.isRequired,
  apply: PropTypes.func.isRequired,
};
