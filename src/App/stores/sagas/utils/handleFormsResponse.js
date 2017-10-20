import { put, fork, take, race } from 'redux-saga/effects'

import isEmpty from 'lodash/isEmpty'
import forEach from 'lodash/forEach'
import isPlainObject from 'lodash/isPlainObject'

import { stopSubmit, SubmissionError } from 'redux-form'

export default function* handleFormResponse ({
  form,
  resolveFn,
  rejectFn,
  cbAction,
  successAction,
  failureAction
}) {
  const { success, errors } = yield race({
    success: take(successAction),
    errors: take(failureAction)
  })

  if (success) {
    if (typeof resolveFn !== 'undefined') {
      yield fork(resolveFn)
    } else {
      yield put(stopSubmit(form))
    }

    if (typeof cbAction === 'function') {
      yield fork(cbAction)
    } else if (!isEmpty(cbAction)) {
      yield put(cbAction)
    }
  } else if (errors && errors.payload) {
    let formErrors = {}
    if (isPlainObject(errors.payload)) {
      forEach(errors.payload, (val, key) => {
        formErrors[key] = val[0]
      })
    } else if (Array.isArray(errors.payload)) {
      formErrors._error = errors.payload[0]
    } else {
      formErrors._error = errors.payload
    }

    if (typeof rejectFn !== 'undefined') {
      formErrors = new SubmissionError(formErrors)
      yield fork(rejectFn, formErrors)
    } else {
      yield put(stopSubmit(form, formErrors))
    }
  }
}
