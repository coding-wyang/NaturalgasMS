<script setup>
import {
  onMounted, ref, computed, reactive,
} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { payRecordGetALL, payRepassPost } from '../../http/api';

const store = useStore();
const name = computed(() => store.state.name);
const sessionType = sessionStorage.getItem('userType');
const router = useRouter();
const search = ref('');
const filterTableData = computed(() => readRecordList.tableData.filter(
  (data) => !search.value || data.cardid.toLowerCase().includes(search.value.toLowerCase()),
));
const readRecordList = reactive({
  tableData: [],
});
onMounted(() => {
  payRecordGetALL().then((res) => {
    if (sessionType === '2') {
      readRecordList.tableData = res.reduce((p, q) => {
        if (q.user === name.value) {
          p.push(q);
        }
        return p;
      }, []);
    } else {
      readRecordList.tableData = res;
    }
  });
});

const toEchart = (row) => {
  console.log('row', row);
  router.push({ path: 'ReadEchart', query: { name: row.user } });
};

const passRePay = (row) => {
  const currDate = new Date();
  payRepassPost({ timer: row.timer, stamp: currDate }).then((res) => {
    console.log('res', res);
  });
};
</script>

<template>
  <el-card>
    <div>
      <h5>抄表记录</h5>
      <el-divider><svg-icon name='star'/></el-divider>
      <div class='table-style'>
        <el-table :data="filterTableData" @cell-click="toEchart" style="width: 100%; background-color: rgb(248, 248, 248);">
          <el-table-column label="气卡ID" width="180">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <el-icon><timer /></el-icon>
                <span style="margin-inline-start: -15px">{{ scope.row.cardid }}</span>
                </div>
                </template>
              </el-table-column>
              <el-table-column label="缴费日期" width="180px">
                  <template #default="scope">
                    <span> {{ scope.row.timer}}</span>
                  </template>
              </el-table-column>
              <el-table-column label="单次缴费" width="180px">
                  <template #default="scope">
                    <span> {{ scope.row.payment}}</span>
                  </template>
              </el-table-column>
              <el-table-column label="户主" width="180px">
                  <template #default="scope">
                    <span> {{ scope.row.lookup[0].name}}</span>
                  </template>
              </el-table-column>
              <el-table-column label="户主ID" width="180px">
                  <template #default="scope">
                    <span> {{ scope.row.lookup[0].username}}</span>
                  </template>
              </el-table-column>
                  <el-table-column>
                    <template #header>
              <el-input v-model="search" size="small" placeholder="输入气表ID" />
              </template>
              <template #default='scope'>
                  <el-button v-if="sessionType === '2'" @click.stop='passRePay(scope.row)' type='primary'>退费</el-button>
                  </template>
                </el-table-column>
            </el-table>
      </div>
    </div>
  </el-card>
</template>
