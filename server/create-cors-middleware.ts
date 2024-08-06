import type { CORSOptions } from '../utils/http-types'
import type { Middleware, NextFunction } from './middleware-types'

const setAllowOrigin = (headers: Headers, originToSet: string) =>
  headers.set('Access-Control-Allow-Origin', originToSet || '')
const setAllowMethods = (headers: Headers, methods: string[]) =>
  headers.set('Access-Control-Allow-Methods', methods.join(', '))
const addAllowHeader = (headers: Headers, options?: CORSOptions) => {
  if (options?.allowedHeaders?.join) {
    headers.set('Access-Control-Allow-Headers', options.allowedHeaders.join(', '))
  }
}

const setAllowCredentials = (headers: Headers, options?: CORSOptions) =>
  options?.credentials && headers.set('Access-Control-Allow-Credentials', 'true')

export const configCorsMW = (options?: CORSOptions, debug = false): Middleware<Response> => {
  const allowedMethods: string[] = options?.allowedMethods || []

  const log = (input: any) => {
    if (debug) {
      console.log(input)
    }
  }

  const sendErrorResponse = (status: number, statusText: string, detail: string, headers?: Headers) => {
    const errorResponse = { statusText, detail }
    if (debug) {
      console.error(errorResponse)
    }

    const finalHeaders = headers

    finalHeaders?.set('Content-Type', 'application/json')

    return new Response(JSON.stringify(errorResponse), {
      status,
      headers: finalHeaders,
    })
  }

  return async (request: Request, next: NextFunction) => {
    const reqMethod = request.method
    const reqOrigin = request.headers.get('Origin')
    const allowedOrigins = options?.allowedOrigins || []
    const originAllowed = allowedOrigins.includes(reqOrigin || '')

    if (debug && !originAllowed) {
      log({
        allowedOrigins,
        reqOrigin,
        originAllowed,
      })
    }

    const headers = new Headers()
    const originToSet = allowedOrigins.includes('*') ? '*' : reqOrigin

    if (!reqOrigin) {
      return sendErrorResponse(400, 'Bad Request', 'Origin header missing')
    }

    // Set CORS headers
    setAllowOrigin(headers, originToSet || '')
    setAllowMethods(headers, allowedMethods)
    addAllowHeader(headers, options)
    setAllowCredentials(headers, options)

    if (reqMethod === 'OPTIONS') {
      const optionRequestMethod = request.headers.get('Access-Control-Request-Method')

      // Check if the requested method is allowed, but only if it's specified
      if (optionRequestMethod && !allowedMethods.includes(optionRequestMethod)) {
        return sendErrorResponse(405, 'Method Not Allowed', `Method ${optionRequestMethod} is not allowed`, headers)
      }

      // If it's an OPTIONS request and the method is allowed (or not specified), return 204 No Content
      return new Response(null, { status: 204, headers })
    }

    // For non-OPTIONS requests
    await next()

    // Apply CORS headers to the response after next() has been called
    const response = new Response(null, { status: 200 })
    headers.forEach((value, key) => {
      response.headers.set(key, value)
    })

    if (!allowedOrigins.includes(reqOrigin || '')) {
      return sendErrorResponse(403, 'Forbidden', `Origin ${reqOrigin} not allowed`, response.headers)
    }

    if (!allowedMethods.includes(request.method)) {
      return sendErrorResponse(405, 'Method Not Allowed', `Method ${reqMethod} not allowed`, response.headers)
    }

    return response
  }
}
