<script setup>
import { ref, onMounted } from 'vue'

import csv from 'csvtojson'

const data = ref([])
const position = ref(1)
const mode = ref("write")

const readItemUrl = ref(null)

const importData = async (file) => {
  const reader = new FileReader()
  reader.onload = async () => {
    for (const i of await csv().fromString(reader.result)) {
      data.value.push(i)
    }
  }
  reader.readAsText(file.file)
}

onMounted(async () => {
  if ('NDEFReader' in window) {
    const ndef = new NDEFReader()
    ndef.onreading = async e => {
      if (mode.value == "write") {
        const item = data.value[position.value - 1]
        try {
          await ndef.write({
            records: [{recordType: "url", data: item.url}]
          })
          position.value ++
        } catch (err) {
          alert(err)
        }
      } else if (mode.value == "check") {
        alert(e)
      }
    }
    await ndef.scan()
  } 
})

const prettyJson = (value) => {
  return JSON.stringify(value, null, 2);
}
</script>

<template>
  <van-tabs v-model:active="mode">
    <van-tab title="Write" name="write">
      <div v-if="data.length > 0">
        <div style="padding: 0.5rem">
          <pre>{{ prettyJson(data[position - 1]) }}</pre>
        </div>
        <van-pagination v-model="position" :page-count="data.length" mode="simple" />
      </div>
      <div v-else>
        <van-empty description="Empty" />
      </div>
    </van-tab>
    <van-tab title="Check" name="check">
      <div v-if="data.length > 0">
      </div>
      <div v-else>
        <van-empty description="No data" />
      </div>
    </van-tab>
  </van-tabs>
  <van-floating-panel :anchors="[90, 200]">
    <div style="margin: 1rem">
      <h3>Settings</h3>
      <van-uploader :after-read="importData" accept=".csv">
        <van-button icon="plus" type="primary">Import CSV File</van-button>
      </van-uploader>
    </div>
  </van-floating-panel>
</template>

<style scoped>
</style>
