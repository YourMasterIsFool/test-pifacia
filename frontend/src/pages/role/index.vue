<script lang="ts" setup>
import CustomDatatable from "@/components/commons/CustomDatatable.vue";
import MainContent from "@/components/commons/MainContent.vue";
import { useRoles } from "@/composable/role/useRoles";
import { useRole } from "@/composable/role/userRole";
import type { FilterData } from "@/data/dto/datatable/FilterDataDto";
import { useRouter } from "vue-router";
const { getterRoles, columns, columnHelper, fetchRole,   } = useRoles();
const {
  remove, deletedId, setDeletedId
} =  useRole()

// fetch dengan filter apabil ada perubahann search didatatable
function handleFilter(filter: FilterData) {
  fetchRole(filter);
}

const router = useRouter();


</script>
<template>
  <div>
    <MainContent title="Role">
      <CustomDatatable
        :columns="columns"
        :datas="getterRoles"
        :column-helper="columnHelper"
        :show-delete-button="true"
        :show-detail-button="true"
        @handle-filter="handleFilter"
        :deleted-id="deletedId"
        @handle-delete="(id: string) => {
          console.log(id)
          setDeletedId(id)
        }"
        @process-delete="(id: string) => {
          console.log(id)
  remove(id)
        }"
        :show-create-button="true"
        @handle-detail="(id:string) => {
          console.log(id)
        router.push({
          name: 'role-edit',
          params: {
            id: id
          }
        })
        }"
        @handle-create="router.push({
          name: 'role-create'
        })"
      />
    </MainContent>
  </div>
</template>
