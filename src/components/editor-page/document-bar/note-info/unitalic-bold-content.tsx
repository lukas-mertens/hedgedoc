/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { PropsWithChildren } from 'react'
import React from 'react'
import type { PropsWithDataCypressId } from '../../../../utils/cypress-attribute'
import { cypressId } from '../../../../utils/cypress-attribute'

export interface UnitalicBoldContentProps extends PropsWithDataCypressId {
  text?: string | number
}

/**
 * Renders the children elements in a non-italic but bold style.
 *
 * @param text Optional text content that should be rendered.
 * @param children Children that may be rendered.
 * @param props Additional props for cypressId
 */
export const UnitalicBoldContent: React.FC<PropsWithChildren<UnitalicBoldContentProps>> = ({
  text,
  children,
  ...props
}) => {
  return (
    <strong className={'font-style-normal mr-1'} {...cypressId(props)}>
      {text}
      {children}
    </strong>
  )
}
