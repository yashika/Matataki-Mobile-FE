<template>
  <div class="card">
    <router-link
      class="username"
      :to="{ name: 'user-id', params: { id: id } }"
    >
      <avatar
        :src="cover"
        size="30px"
      />
    </router-link>
    <div class="fl card-info">
      <div class="fl jsb">
        <div class="fl fdc">
          <div class="fl">
            <router-link
              class="username"
              :to="{ name: 'user-id', params: { id: id } }"
            >
              <span class="username">{{ username }}</span>
            </router-link>
            <txHash
              v-if="card.tx_hash"
              :hash="card.tx_hash"
              class="tx-hash"
            />
          </div>
          <span class="type">{{ type }}</span>
        </div>
        <span
          class="amount"
          :style="{ color: color }"
        >{{ amount }}</span>
      </div>
      <div class="fl jsb">
        <span class="time">{{ time }}</span>
        <span class="symbol">{{ card.symbol }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import { precision } from '@/utils/precisionConversion'
import avatar from '@/components/avatar/index.vue'
import txHash from '@/components/tx_hash_popover/index'

export default {
  components: {
    avatar,
    txHash
  },
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['isMe']),
    id() {
      if (this.isMe(this.card.from_uid)) {
        return this.card.to_uid
      } else if (this.isMe(this.card.to_uid)) {
        return this.card.from_uid
      } else {
        return this.card.from_uid
      }
    },
    time() {
      return moment(this.card.create_time).format('MMMDo HH:mm')
    },
    cover() {
      if (this.isMe(this.card.from_uid)) {
        return this.card.to_avatar ? this.$ossProcess(this.card.to_avatar) : ''
      } else if (this.isMe(this.card.to_uid)) {
        return this.card.from_avatar ? this.$ossProcess(this.card.from_avatar) : ''
      } else {
        return this.card.from_avatar ? this.$ossProcess(this.card.from_avatar) : ''
      }
    },
    username() {
      if (this.isMe(this.card.from_uid)) {
        return this.card.to_nickname || this.card.to_username
      } else if (this.isMe(this.card.to_uid)) {
        return this.card.from_nickname || this.card.from_username
      } else {
        return this.card.from_nickname || this.card.from_username
      }
    },
    amount() {
      const tokenamount = precision(this.card.amount, 'CNY', this.card.decimals)
      let amount = this.$publishMethods.formatDecimal(tokenamount, 4)

      if (this.isMe(this.card.from_uid)) {
        return '-' + amount
      } else if (this.isMe(this.card.to_uid)) {
        return '+' + amount
      } else {
        return amount
      }
    },
    color() {
      if (this.isMe(this.card.from_uid)) {
        return '#d74e5a'
      } else if (this.isMe(this.card.to_uid)) {
        return '#41b37d'
      } else {
        return '#000000'
      }
    },
    type() {
      const { type } = this.card
      const typeList = {
        mint: '增发',
        transfer: '赠送',
        exchange_purchase: '交易',
        exchange_addliquidity: '添加流动性',
        exchange_removeliquidity: '删除流动性'
      }
      return typeList[type] || '其他'
    }
  },
  created() {
    console.log(this.isMe(1046))
  },
  methods: {}
}
</script>

<style scoped lang="less">
.card {
  display: flex;
  padding: 10px 20px;
  border-bottom: 1px solid #ececec;
}
.card-info {
  flex: 1;
  flex-direction: column;
  margin-left: 10px;
}
.username {
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 17px;
  white-space: pre-wrap;
  word-break: break-all;
}
.type {
  font-size: 12px;
  font-weight: 400;
  color: rgba(178, 178, 178, 1);
  line-height: 17px;
  margin: 2px 0;
}
.amount {
  font-size: 14px;
  font-weight: 500;
  color: #000;
  line-height: 20px;
}
.time {
  font-size: 12px;
  font-weight: 400;
  color: rgba(178, 178, 178, 1);
  line-height: 17px;
}
.symbol {
  font-size: 12px;
  font-weight: 400;
  color: rgba(178, 178, 178, 1);
  line-height: 17px;
}
.tx-hash {
  margin-left: 10px;
}
</style>
