<template>
  <div class="draftbox mw">
    <BaseHeader :pageinfo="{ title: $t('user.myDraft') }" />
    <BasePull
      :loading-text="$t('prompt.notDraft')"
      :params="params"
      :api-url="apiUrl"
      :need-access-token="true"
      :is-obj="{ type: 'newObject', key: 'data', keys: 'list' }"
      @getListData="getListData"
    >
      <DraftBoxList
        v-for="(item, index) in draftBoxList"
        :key="item.id"
        class="card-margin"
        :draftbox="item"
        :index="index"
        @delId="delId"
      />
    </BasePull>
    <Prompt
      v-model="prompt"
      :content="{
        title: $t('prompt.title'),
        confirmText: $t('prompt.confirmText'),
        cancelText: $t('prompt.cancelText')
      }"
      @confirm="confirmDel"
    />
  </div>
</template>

<script>
import DraftBoxList from './DraftBoxList.vue'
import { Prompt } from '@/components/'

export default {
  name: 'DeaftBox',
  components: {
    DraftBoxList,
    Prompt
  },
  data() {
    return {
      prompt: false,
      params: {},
      apiUrl: 'draftboxList',
      draftBoxList: [],
      delModel: false,
      currentData: {}
    }
  },
  mounted() {},
  methods: {
    getListData(res) {
      // console.log(res)
      this.draftBoxList = res.list
    },
    confirmDel() {
      const { id, index } = this.currentData
      this.prompt = false
      this.asyncSuccessDel(id, index)
    },
    delId(data) {
      this.currentData = data
      this.prompt = true
    },
    // 删除草稿
    async asyncSuccessDel(id, index) {
      try {
        const res = await this.$API.delDraft({ id })
        if (res.code === 0) {
          this.$message.success(res.message)
          this.draftBoxList.splice(index, 1) // 前端手动删除一下数据
          this.$Modal.remove()
        } else {
          return this.$message.error(res.message)
        }
      } catch (error) {
        return console.log(this.$t('user.deleteDraftFail'))
      }
    }
  }
}
</script>
<style scoped lang="less">
.draftbox {
  background-color: #f7f7f7;
  padding-bottom: 20px;
  padding-top: 45px;
  min-height: 100%;
}
.card-margin {
  margin-bottom: 10px;
}
</style>
