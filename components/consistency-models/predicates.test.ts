import { describe, expect, test, beforeEach } from '@jest/globals'
import { OperationHistory, OperationType } from './types'

const foo = `
|w<-3|---------|r<-3|---------
-------|w<-10|----------------
`

const bar = `
|x<-3|---------|x->10|--------
-------|w<-10|----------------
`

describe('read-after-write consistency', () => {
    test('consistent reads are consistent for a single process', () => {
        const history = `
        ---[x<-3]-------[x->3]-----[x<-4]---
        `
    })

    test('inconsistent reads are inconsistent for a single process', () => {
        const history = `
        ----[x<-3]----[x->3]----[x->4]----
        `
    })

    test('reads can return the most recent write on their process, or the most recent write in arb', () => {
        const latestReadHistory = `
        ----[A:x<-3]--------------[C:x->4]
        --------------[B:x<-4]----------
        `

        const staleReadHistory = `
        ----[x<-3]--------------[x->3]
        -------------[x<-4]-----------
        `
    })
})
