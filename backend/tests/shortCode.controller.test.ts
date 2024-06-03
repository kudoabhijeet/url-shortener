import { createRandomCode } from '../src/controllers/shortCode.controller'

describe('test for shortcode controller', () => {
  

  it('createRandomShortCode works', async() => {
    const shortCode = await createRandomCode('https://google.com/search?q=javascript')
    expect(shortCode).toBeDefined()
    expect(shortCode.longUrl).toEqual('https://google.com/search?q=javascript')
  })


  
  afterAll(async() => {
    console.log('TEST DONE')
  })
})
