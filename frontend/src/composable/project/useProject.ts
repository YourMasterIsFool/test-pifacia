import type { CreateProjectDto } from "@/data/dto/project/CreateProjectDto"
import type { UpdateProjectDto } from "@/data/dto/project/UpdateProjectDto"
import router from "@/router"
import { useProjectStore } from "@/store/projectStore"
import { toTypedSchema } from "@vee-validate/zod"
import type { metadata } from "@vueuse/core/metadata.mjs"
import { storeToRefs } from "pinia"
import { useForm } from "vee-validate"
import { onMounted, watch,ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { z } from "zod"
import { h } from "vue";
import type { AuditEntity } from "@/domain/entity/AuditEntity"
import { createColumnHelper } from "@tanstack/vue-table"
import { formatDate } from "@/lib/formatDate"



const MAX_SIZE_KB = 500;
const MIN_SIZE_KB = 100;

export function useProject() {

    const projectStore = useProjectStore()
    const deletedId = ref<string | null>(null)

    const {
        getterDetailProject 
    } = storeToRefs(projectStore);

      const formSchema = toTypedSchema(
        z.object({
          name: z.string().min(2, {
            message: "name dibutuhkan",
          }),
          start: z.string().min(2, {
            message: "start dibutuhkan",
          }),
          end: z.string().min(2, {
            message: "end dibutuhkan",
          }),
          metadata: z.string().min(2, {
            message: "metadata dibutuhkan",
          }),
          file: z
            .instanceof(File)
            .refine((file) => file.type === "application/pdf", {
              message: "File harus berupa PDF",
            })
            .refine((file) => file.size >= MIN_SIZE_KB * 1024, {
              message: `Ukuran file minimal ${MIN_SIZE_KB}KB`,
            })
            .refine((file) => file.size <= MAX_SIZE_KB * 1024, {
              message: `Ukuran file maksimal ${MAX_SIZE_KB}KB`,
            }),
        })
      );
      const form = useForm({
        validationSchema: formSchema
      })
    async function fetchDetail(id:string) {
        await projectStore.detail(id).then(() => {
           form.setValues(getterDetailProject.value)
        });
    }
   const route = useRoute();

   // fetch data ketika ada berubahhan di parasm id untuk data detail
   onMounted(() => {
    if(route.params.id) {
        fetchDetail(route.params.id as string)
    }
   })


    async function remove(id:string) {

        await projectStore.remove(id).then(() => {
          setDeletedId(null);
        });
    }
    async function update(id: string) {

     const updateSchema: UpdateProjectDto = {
        name: form.values.name ?? '',
        start: form.values.start ?? '',
        end: form.values.end ?? '',
        metadata: form.values.metadata ?? "",
        
        
     }

     if(form.values.file) {
        updateSchema['file'] = form.values.file as File
     }
      await projectStore.update(id, updateSchema).then(() => {
        router.back()

        console.log('success')
      });
    }

    
    async function create() {
      const schema: CreateProjectDto = {
        name: form.values.name ?? "",
        start: form.values.start ?? "",
        end: form.values.end ?? "",
        metadata: form.values.metadata ?? "",
        file: form.values.file as File
      };

      console.log(schema)
      await projectStore.store(schema, () => router.back());
    }


   

    const setDeletedId = (id:string | null) => {
        deletedId.value = id
    }

    const handleSubmit =  form.handleSubmit((values) => {

      console.log(values)
        if(route.params.id) {
            update(route.params.id as string)
        }
        else {
            create()
        }

    })


     const auditsColumnHelper = createColumnHelper<AuditEntity>();
      const auditColumns = [
        auditsColumnHelper.accessor("created_at", {
          enablePinning: true,
          header: "date",
          cell: ({ row }) =>
            h(
              "div",
              { class: "capitalize" },
              formatDate(row.original.created_at)
            ),
        }),
        auditsColumnHelper.accessor("action", {
          enablePinning: true,
          header: "Action",
          cell: ({ row }) =>
            h("div", { class: "capitalize" }, row.original.action),
        }),
        auditsColumnHelper.accessor("features", {
          enablePinning: true,
          header: "Features",
          cell: ({ row }) =>
            h("div", { class: "capitalize" }, row.original.features),
        }),

        auditsColumnHelper.accessor("notes", {
          enablePinning: true,
          header: "Notes",
          cell: ({ row }) =>
            h("div", { class: "capitalize" }, row.original.notes),
        }),
        auditsColumnHelper.accessor("creator_name", {
          enablePinning: true,
          header: "Creator Name",
          cell: ({ row }) =>
            h("div", { class: "capitalize" }, row.original.creator_name),
        }),
      ];
    return {
      getterDetailProject,
      form,
      handleSubmit,
      remove,
      deletedId,
      setDeletedId,
      auditsColumnHelper,
      auditColumns,
    };
}
