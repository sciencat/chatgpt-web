import { rateLimit } from 'express-rate-limit'
import { isNotEmptyString } from '../utils/is'

const MAX_REQUEST_PER_HOUR = process.env.MAX_REQUEST_PER_HOUR

const maxCount = (isNotEmptyString(MAX_REQUEST_PER_HOUR) && !isNaN(Number(MAX_REQUEST_PER_HOUR)))
  ? parseInt(MAX_REQUEST_PER_HOUR)
  : 0 // 0 means unlimited

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // Maximum number of accesses within an hour
  max: maxCount,
  statusCode: 200, // 200 means success，but the message is 'Too many request from this IP in 1 hour'
  message: async (req, res) => {
    res.send({ status: 'Fail', message: '为了防止滥用公益站额度，我们限定了一小时最多10条回复，请过一会儿再来吧。您也可以分享本站提高额度（<a href="https://sciencat.net/redirect/chat" target="_blank" >点此查看详情</a>），或者 <a href="https://ainav.sciencat.net/chatgpt" target="_blank" >使用其他公益网站</a>，', data: null })
  },
})

export { limiter }
