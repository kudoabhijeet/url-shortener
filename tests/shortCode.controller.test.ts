import { connect } from '../src/db/connect'
import { createRandomCode } from '../src/controllers/shortcode.controller'
import { Connection } from 'typeorm'

describe('test for shortcode controller', () => {
    let connection : Connection
  beforeAll(async() => {
    connection = await connect()
  })

  it('createRandomShortCode works', async() => {
    const shortCode = await createRandomCode('https://google.com/search?q=javascript')
    expect(shortCode).toBeDefined()
    expect(shortCode.longUrl).toEqual('https://google.com/search?q=javascript')
  })

  afterAll(async() => {
    connection.close()
  })
})