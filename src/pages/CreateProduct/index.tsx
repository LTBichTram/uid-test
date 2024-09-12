import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TCreateProduct, TOption } from "../../types/form.type";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { IoIosAdd } from "react-icons/io";

const schema = yup.object({
  title: yup.string().trim().required("Title is required!"),
  description: yup.string().required("Description is required!"),
  price: yup
    .string()
    .trim()
    .required("Price is required!")
    .matches(/^\d*\.?\d*$/, "Please enter correct price format!"),
  productType: yup.string(),
});

export default function CreateProduct() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateProduct>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: any) => {};

  return (
    <div>
      <span className="text-xl font-medium mb-4 block">Create Product</span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col group vertical"
      >
        <Input
          control={control}
          name="title"
          error={errors?.title?.message}
          require
          autoFocus
          label="Title"
          maxLength={100}
        />
        <Input
          control={control}
          name="description"
          type="ckeditor"
          error={errors?.description?.message}
          require
          label="Description"
        />
        <Input
          control={control}
          name="price"
          type="price"
          require
          error={errors?.price?.message}
          label="Price"
          placeholder="22.33"
          maxLength={20}
        />
        <Input
          control={control}
          name="productType"
          type="select"
          label="Product type"
          options={productsType}
        />
        <Button className="w-fit m-auto" leftIcon={<IoIosAdd size={20} />}>
          Create now
        </Button>
      </form>
    </div>
  );
}

const productsType: TOption[] = [
  {
    value: "dog_food",
    label: "Dog Food",
  },
  {
    value: "accessories_supplies",
    label: "Accessories and Supplies",
  },
  {
    value: "health_care_products",
    label: "Health Care Products",
  },
  {
    value: "clothing_accessories",
    label: "Clothing and Accessories",
  },
  {
    value: "services",
    label: "Services",
  },
];
