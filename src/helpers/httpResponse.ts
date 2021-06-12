interface HttpResponse {
  body: any
  statusCode: number
}

export const sucess = (message: any): HttpResponse => {
  return {
    body: JSON.stringify(message),
    statusCode: 200
  }
}

export const serverError = (message: any): HttpResponse => {
  return {
    body: JSON.stringify(message),
    statusCode: 500
  }
}

export const badRequest = (message: any): HttpResponse => {
  return {
    body: JSON.stringify(message),
    statusCode: 400
  }
}
