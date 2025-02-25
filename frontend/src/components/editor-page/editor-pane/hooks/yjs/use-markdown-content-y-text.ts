/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { useMemo } from 'react'
import type { Doc } from 'yjs'
import type { YText } from 'yjs/dist/src/types/YText'

export const MARKDOWN_CONTENT_CHANNEL_NAME = 'markdownContent'

/**
 * Extracts the y-text channel that saves the markdown content from the given yDoc.
 *
 * @param yDoc The yjs document from which the yText should be extracted
 * @return the extracted yText channel
 */
export const useMarkdownContentYText = (yDoc: Doc): YText => {
  return useMemo(() => yDoc.getText(MARKDOWN_CONTENT_CHANNEL_NAME), [yDoc])
}
