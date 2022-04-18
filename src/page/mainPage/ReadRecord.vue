<script setup>
import {
  onMounted, ref, computed, reactive,
} from 'vue';
import { readRecordGetAll } from '../../http/api';

const search = ref('');
const filterTableData = computed(() => readRecordList.tableData.filter(
  (data) => !search.value || data.meterid.toLowerCase().includes(search.value.toLowerCase()),
));
const readRecordList = reactive({
  tableData: [],
});
onMounted(() => {
  readRecordGetAll().then((res) => {
    console.log('res', res);
    readRecordList.tableData = res;
  });
});
</script>

<template>
  <el-card>
    <div>
      <h5>抄表记录</h5>
      <el-divider/>
      <div class='table-style'>
        <el-table :data="filterTableData" style="width: 100%; background-color: rgb(248, 248, 248);">
          <el-table-column label="气表ID" width="180">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <el-icon><timer /></el-icon>
                <span style="margin-inline-start: -15px">{{ scope.row.meterid }}</span>
                </div>
                </template>
              </el-table-column>
              <el-table-column label="最近抄表日期" width="180px">
                  <template #default="scope">
                    <span> {{ scope.row.timer}}</span>
                  </template>
              </el-table-column>
              <el-table-column label="绑定气卡ID" width="180px">
                  <template #default="scope">
                    <span> {{ scope.row.lookup[0].cardid}}</span>
                  </template>
              </el-table-column>、
              <el-table-column label="单次耗量" width="180px">
                  <template #default="scope">
                    <span> {{ scope.row.diff}}</span>
                  </template>
              </el-table-column>
              <el-table-column label="累计耗量" width="180px">
                  <template #default="scope">
                    <span> {{ scope.row.lastcum}}</span>
                  </template>
              </el-table-column>
                  <el-table-column>
                    <template #header>
              <el-input v-model="search" size="small" placeholder="输入气表ID" />
              </template>
                </el-table-column>
            </el-table>
      </div>
    </div>
  </el-card>
</template>
