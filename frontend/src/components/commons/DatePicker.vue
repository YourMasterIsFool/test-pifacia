<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'


import { formatDate } from '@/lib/formatDate'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  DateFormatter,
  type DateValue,
  parseDate,
  getLocalTimeZone,
} from '@internationalized/date'
import { CalendarIcon } from 'lucide-vue-next'
import { ref, computed } from 'vue'





interface IDatePicker {
    value: string | undefined
}


const props = defineProps<IDatePicker>();



const value = computed({
  get: () => props.value ? parseDate(props.value) : undefined,
  set: val => val,
})

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const emits =  defineEmits(['change']);


function onChange(value: DateValue) {
    emits("change", value.toString())
}

</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn(
          'w-[280px] justify-start text-left font-normal',
          !props.value && 'text-muted-foreground',
        )"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ props.value ? formatDate(props.value) : "Pick a date" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="value"  @update:model-value="(value) => onChange(value)" initial-focus />
    </PopoverContent>
  </Popover>
</template>