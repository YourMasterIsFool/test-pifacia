import type { CreateUserDto } from "@/data/dto/user/CreateUserDto"
import type { UpdateUserDto } from "@/data/dto/user/UpdateUserDto"
import router from "@/router"
import { useUserStore } from "@/store/userStore"
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



export function useUser() {
    const userStore = useUserStore()
    const deletedId = ref<string | null>(null)

    const {
        getterDetailUser 
    } = storeToRefs(userStore);

      const formSchema = toTypedSchema(
        z.object({
          name: z.string().min(2, {
            message: "name dibutuhkan",
          }),

          role_id: z.string().min(1, {
            message: "Role Name dibutuhkan",
          }),
          email: z.string().min(2, {
            message: "email dibutuhkan",
          }),
          password: z.string().min(2, {
            message: "password dibutuhkan",
          }),
        })
      );
      const form = useForm({
        validationSchema: formSchema
      })
    async function fetchDetail(id:string) {
        await userStore.detail(id).then(() => {
           form.setValues(getterDetailUser.value)
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
        await userStore.remove(id).then(() => {
          setDeletedId(null);
        });
    }
    async function update(id: string) {

     const updateSchema: UpdateUserDto = {
       name: form.values.name ?? "",
       email: form.values.email ?? "",
       password: form.values.password ?? "",
       role_id: form.values.role_id ?? "",
     };
      await userStore.update(id, updateSchema).then(() => {
        router.back()

        console.log('success')
      });
    }

    
    async function create() {
      const schema: CreateUserDto = {
        name: form.values.name ?? "",
        email: form.values.email ?? "",
        password: form.values.password ?? "",
        role_id: form.values.role_id ?? "",
      };
      await userStore.store(schema).then(() => {
        router.back()
      });
    }


   

    const setDeletedId = (id:string | null) => {
        deletedId.value = id
    }

    const handleSubmit =  form.handleSubmit((values) => {

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
      getterDetailUser,
      form,
      handleSubmit,
      remove,
      deletedId,
      setDeletedId,
      auditsColumnHelper,
      auditColumns,
    };
}
