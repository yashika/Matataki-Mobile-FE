/* eslint-disable */
import request from '@/utils/request'

const ssImgAddress = 'https://ssimg.frontenduse.top'
import { getCookie } from '@/utils/cookie'


export default {
  getImg(hash) {
    return `${ssImgAddress}${hash}`
  },
  getWeixinOpenId(code) {
    return request.post('/wx/login', { code })
  },
  nativePay(tradeNo) {
    return this.orderWxPay({
      tradeNo,
      trade_type: 'NATIVE'
    })
  },
  jsapiPay(tradeNo, openid) {
    return this.orderWxPay({
      tradeNo,
      trade_type: 'JSAPI',
      openid
    })
  },
  orderWxPay(order) {
    return request.post('/order/pay', order)
  },
  //-------------文章支付使用开始-----------------
  articleNativePay(tradeNo) {
    return this.articleWxPay({
      tradeNo,
      trade_type: 'NATIVE'
    })
  },
  articleJsapiPay(tradeNo, openid) {
    return this.articleWxPay({
      tradeNo,
      trade_type: 'JSAPI',
      openid
    })
  },
  articleWxPay(order) {
    return request.post('/order/articlepay', order)
  },
  //-------------文章支付使用结束-----------------
  wxpay(order) {
    return request.post('/wx/pay', order)
  },
  allToken({page = 1, pagesize = 10, search = ''}) {
    return request({
      url: '/token/all',
      method: 'get',
      noLoading: true,
      params: {
        page,
        pagesize,
        search
      }
    })
  },
  // 通过hash获取文章内容
  getIpfsData(hash) {
    return request.get(`/post/ipfs/${hash}`)
  },
  getMyPost(id) {
    return request.get(`/mypost/${id}`)
  },
  /**
   * 创建我的token
   * // TODO 有字段后可移除注释
   * @param {Objject} data name symbol decimals // icon 暂无
   */
  minetokenCreate(data) {
    return request({
      method: 'POST',
      url: '/minetoken/create',
      data: data
    })
  },
  /**
   * 发行我的token
   * @param {Object} data amount
   */
  minetokenMint(data) {
    return request({
      method: 'POST',
      url: '/minetoken/mint',
      data: data
    })
  },
  /**
   * 修改token详情
   * @param {Object} data token详情
   * @param {Number} tokenId token id
   */
  minetokenTokenId(data, tokenId) {
    return request({
      method: 'PUT',
      url: `/minetoken/${tokenId}`,
      data: data
    })
  },
  /**
  * 修改token资源
  * @param {Object} data token资源
  * @param {Number} tokenId token id
  */
minetokenResources(data, tokenId) {
    return request({
      method: 'PUT',
      url: `/minetoken/${tokenId}/resources`,
      data: data
    })
  },
minetokenGetResources(tokenId) {
    return request({
      method: 'GET',
      url: `/minetoken/${tokenId}/resources`,
    })
  },
  /**
   * 转移token
   * @param {*} data tokenId to amount
   */
  transferMinetoken(data) {
    return request({
      method: 'POST',
      url: '/minetoken/transfer',
      data: data
    })
  },
    /**
   * 粉丝通证详情
   * @param {Number} id token id
   */
  minetokenId(id) {
    return request({
      method: 'GET',
      url: `/minetoken/${id}`,
    })
  },
  /**
   * 获取token详情
   * 请求头：x-access-token
   * 用户发行了token，data为对象，没有发行token，data为null
   */
  tokenDetail() {
    return request.get('/token/minetoken')
  },
  // -------------------------------- exchange API --------------------------------
  getCurrentPoolSize(tokenId) {
    return request({
      method: 'get',
      url: '/exchange/currentPoolSize',
      params: {
        tokenId
      }
    })
  },
  getYourPoolSize(tokenId) {
    return request({
      method: 'get',
      url: '/exchange/userPoolSize',
      params: {
        tokenId
      }
    })
  },
  getYourMintToken(tokenId, amount) {
    return request({
      method: 'get',
      url: '/exchange/userMintToken',
      params: {
        tokenId, amount
      }
    })
  },
  getOrderStatus(tradeNo) {
    return request({
      method: 'get',
      url: '/exchange/notify',
      params: {
        trade_no: tradeNo
      }
    })
  },
  getOutputAmount(inputTokenId, outputTokenId, inputAmount) {
    return request({
      method: 'get',
      url: '/exchange/outputAmount',
      params: {
        inputTokenId, outputTokenId, inputAmount
      }
    })
  },
  getInputAmount(inputTokenId, outputTokenId, outputAmount) {
    return request({
      method: 'get',
      url: '/exchange/inputAmount',
      params: {
        inputTokenId, outputTokenId, outputAmount
      }
    })
  },
  // token 换 token / cny接口
  swap({inputTokenId, outputTokenId, amount, limitValue, base}) {
    return request({
      method: 'post',
      url: '/exchange/swap',
      data: {
        inputTokenId, outputTokenId, amount, limitValue, base
      }
    })
  },
  getOutputPoolSize(amount, tokenId) {
    return request({
      method: 'get',
      url: '/exchange/outputPoolSize',
      params: {
        amount, tokenId
      }
    })
  },
  removeLiquidity({ tokenId, amount, min_cny, min_tokens }) {
    return request({
      method: 'post',
      url: '/exchange/removeLiquidity',
      data: {
        tokenId, amount, min_cny, min_tokens
      }
    })
  },
  getPoolCnyToTokenPrice(inputTokenId, outputTokenId, inputAmount) {
    return request({
      method: 'get',
      url: '/exchange/poolCnyToTokenPrice',
      params: {
        outputTokenId, inputAmount
      }
    })
  },
  getUserBalance(tokenId) {
    return request({
      method: 'get',
      url: '/minetoken/balance',
      params: {
        tokenId
      }
    })
  },
  getCNYBalance() {
    return request({
      method: 'get',
      url: '/asset/balance',
      params: {
        symbol: 'CNY'
      }
    })
  },
  addLiquidityBalance({tokenId, cny_amount, token_amount, min_liquidity, max_tokens, deadline}) {
    return request({
      method: 'post',
      url: '/exchange/addLiquidityBalance',
      data: {
        tokenId, cny_amount, token_amount, min_liquidity, max_tokens, deadline 
      }
    })
  },
  // 以输入为准
  cnyToTokenInputBalance({tokenId, cny_sold, min_tokens, deadline}) {
    return request({
      method: 'post',
      url: '/exchange/cnyToTokenInputBalance',
      data: {
        tokenId, cny_sold, min_tokens, deadline
      }
    })
  },
  // 以输出为准
  cnyToTokenOutputBalance({tokenId, tokens_bought, max_cny, deadline}) {
    return request({
      method: 'post',
      url: '/exchange/cnyToTokenOutputBalance',
      data: {
        tokenId, tokens_bought, max_cny, deadline
      }
    })
  },
  getPurchaseLogs(tokenId) {
    return request({
      method: 'get',
      url: '/token/purchaseLogs',
      params: {
        tokenId
      }
    })
  },
  getMyPurchaseLogs(tokenId) {
    return request({
      method: 'get',
      url: '/token/myPurchaseLogs',
      params: {
        tokenId
      }
    })
  },
  getLiquidityLogs(tokenId) {
    return request({
      method: 'get',
      url: '/token/liquidityLogs',
      params: {
        tokenId
      }
    })
  },
  getMyLiquidityLogs(tokenId) {
    return request({
      method: 'get',
      url: '/token/myLiquidityLogs',
      params: {
        tokenId
      }
    })
  },
  /**
   * 文章导入
   * @param {String} url 导入地址
   */
  importArticle(url) {
    return request({
      method: 'post',
      url: '/posts/importer',
      data:{ url },
      timeout: 40000,
    })
  },
    // 文章持币阅读
    addMineTokens(data) {
      return request({
        method: 'post',
        url: '/post/addMineTokens',
        data: data,
      })
    },
    // 文章持币支付
    articlePrices(id, data) {
      return request({
        method: 'PUT',
        url: `/posts/${id}/prices`,
        data: data,
      })
    },
  /**
   * 发布文章接口 通用方法 私有方法
   * @param {String} url 接口地址
   * @param {Object} param1 文章参数
   * @param {String || null} signature 签名
   */
  _sendArticle(
    url,
    { signId = null, author, hash, title, fissionFactor, cover, isOriginal, tags, commentPayPoint, shortContent },
    signature = null
  ) {
    // 账号类型
    let idProvider = (getCookie('idProvider')).toLocaleLowerCase()
    return request({
      method: 'POST',
      url,
      data: {
        author,
        cover,
        fissionFactor,
        hash,
        platform: idProvider,
        publickey: signature ? signature.publicKey : null,
        sign: signature ? signature.signature : null,
        signId,
        title,
        is_original: isOriginal,
        tags,
        commentPayPoint,
        shortContent
      }
    })
  },
  /**
   * 发布文章
   * @param {Object} params 参数, 签名 非钱包用户需要签名
   */
  publishArticle({ article, signature }) {
    return this._sendArticle('/post/publish', article, signature)
  },
  /**
   * 编辑文章
   * @param {Object} params 参数, 签名 非钱包用户需要签名
   */
  editArticle({ article, signature }) {
    return this._sendArticle('/post/edit', article, signature)
  },
  // 创建草稿
  createDraft({ title, content, cover, fissionFactor, isOriginal, tags, commentPayPoint }) {
    return request({
      method: 'POST',
      url: '/draft/save',
      data: {
        title,
        content,
        cover,
        fissionFactor,
        is_original: isOriginal,
        tags,
        commentPayPoint
      }
    })
  },
  // 更新草稿
  updateDraft({ id, title, content, cover, fissionFactor, isOriginal, tags, commentPayPoint }) {
    return request({
      method: 'POST',
      url: '/draft/save',
      data: {
        id,
        title,
        content,
        cover,
        fissionFactor,
        is_original: isOriginal,
        tags,
        commentPayPoint
      }
    })
  },
  getDraft({ id }) {
    return request({ url: `/draft/${id}` })
  },
  // 微信登录数据保存到数据库
  loginWeixin(code) {
    return request({
      method: 'POST',
      url: '/login/weixin',
      data: {
        code
      }
    })
  },
  getOrderData(id) {
    return request({
      method: 'get',
      url: `/order/get/${id}`
    })
  },
  // 创建订单
  createOrder(order) {
    return request.post('/order/create', order)
  },
  createArticleOrder(order) {
    return request({
      method: 'PUT',
      url: '/orders',
      data: order
    })
  },
  getArticleOrder(tradeNo) {
    return request({
      method: 'get',
      url: `/orders/${tradeNo}`
    })
  },
  updateArticleOrder(tradeNo, order) {
    return request({
      method: 'put',
      url: `/orders/${tradeNo}`,
      data: order
    })
  },
  handleAmount0(tradeNo) {
    return request({
      method: 'post',
      url: '/orders/handleAmount0',
      data: {
        tradeNo
      }
    })
  }
}
