/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { ClickShield } from '../../../components/markdown-renderer/replace-components/click-shield/click-shield'
import type { IdProps } from '../../../components/markdown-renderer/replace-components/custom-tag-with-id-component-replacer'
import React from 'react'

/**
 * Renders a video player embedding for https://youtube.com
 *
 * @param id The id from the youtube video url
 */
export const YouTubeFrame: React.FC<IdProps> = ({ id }) => {
  return (
    <ClickShield
      hoverIcon={'youtube-play'}
      targetDescription={'YouTube'}
      fallbackPreviewImageUrl={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
      fallbackBackgroundColor={'#ff0000'}
      data-cypress-id={'click-shield-youtube'}>
      <span className={'embed-responsive embed-responsive-16by9'}>
        <iframe
          className='embed-responsive-item'
          title={`youtube video of ${id}`}
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        />
      </span>
    </ClickShield>
  )
}
