/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { defaultConfig } from '../../default-config'
import { Mock } from 'ts-mockery'

/**
 * Mock fetch api for tests.
 * Check that the given url and options are present in the request and return the given status code.
 *
 * @param expectedUrl the url that should be requested
 * @param requestStatusCode the status code the mocked request should return
 * @param expectedOptions additional options
 */
export const expectFetch = (expectedUrl: string, requestStatusCode: number, expectedOptions: RequestInit): void => {
  global.fetch = jest.fn((fetchUrl: RequestInfo | URL, fetchOptions?: RequestInit): Promise<Response> => {
    expect(fetchUrl).toEqual(expectedUrl)
    expect(fetchOptions).toStrictEqual({
      ...defaultConfig,
      body: undefined,
      headers: new Headers(),
      ...expectedOptions
    })
    return Promise.resolve(
      Mock.of<Response>({
        status: requestStatusCode
      })
    )
  })
}
