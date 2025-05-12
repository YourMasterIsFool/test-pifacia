<script setup lang="ts" generic="T">
interface IDropdownDatatable {
  showDetailButton?: boolean;
  showDeleteButton?: boolean;
}

const props = defineProps<IDropdownDatatable>();

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const emits = defineEmits(["onDetail", "onDelete"]);

function handlerDelete() {
  emits("onDelete");
}

function handlerDetail() {
  emits("onDetail");
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline"> Open</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>Action</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup class="flex flex-col space-y-2 p-0">
        <DropdownMenuItem
          @click="handlerDetail"
          class="bg-gray-200 text-black flex cursor-pointer justify-start items-start"
          v-if="props.showDetailButton"
        >
          <span> Detail</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          @click="handlerDelete"
          class="bg-red-200 !text-black transition-all duration-300 cursor-pointer hover:!bg-red-300 flex justify-start items-start"
          v-if="props.showDeleteButton"
        >
          <span> Delete</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <!--  -->
    </DropdownMenuContent>
  </DropdownMenu>
</template>
