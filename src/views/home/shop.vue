<template>
  <div class="home mw">
    <bannerMatataki :class="!isShowSlide && 'margin'" />
    <!-- 首页头部 -->
    <home-head
      :now-index="nowIndex"
      @login="showSidebar = true"
    />

    <!-- 首页内容 -->
    <div class="home-content">
      <!-- 首页内容导航 -->
      <home-nav
        :nav-menu="content.navMenu"
        :active-index="content.activeIndex"
        @toggleNavMenu="toggleNavMenu"
      />

      <!-- 推荐内容 -->
      <homeSlide
        v-show="isShowSlide"
        :recommend="content.recommend"
        :slide-index="1"
        :now-index="nowIndex"
      />

      <!-- 标题 -->
      <div
        class="now-title"
        :class="!isShowSlide && 'nav-hide'"
      >
        {{ contentTitle }}
      </div>

      <!-- 列表 -->
      <BasePull
        v-for="(itemList, indexList) in content.navMenu"
        v-show="content.activeIndex === indexList"
        :key="indexList"
        :params="itemList.params"
        :api-url="itemList.apiUrl"
        :active-index="content.activeIndex"
        :now-index="indexList"
        :is-obj="{ type: 'newObject', key: 'data', keys: 'list' }"
        :auto-request-time="itemList.autoRequestTime"
        :need-access-token="true"
        @getListData="getListData"
      >
        <template v-if="!itemList.loading">
          <!-- 骨架占位 -->
          <ContentLoader
            v-for="itemLoader in [0, 1]"
            :key="itemLoader"
            :height="80"
            :speed="2"
            primary-color="#f3f3f3"
            secondary-color="#ecebeb"
          >
            <rect
              x="20"
              y="20"
              rx="4"
              ry="4"
              width="120"
              height="60"
            />
            <rect
              x="150"
              y="20"
              rx="0"
              ry="0"
              width="235"
              height="30"
            />
            <rect
              x="150"
              y="60"
              rx="0"
              ry="0"
              width="235"
              height="20"
            />
          </ContentLoader>
        </template>
        <template v-else>
          <ArticleCard
            v-for="itemArticle in itemList.articles"
            :key="itemArticle.id"
            :now-index="nowIndex"
            :article="itemArticle"
            type="shop"
          />
        </template>
        <p
          v-if="itemList.articles.length === 0 && itemList.loading"
          style="font-size: 14px;
              text-align: center;
              margin-top: 20px;"
        >
          {{ $t('notContent') }}
        </p>
      </BasePull>
    </div>

    <Sidebar v-model="showSidebar" />
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import homeHead from './components/homeHead.vue'
import homeNav from './components/homeNav.vue'
import homeSlide from './components/homeSlide.vue'
import Sidebar from '@/components/Sidebar/index.vue'
import { ArticleCard } from '@/components/'
// import banner from '@/components/banner/index.vue'
import bannerMatataki from '@/components/banner/banner_matataki.vue'

export default {
  name: 'Home',
  components: {
    homeHead,
    homeNav,
    homeSlide,
    ArticleCard,
    ContentLoader,
    Sidebar,
    bannerMatataki
    // banner,
  },
  data() {
    return {
      showSidebar: false,
      nowIndex: 0,
      // 防止数据嵌套太多 把内容提取出来
      content: {
        navMenu: [
          {
            label: this.$t('home.articleNavNow'),
            title: this.$t('home.shopNavNowTitle'),
            params: {
              channel: 2
            },
            apiUrl: 'homeTimeRanking',
            articles: [],
            autoRequestTime: 0,
            loading: false
          },
          {
            label: this.$t('home.articleNavHot'),
            title: this.$t('home.shopNavHotTitle'),
            params: {
              channel: 2
            },
            apiUrl: 'homeSupportsRanking',
            articles: [],
            autoRequestTime: 0,
            loading: false
          }
        ],
        activeIndex: 0,
        recommend: {
          title: this.$t('home.shopNavRecommend'),
          list: []
        }
      }
    }
  },
  computed: {
    // 内容标题
    contentTitle() {
      const index = this.content.activeIndex
      return this.content.navMenu[index].title
    },
    // 是否显示推荐文章或者商品
    isShowSlide() {
      return this.content.activeIndex === 0
    },
    isHaveArticle() {
      const index = this.content.activeIndex
      const status = this.content.navMenu[index].articles.length
      // console.log(status)
      return status
    }
  },
  watch: {
    '$i18n.locale'() {
      // console.log(this.$i18n.locale)
      this.setContent()
    }
  },
  created() {
    this.initNav()
    this.postsRecommend(2)
  },
  mounted() {},
  methods: {
    initNav() {
      if (!this.$route.params) return
      if (this.$route.params.nav === 0) this.nowIndex = 0
      else if (this.$route.params.nav === 1) this.nowIndex = 1
      else this.nowIndex = 0
    },
    increaseTime(type, i) {
      // 如果自动刷新的时间为0 并且 内容长度为0 刷新一次组件
      if (type === 'headNav') {
        // head 的导航切换
        const index = this.content.activeIndex // 当前的聚焦索引
        const navMenuData = this.content.navMenu[index] // 当前聚焦索引的数据
        if (navMenuData.autoRequestTime === 0 && navMenuData.articles.length === 0)
          this.content.navMenu[index].autoRequestTime += Date.now()
      } else if (type === 'nemuNav') {
        // 内容的导航
        const navMenuData = this.content.navMenu[i] // 当前聚焦索引的数据
        if (navMenuData.autoRequestTime === 0 && navMenuData.articles.length === 0)
          this.content.navMenu[i].autoRequestTime += Date.now()
      }
    },
    toggleNavMenu(i) {
      this.content.activeIndex = i
      this.increaseTime('nemuNav', i)
    },

    // 获取文章列表数据
    getListData(res) {
      // console.log(this.nowIndex, res.index);
      this.content.navMenu[res.index].loading = true
      this.content.navMenu[res.index].articles = res.list
    },
    // 获取推荐文章或者商品
    async postsRecommend(channel) {
      await this.$API.postsRecommend({
        channel: channel
      })
        .then(res => {
          if (res.code === 0) {
            this.content.recommend.list = res.data
          } else console.log(res.message)
        })
        .catch(err => {
          console.log(err)
        })
    },
    setContent() {
      this.content.navMenu[0].label = this.$t('home.articleNavNow')
      this.content.navMenu[0].title = this.$t('home.shopNavNowTitle')

      this.content.navMenu[1].label = this.$t('home.articleNavHot')
      this.content.recommend.title = this.$t('home.shopNavRecommend')
    }
  }
}
</script>

<style scoped lang="less" src="./index.less"></style>

<style lang="less" scoped>
.margin {
  margin-top: 60px;
}
</style>
