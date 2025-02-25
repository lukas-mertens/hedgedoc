/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { HistoryEntryOrigin } from '../../../api/history/types'
import { useApplicationState } from '../../../hooks/common/use-application-state'
import { cypressId } from '../../../utils/cypress-attribute'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { ShowIf } from '../../common/show-if/show-if'
import { DeleteNoteItem } from './delete-note-item'
import styles from './entry-menu.module.scss'
import { RemoveNoteEntryItem } from './remove-note-entry-item'
import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'

export interface EntryMenuProps {
  id: string
  title: string
  origin: HistoryEntryOrigin
  onRemoveFromHistory: () => void
  onDeleteNote: () => void
  className?: string
}

/**
 * Renders the dropdown menu for a history entry containing options like removing the entry or deleting the note.
 *
 * @param id The unique identifier of the history entry.
 * @param title The title of the note of the history entry.
 * @param origin The origin of the entry. Must be either {@link HistoryEntryOrigin.LOCAL} or {@link HistoryEntryOrigin.REMOTE}.
 * @param onRemoveFromHistory Callback that is fired when the entry should be removed from the history.
 * @param onDeleteNote Callback that is fired when the note should be deleted.
 * @param className Additional CSS classes to add to the dropdown.
 */
export const EntryMenu: React.FC<EntryMenuProps> = ({
  id,
  title,
  origin,
  onRemoveFromHistory,
  onDeleteNote,
  className
}) => {
  useTranslation()
  const userExists = useApplicationState((state) => !!state.user)

  return (
    <Dropdown className={`d-inline-flex ${className || ''}`} {...cypressId('history-entry-menu')}>
      <Dropdown.Toggle
        variant={'light'}
        id={`dropdown-card-${id}`}
        className={`no-arrow ${styles['history-menu']} d-inline-flex align-items-center`}>
        <ForkAwesomeIcon icon='ellipsis-v' fixedWidth={true} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Header>
          <Trans i18nKey='landing.history.menu.recentNotes' />
        </Dropdown.Header>

        <ShowIf condition={origin === HistoryEntryOrigin.LOCAL}>
          <Dropdown.Item disabled>
            <ForkAwesomeIcon icon='laptop' fixedWidth={true} className='mx-2' />
            <Trans i18nKey='landing.history.menu.entryLocal' />
          </Dropdown.Item>
        </ShowIf>

        <ShowIf condition={origin === HistoryEntryOrigin.REMOTE}>
          <Dropdown.Item disabled>
            <ForkAwesomeIcon icon='cloud' fixedWidth={true} className='mx-2' />
            <Trans i18nKey='landing.history.menu.entryRemote' />
          </Dropdown.Item>
        </ShowIf>

        <RemoveNoteEntryItem onConfirm={onRemoveFromHistory} noteTitle={title} />

        {/* TODO Check permissions (ownership) before showing option for delete  */}
        <ShowIf condition={userExists}>
          <Dropdown.Divider />
          <DeleteNoteItem onConfirm={onDeleteNote} noteTitle={title} />
        </ShowIf>
      </Dropdown.Menu>
    </Dropdown>
  )
}
