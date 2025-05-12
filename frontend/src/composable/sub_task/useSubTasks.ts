import { storeToRefs } from "pinia";
import type { SubTaskEntity } from "../../domain/entity/SubTaskEntity";
import { useSubTaskStore } from "../../store/subTaskStore";
import { onMounted } from "vue";

import { createColumnHelper } from "@tanstack/vue-table";
import { h, ref } from "vue";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronsUpDown } from "lucide-vue-next";
import type { FilterData } from "../../data/dto/datatable/FilterDataDto";
import { formatDate } from "@/lib/formatDate";

export function useSubTasks() {
  const subTaskStore = useSubTaskStore();

  const { getterSubTasks } = storeToRefs(subTaskStore);

  async function fetchSubTask(filter?: FilterData) {
    await subTaskStore.get(filter);
  }

  const columnHelper = createColumnHelper<SubTaskEntity>();
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

    columnHelper.accessor("metadata", {
      enablePinning: true,
      header: "Metatada",
      cell: ({ row }) =>
        h("div", { class: "capitalize" }, row.original.metadata),
    }),

    columnHelper.accessor("task.name", {
      enablePinning: true,
      header: "Task",
      cell: ({ row }) =>
        h("div", { class: "capitalize" }, row.original.task?.name),
    }),
  ];

  onMounted(() => {
    fetchSubTask();
  });

  const exportColumns = ref<string[]>([
    'name', 'start', 'end'
  ])


  async function exportData(columns: string[]) {
    return await subTaskStore.exportData(columns);
  }
  return {
    columns,
    getterSubTasks,
    columnHelper,
    fetchSubTask,
    exportColumns,
    exportData,
  };
}
