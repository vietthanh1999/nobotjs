import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Bot from '../../../lib/bot'

describe('Bot', () => {
  let bot: Bot
  let mock: MockAdapter // Khai báo kiểu đúng cho mock

  beforeEach(() => {
    bot = new Bot('http://proxy.example.com:8080') // Khởi tạo bot với proxy
    mock = new MockAdapter(axios) // Khởi tạo mock cho axios
  })

  afterEach(() => {
    mock.restore() // Khôi phục lại axios sau mỗi test
  })

  test('should execute task successfully', async () => {
    const taskName = 'Test Task'
    const config = {
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'GET',
    }

    // Mock phản hồi từ axios
    mock.onGet(config.url).reply(200, { data: 'test data' })

    const response = await bot.executeTask(taskName, config)

    expect(response).toEqual({ data: 'test data' })
  })

  test('should handle task failure', async () => {
    const taskName = 'Failed Task'
    const config = {
      url: 'https://jsonplaceholder.typicode.com/404', // Đường dẫn không hợp lệ
      method: 'GET',
    }

    // Mock phản hồi lỗi từ axios
    mock.onGet(config.url).reply(404)

    await expect(bot.executeTask(taskName, config)).rejects.toThrow()
  })

  // Thêm các bài test khác nếu cần...
})
