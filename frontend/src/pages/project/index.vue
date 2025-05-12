<script lang="ts" setup>
import CustomDatatable from "@/components/commons/CustomDatatable.vue";
import MainContent from "@/components/commons/MainContent.vue";
import { useProjects } from "@/composable/project/useProjects";
import { useProject } from "@/composable/project/useProject";
import type { FilterData } from "@/data/dto/datatable/FilterDataDto";
import { useRouter } from "vue-router";
const { getterProjects, columns, columnHelper, exportData, fetchProject, exportColumns } = useProjects();
const {
    remove, deletedId, setDeletedId
} = useProject()

function handleFilter(filter: FilterData) {
    fetchProject(filter);
}
const router = useRouter();
</script>
<template>
    <div>
        <MainContent title="Project">
            <CustomDatatable :columns="columns" :datas="getterProjects" :column-helper="columnHelper"
                :show-delete-button="true" :show-detail-button="true" @handle-filter="handleFilter"
                :deleted-id="deletedId" @handle-delete="(id: string) => {
                    setDeletedId(id)
                }" @process-delete="(id: string) => {
            console.log(id)
            remove(id)
        }" :show-create-button="true" @handle-detail="(id: string) => {
            console.log(id)
            router.push({
                name: 'project-edit',
                params: {
                    id: id
                }
            })
        }" @handle-create="router.push({
            name: 'project-create'
        })" :show-export-button="true" @process-export="(value: string[]) => exportData(value)"
                :list-column-export="exportColumns" />
        </MainContent>
    </div>
</template>
