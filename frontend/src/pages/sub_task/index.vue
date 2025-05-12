<script lang="ts" setup>
import CustomDatatable from "@/components/commons/CustomDatatable.vue";
import MainContent from "@/components/commons/MainContent.vue";
import { useSubTasks } from "@/composable/sub_task/useSubTasks";
import { useSubTask } from "@/composable/sub_task/useSubTask";
import type { FilterData } from "@/data/dto/datatable/FilterDataDto";
import { useRouter } from "vue-router";
const { getterSubTasks, columns, columnHelper,exportColumns, fetchSubTask, exportData } = useSubTasks();
const {
    remove, deletedId, setDeletedId
} = useSubTask()

// fetch dengan filter apabil ada perubahann search didatatable
function handleFilter(filter: FilterData) {
    fetchSubTask(filter);
}

const router = useRouter();


</script>
<template>
    <div>
        <MainContent title="SubTask">
            <CustomDatatable 
            :show-export-button="true"
            :columns="columns" :datas="getterSubTasks" :column-helper="columnHelper"
                :show-delete-button="true" :show-detail-button="true" @handle-filter="handleFilter"
                :deleted-id="deletedId" @handle-delete="(id: string) => {
                    console.log(id)
                    setDeletedId(id)
                }" @process-delete="(id: string) => {
            console.log(id)
            remove(id)
        }" :show-create-button="true" @handle-detail="(id: string) => {
            console.log(id)
            router.push({
                name: 'sub_task-edit',
                params: {
                    id: id
                }
            })
        }" @handle-create="router.push({
            name: 'sub_task-create'
        })" :list-column-export="exportColumns"   @process-export="(value: string[]) => exportData(value)"/>
        </MainContent>
    </div>
</template>
