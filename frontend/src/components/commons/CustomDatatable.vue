<script setup lang="ts" generic="T extends { id: string }">
import type {
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table";
import { cn } from "@/lib/utils";
import { valueUpdater } from "@/components/ui/table/utils";
import { Button } from "@/components/ui/button";
import { computed } from "vue";


import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'


import type { FilterData } from "@/data/dto/datatable/FilterDataDto";

import { watch } from "vue";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DropdownDatatable from "./DropdownDatatable.vue";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  createColumnHelper,
  type ColumnHelper,
  type ColumnDef,
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";

import { reactive } from "vue";
import { ChevronDown, ChevronsUpDown } from "lucide-vue-next";
import { h, ref } from "vue";
import Checkbox from "../ui/checkbox/Checkbox.vue";
// import DropdownAction from "./DataTableDemoColumn.vue";

export interface Payment {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
}
// iterface custom datatable buat props
interface ICustomDatatable<T extends { id: string }> {
  datas: T[];
  columns: ColumnDef<T>[];
  showDetailButton?: boolean;
  showDeleteButton?: boolean;
  showCreateButton?: boolean;
  columnHelper: ColumnHelper<T>;
  placeHolder?: string;
  deletedId?: string | null,
  showInputSearch?: boolean,
  showExportButton?: boolean,
  listColumnExport?: string[]
}

// emits handler buat parsing trigger function

const emits = defineEmits(["handleDetail", "handleCreate", "handleFilter", "handleDelete", "processDelete", "processExport"]);

// props data
const props = withDefaults(defineProps<ICustomDatatable<T>>(), {
  datas: () => [],
  columns: () => [],
  showDetailButton: () => false,
  showDeleteButton: () => false,
  showCreateButton: () => false,
  placeHolder: () => "Search...",
  showInputSearch: () => true,
  showExportButton: () => false
});


const deletedId = ref<null|string>(null)

// definisi dto filter data
const filterDatatabale = reactive<FilterData>({
  sorting: null,
  search: null,
});


const showModalExport = ref<boolean>(false);
const columnExport =  ref<string[]>([]);



function confirmExport() {
  emits('processExport', columnExport.value)
}
function confirmDelete() {
  emits("processDelete", props.deletedId)
}


const actionsColumns =
  props.showDeleteButton || props.showDeleteButton
    ? [
        props.columnHelper.display({
          id: "actions",
          header: "Action",
          cell: ({ row }) => {
            // jadikan model berdasarkan generic
            const model = row.original;
            return h(
              "div",
              {
                class: "relative",
              },

              //parsing parameter ke component dropdown Datatable
              h(DropdownDatatable, {
                showDeleteButton: props.showDeleteButton,
                showDetailButton: props.showDetailButton,
                onOnDetail: () => emits("handleDetail", (model.id) ? model.id  : ''),
                onOnDelete: () => emits("handleDelete", model.id),

              }),
            );
          },
        }),
      ]
    : [];
const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const expanded = ref<ExpandedState>({});

const table = useVueTable({
  data: computed(() => props.datas),
  columns: [...props.columns, ...actionsColumns],
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, rowSelection),
  onExpandedChange: (updaterOrValue) => valueUpdater(updaterOrValue, expanded),
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
    get columnVisibility() {
      return columnVisibility.value;
    },
    get rowSelection() {
      return rowSelection.value;
    },
    get expanded() {
      return expanded.value;
    },
    columnPinning: {
      left: ["status"],
    },
  },
});

function onHandlerFilter(filter: FilterData) {
  emits("handleFilter", filter);
}

function handlerCreate() {
  emits("handleCreate");
}

function handleDelete(id: string | null) {
  emits("handleDelete", id)
}

function onChecked(id:string, checked:boolean) {

  console.log(id, checked)
  let find = columnExport.value.includes(id);
  if(checked) {
    if (!find) {
      columnExport.value.push(id)
    }
  }
  else {
    if (find) {
      columnExport.value =  columnExport.value.filter((item) => item != id)
    }
  }
}
watch(filterDatatabale, (newValue) => {
  onHandlerFilter(newValue);
});
</script>

<template>
  <div class="w-full  bg-white p-8 rounded-md ">

    <Dialog :open="props.deletedId != null" @on-open-change="handleDelete(null)">

      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Hapus Data</DialogTitle>
          <DialogDescription>
            Apakah Kamu yakin mau menghapus data ini
          </DialogDescription>
        </DialogHeader>
        <DialogFooter class="w-full flex items-center justify-end">
          <DialogClose as-child>
            <Button @click="deletedId =  null" type="button" variant="secondary">
              Close
            </Button>


          </DialogClose>
          <Button @click="confirmDelete" type="button" variant="destructive">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <Dialog v-if="props.showExportButton" :open="showModalExport" @on-open-change="showModalExport = false">

      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Data</DialogTitle>

        </DialogHeader>

        <ul class="flex flex-col items-start space-y-3" v-if="props.listColumnExport">
          <li class="flex items-center space-x-4" v-for="i in props.listColumnExport">
            <Checkbox @update:model-value="(value) => onChecked(i, value) " />
            <span>
              {{ i }}
            </span>
          </li>
        </ul>
        <DialogFooter class="w-full flex items-center justify-end">
          <DialogClose as-child>
            <Button @click="showModalExport = false" type="button" variant="secondary">
              Close
            </Button>


          </DialogClose>
          <Button @click="confirmExport" type="button" variant="destructive">
            Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <div class="flex gap-2 justify-between items-center py-4">
      <Input v-if="props.showInputSearch" v-model="filterDatatabale.search" class="max-w-sm"
        placeholder="Search" />

      <div class="flex items-center space-x-3">
        <Button variant="secondary" @click="showModalExport =  true" v-if="props.showExportButton">
          Export
        </Button>
        <Button @click="handlerCreate" v-if="props.showCreateButton">
          Create
        </Button>
      </div>
    </div>
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id" :data-pinned="header.column.getIsPinned()"
              :class="
                cn(
                  { 'sticky bg-background/95': header.column.getIsPinned() },
                  header.column.getIsPinned() === 'left' ? 'left-0' : 'right-0',
                )
              ">
              <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                :props="header.getContext()" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <template v-for="row in table.getRowModel().rows" :key="row.id">
              <TableRow :data-state="row.getIsSelected() && 'selected'">
                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id" :data-pinned="cell.column.getIsPinned()"
                  :class="
                    cn(
                      { 'sticky bg-background/95': cell.column.getIsPinned() },
                      cell.column.getIsPinned() === 'left'
                        ? 'left-0'
                        : 'right-0',
                    )
                  ">
                  <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                </TableCell>
              </TableRow>
              <TableRow v-if="row.getIsExpanded()">
                <TableCell :colspan="row.getAllCells().length">
                  {{ JSON.stringify(row.original) }}
                </TableCell>
              </TableRow>
            </template>
          </template>

          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="flex items-center justify-end space-x-2 py-4">
      <div class="flex-1 text-sm text-muted-foreground">
        {{ table.getFilteredSelectedRowModel().rows.length }} of
        {{ table.getFilteredRowModel().rows.length }} row(s) selected.
      </div>
      <div class="space-x-2">
        <Button variant="outline" size="sm" :disabled="!table.getCanPreviousPage()" @click="table.previousPage()">
          Previous
        </Button>
        <Button variant="outline" size="sm" :disabled="!table.getCanNextPage()" @click="table.nextPage()">
          Next
        </Button>
      </div>
    </div>
  </div>
</template>
