<template>
  <div class="card">
    <div class="fl jsb">
      <div class="from-to">
        <router-link
          class="info"
          :to="{ name: 'user-id', params: { id: card.from_uid } }"
          :class="!card.from_username && 'logout'"
        >
          {{ from_nickname }}
        </router-link>
        <svg-icon
          icon-class="transfer"
          class="info-icon"
        />
        <router-link
          class="info"
          :to="{ name: 'user-id', params: { id: card.to_uid } }"
          :class="!card.to_username && 'logout'"
        >
          {{ to_nickname }}
        </router-link>
        <txHash
          v-if="card.tx_hash"
          :hash="card.tx_hash"
          class="tx-hash"
        />
      </div>
      <span class="amount">{{ tokenAmount(card.amount) }}</span>
    </div>
    <div class="fl jsb">
      <span class="time">{{ time }}</span>
      <!-- <span class="type">{{ type }}</span> -->
      <span class="symbol">{{ card.symbol }}</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

import { precision } from '@/utils/precisionConversion'
import txHash from '@/components/tx_hash_popover/index'

export default {
  components: {
    txHash
  },
  props: {
    card: {
      type: Object,
      required: true
    },
    decimals: {
      type: Number,
      required: true
    }
  },
  computed: {
    time() {
      return moment(this.card.create_time).format('MMMDo HH:mm')
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
    },
    from_nickname() {
      return this.card.from_nickname || this.card.from_username || '此账号已注销'
    },
    to_nickname() {
      return this.card.to_nickname || this.card.to_username || '此账号已注销'
    }
  },
  methods: {
    cover(cover) {
      return cover ? this.$ossProcess(cover) : ''
    },
    tokenAmount(amount) {
      const tokenamount = precision(amount, 'CNY', this.decimals)
      return this.$publishMethods.formatDecimal(tokenamount, 4)
    }
  }
}
</script>

<style scoped lang="less">
.card {
  border-bottom: 1px solid #ececec;
  display: flex;
  flex-direction: column;
  padding: 14px 20px;
  & > div {
    margin: 6px 0;
  }
  .info {
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 115px;
    &.logout {
      color: #b2b2b2;
    }
  }
  .info-icon {
    margin: 0 10px;
    color: #000;
  }
}
.time {
  font-size: 12px;
  font-weight: 400;
  color: rgba(178, 178, 178, 1);
  line-height: 17px;
}
.type {
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 20px;
}
.amount {
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 20px;
}
.symbol {
  font-size: 12px;
  font-weight: 400;
  color: rgba(178, 178, 178, 1);
  line-height: 17px;
}
.from-to {
  display: flex;
  align-items: center;
  flex: 1;
}
.tx-hash {
  margin-left: 10px;
}
</style>
