import {AxiosError, type AxiosResponse} from "axios"

import type Error from "./domain/Error"

function isObject(value : object) {
  return (typeof value === 'object' &&
    !Array.isArray(value) &&
    value !== null)
}

async function handleHttp(callback: () => Promise<AxiosResponse>) {
  try {
    return await callback()
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response
    }
    throw error
  }
}

function parseApiErrors(response : AxiosResponse) {
  const data = response.data
  if (data.errors != undefined) {
    const errors = data.errors.map((err : Error) => {
      return (err.message != undefined && err.message != null)
        ? err.message : err.code
    })
    return errors
  } else if (data.error != undefined) {
    var errors = [] as String[]
    Object.keys(data.error).forEach((key, i) => {
      errors.push(data.error[key])
    })
    return errors
  } else if (data.message != undefined) {
    return [data.message]
  } else if (isObject(data)) {
    return Object.entries(data).map(([key, value]) => {
      return `${key}: ${value}`
    })
  } else {
    return [`${response.status} ${response.statusText}`]
  }
}

export {handleHttp, parseApiErrors}
