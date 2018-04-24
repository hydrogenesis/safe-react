// @flow
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import styles from '~/components/layout/PageFrame/index.scss'
import { SafeFactory } from '~/routes/safe/store/test/builder/safe.builder'
import Component from './Layout'


const FrameDecorator = story => (
  <div className={styles.frame}>
    { story() }
  </div>
)

storiesOf('Routes /safe:address', module)
  .addDecorator(FrameDecorator)
  .add('Safe undefined being connected', () => (
    <Component
      safe={undefined}
      provider="METAMASK"
      balance="0"
      fetchBalance={() => {}}
    />
  ))
  .add('Safe undefined NOT connected', () => (
    <Component
      safe={undefined}
      provider=""
      balance="0"
      fetchBalance={() => {}}
    />
  ))
  .add('Safe with 2 owners', () => {
    const safe = SafeFactory.twoOwnersSafe

    return (
      <Component
        safe={safe}
        provider="METAMASK"
        balance="2"
        fetchBalance={() => {}}
      />
    )
  })