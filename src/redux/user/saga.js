import { notification } from 'antd';
import { getUserInfo } from './actions';
import { Fragment } from 'react';
import Providers from '../Providers';
import React from 'react';
import { put, takeLatest } from 'redux-saga/effects';

export default function* () {
  yield takeLatest(['SIGN_UP_SUCCESS', 'SIGN_IN_SUCCESS'], function *() {
    yield put(getUserInfo())
  });
  yield takeLatest('SIGN_IN_FAILURE', (action) => {
    notification.error({
      duration: 5,
      description: <Providers>
        <Fragment>
          { action.payload.status === 401 ? 'Неправильний email або пароль' : 'Помилка на сервері. Спробуй пізніше' }
        </Fragment>
      </Providers>
    });
  });
  yield takeLatest('SIGN_UP_FAILURE', (action) => {
    notification.error({
      duration: 5,
      description: <Providers>
        <Fragment>
          { action.payload.status === 400 ? 'Цей емаил зайнятий' : 'Помилка на сервері. Спробуй пізніше' }
        </Fragment>
      </Providers>
    });
  });
  yield takeLatest(['SIGN_UP_SUCCESS'], () => {
    notification.success({
      duration: 5,
      description:
        <Providers>
          <Fragment>
            Реєстрація пройшла успішно. Тепер ви можете публікувати свої думки
          </Fragment>
        </Providers>
    });
  });
  yield takeLatest(['SIGN_IN_SUCCESS'], () => {
    notification.success({
      duration: 5,
      description:
        <Providers>
          <Fragment>
            Вы успішно увійшли у свій аккаунт
          </Fragment>
        </Providers>
    });
  });
}
