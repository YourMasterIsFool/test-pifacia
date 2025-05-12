import { storeToRefs } from "pinia";
import type { UserEntity } from "../../domain/entity/UserEntity";
import { onMounted } from "vue";

import { createColumnHelper } from "@tanstack/vue-table";
import { h, ref } from "vue";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronsUpDown } from "lucide-vue-next";
import type { FilterData } from "../../data/dto/datatable/FilterDataDto";
import { formatDate } from "@/lib/formatDate";
import { useUserStore } from "@/store/userStore";

export function useUsers() {
  const userStore =  useUserStore()
  const { getterUsers } = storeToRefs(userStore);

  async function fetchUser(filter?: FilterData) {
    await userStore.get(filter);
  }

  const columnHelper = createColumnHelper<UserEntity>();
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

    columnHelper.accessor("email", {
      enablePinning: true,
      header: "Start Date",
      cell: ({ row }) =>
        h("div", { class: "capitalize" }, (row.original.email)),
    }),

    columnHelper.accessor("name", {
      enablePinning: true,
      header: "End Date",
      cell: ({ row }) =>
        h("div", { class: "capitalize" }, (row.original.name)),
    }),

    columnHelper.accessor("role.name", {
      enablePinning: true,
      header: "Role",
      cell: ({ row }) =>
        h("div", { class: "capitalize" }, row.original.role.name),
    }),

  
  ];


  async function exportData(columns: string[]) {
    return await userStore.exportData(columns);
  }

   const exportColumns = ref<string[]>([
        'name', 'start', 'end'
      ])
  onMounted(() => {
    fetchUser();
  });

  return {
    columns,
    getterUsers,
    columnHelper,
    fetchUser,
    exportColumns,
    exportData,
  };
}
