<script lang="ts" setup>
import CustomDatatable from "@/components/commons/CustomDatatable.vue";
import MainContent from "@/components/commons/MainContent.vue";
import { useUsers } from "@/composable/user/useUsers";
import { useUser } from "@/composable/user/useUser";
import type { FilterData } from "@/data/dto/datatable/FilterDataDto";
import { useRouter } from "vue-router";
const { getterUsers, columns, columnHelper, fetchUser,  exportData ,exportColumns} = useUsers();
const {
    remove, deletedId, setDeletedId
} = useUser()

// fetch dengan filter apabil ada perubahann search didatatable
function handleFilter(filter: FilterData) {
    fetchUser(filter);
}

const router = useRouter();


</script>
<template>
    <div>
        <MainContent title="User">
            <CustomDatatable :columns="columns" :datas="getterUsers" :column-helper="columnHelper"
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
                name: 'user-edit',
                params: {
                    id: id
                }
            })
        }" @handle-create="router.push({
            name: 'user-create'
        })"   @process-export="(value: string[]) => exportData(value)"
              :show-export-button="true"   :list-column-export="exportColumns"/>
        </MainContent>
    </div>
</template>
