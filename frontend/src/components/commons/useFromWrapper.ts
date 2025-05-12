import { useForm, type FormOptions, type GenericObject, type TypedSchema } from "vee-validate"

interface IUseFormWrapper {
    formSchema:TypedSchema<GenericObject, GenericObject>,
    defaultValue?: Record<string, any>
}
export function useFormWrapper(
    props: IUseFormWrapper
) {

    const form = useForm({
        validationSchema: props.formSchema
    })


    const onSubmit = form.handleSubmit((values) => {
        console.log(values)
    })
    return {
        form,
        onSubmit
    }
}