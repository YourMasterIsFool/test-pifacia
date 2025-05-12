import { storeToRefs } from "pinia";
import type { ProjectEntity } from "../../domain/entity/ProjectEntity";
import { useProjectStore } from "../../store/projectStore";
import { onMounted } from "vue";

import { createColumnHelper } from "@tanstack/vue-table";
import { h, ref } from "vue";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronsUpDown } from "lucide-vue-next";
import type { FilterData } from "../../data/dto/datatable/FilterDataDto";
import { formatDate } from "@/lib/formatDate";

export function useProjects() {
  const projectStore = useProjectStore();

  const { getterProjects } = storeToRefs(projectStore);

  async function fetchProject(filter?: FilterData) {
    await projectStore.get(filter);
  }

  const columnHelper = createColumnHelper<ProjectEntity>();
  const columns = [
    columnHelper.display({
      id: "select",
      header: ({ table }) =>
        h(Checkbox, {
          modelValue:
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate"),
          "onUpdate:modelValue": (value) =>
            table.toggleAllPageRowsSelected(!!value),
          ariaLabel: "Select all",
        }),
      cell: ({ row }) => {
        return h(Checkbox, {
          modelValue: row.getIsSelected(),
          "onUpdate:modelValue": (value) => row.toggleSelected(!!value),
          ariaLabel: "Select row",
        });
      },
      enableSorting: false,
      enableHiding: false,
    }),
    // columnHelper.accessor("code", {
    //   enablePinning: true,
    //   header: "code",
    //   cell: ({ row }) =>
    //     h("div", { class: "capitalize" }, row.getValue("code")),
    // }),

    columnHelper.accessor("name", {
      enablePinning: true,
      header: "name",
      cell: ({ row }) =>
        h("div", { class: "capitalize" }, row.getValue("name")),
    }),

    columnHelper.accessor("creator.name", {
      enablePinning: true,
      header: "creator name",
      cell: ({ row }) =>
        h("div", { class: "capitalize" }, row.original.creator?.name),
    }),

    columnHelper.accessor("start", {
      enablePinning: true,
      header: "Start Date",
      cell: ({ row }) =>
        h("div", { class: "capitalize" }, formatDate(row.original.start)),
    }),

    columnHelper.accessor("end", {
      enablePinning: true,
      header: "End Date",
      cell: ({ row }) =>
        h("div", { class: "capitalize" }, formatDate(row.original.end)),
    }),
  ];


  async function exportData(columns: string[]) {
    return await projectStore.exportData(columns)
  }


  const exportColumns = ref<string[]>([
      'name', 'start', 'end'
    ])
  onMounted(() => {
    fetchProject();
  });

  return {
    columns,
    getterProjects,
    columnHelper,
    fetchProject,
    exportData,
    exportColumns
  };
}
