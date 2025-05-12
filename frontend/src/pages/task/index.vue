<script lang="ts" setup>
import CustomDatatable from "@/components/commons/CustomDatatable.vue";
import MainContent from "@/components/commons/MainContent.vue";
import { useTasks } from "@/composable/task/useTasks";
import { useTask } from "@/composable/task/useTask";
import type { FilterData } from "@/data/dto/datatable/FilterDataDto";
import { useRouter } from "vue-router";
const { getterTasks, columns, columnHelper, fetchTask,  exportData ,exportColumns} = useTasks();
const {
    remove, deletedId, setDeletedId
} = useTask()

// fetch dengan filter apabil ada perubahann search didatatable
function handleFilter(filter: FilterData) {
    fetchTask(filter);
}

const router = useRouter();


</script>
<template>
    <div>
        <MainContent title="Task">
            <CustomDatatable :columns="columns" :datas="getterTasks" :column-helper="columnHelper"
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
                name: 'task-edit',
                params: {
                    id: id
                }
            })
        }" @handle-create="router.push({
            name: 'task-create'
        })"   @process-export="(value: string[]) => exportData(value)"
              :show-export-button="true"   :list-column-export="exportColumns"/>
        </MainContent>
    </div>
</template>
