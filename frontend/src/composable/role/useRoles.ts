import { storeToRefs } from "pinia";
import type { RoleEntity } from "../../domain/entity/RoleEntity";
import { useRoleStore } from "../../store/roleStore";
import { onMounted } from "vue";

import { createColumnHelper } from "@tanstack/vue-table";
import { h, ref } from "vue";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronsUpDown } from "lucide-vue-next";
import type { FilterData } from "../../data/dto/datatable/FilterDataDto";

export function useRoles() {
  const roleStore = useRoleStore();

  const { getterRoles } = storeToRefs(roleStore);

  async function fetchRole(filter?: FilterData) {
    await roleStore.get(filter);
  }

  const columnHelper = createColumnHelper<RoleEntity>();
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
    columnHelper.accessor("code", {
      enablePinning: true,
      header: "code",
      cell: ({ row }) =>
        h("div", { class: "capitalize" }, row.getValue("code")),
    }),

    columnHelper.accessor("name", {
      enablePinning: true,
      header: "name",
      cell: ({ row }) =>
        h("div", { class: "capitalize" }, row.getValue("name")),
    }),
    // columnHelper.accessor("name", {
    //   header: ({ column }) => {
    //     return h(
    //       Button,
    //       {
    //         variant: "ghost",
    //         onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
    //       },
    //       () => ["Email", h(ChevronsUpDown, { class: "ml-2 h-4 w-4" })],
    //     );
    //   },
    //   cell: ({ row }) =>
    //     h("div", { class: "lowercase" }, row.getValue("email")),
    // }),

    // columnHelper.display({
    //   id: "actions",
    //   enableHiding: false,
    //   cell: ({ row }) => {
    //     const payment = row.original;

    //     return h(
    //       "div",
    //       { class: "relative" },
    //       h(DropdownAction, {
    //         payment,
    //         onExpand: row.toggleExpanded,
    //       }),
    //     );
    //   },
    // }),
  ];

  onMounted(() => {
    fetchRole();
  });

  return {
    columns,
    getterRoles,
    columnHelper,
    fetchRole,
  };
}
