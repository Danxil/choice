import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, withHandlers, withProps } from 'recompose';
import { Form, Input } from 'antd';
import { withRouter } from 'react-router';
import withUser from '../../containers/withUser';
import Container from '../common/Container';
import VerifyBtns from '../common/VerifyBtns';
import styles from './User.module.scss';

const FormItem = Form.Item;

const User = ({
  profession,
  education,
  location,
  age,
  socialLink,
  userInfo,
  verifyUser,
  deleteUser,
  form,
  validateSocialId,
}) => {
  return (
    <div className={styles.user}>
      <Container>
        <Form className={styles.content}>
          <p>
            {profession.name}
          </p>
          <p>
            {education.name} освіта
          </p>
          <p>
            {age} років
          </p>
          <p>
            {location.name}
          </p>
          <p>
            {socialLink}
          </p>
          <FormItem
            className={styles.socialIdField}
            required={false}
          >
            {
              form.getFieldDecorator('socialId', {
                rules: [
                  { required: true, message: 'Required' },
                  {
                    validator: validateSocialId,
                  }
                ],
              })(
                <Input placeholder="Social ID" rows={4} />
              )
            }
          </FormItem>
          <div className={styles.notVerified}>
            {
              userInfo && userInfo.isAdmin && (<VerifyBtns verify={verifyUser} delete={deleteUser} />)
            }
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default compose(
  Form.create(),
  withRouter,
  withUser(),
  withProps(() => {
    return ({
      validateSocialId: (rule, value, callback) => {
        if (value && !value.match(new RegExp(/([^\s]+_[^\s]+)/g))) {
          callback('Invalid socialId. Valid example fb_32423');
        } else {
          callback();
        }
      },
    });
  }),
  withHandlers({
    voteHandler: ({
      history,
      userInfo,
      opinion: {
        id: opinionId
      },
      vote,
      unvote,
      voted,
      votingInProcess,
    }) => () => {
      if (votingInProcess) return;
      if (!userInfo) return history.push('./?showModal=sign-up');
      const fn = voted ? unvote : vote;
      fn({ opinionId, userId: userInfo.id });
    },
    verifyUser: ({
      verifyUser,
      id: userId,
      form: { validateFields },
    }) => () => {
      validateFields((err, values) => {
        console.log(11, err);
        if (!err) {
          verifyUser({ userId, socialId: values.socialId })
        }
      });
    },
    deleteUser: ({ deleteUser, id: userId }) => () => {
      deleteUser({ userId })
    }
  }),
  pure,
)(User);

User.defaultProps = {
  userInfo: null,
};
User.propTypes = {
  form: PropTypes.object.isRequired,
  profession: PropTypes.object.isRequired,
  education: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  userInfo: PropTypes.object.isRequired,
  age: PropTypes.number.isRequired,
  socialLink: PropTypes.string.isRequired,
  verifyUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  validateSocialId: PropTypes.func.isRequired,
};
