import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoIosAdd } from "react-icons/io";
import * as yup from "yup";
import Button from "../../components/Button";
import Input from "../../components/Input";
import useProductApi from "../../hooks/useProductApi";
import useProductTypesApi from "../../hooks/useProductTypesApi";
import { TCreateProduct } from "../../types/form.type";
import { useDispatch } from "react-redux";
import { setProductTypes } from "../../stores/reducers/product.reducer";

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
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateProduct>({
    resolver: yupResolver(schema),
  });
  const { loading, error, fetchProducts, createProduct } = useProductApi();
  const { productTypes, fetchProductTypes } = useProductTypesApi();

  const onSubmit = async (data: any) => {
    createProduct(data);
  };

  useEffect(() => {
    fetchProductTypes();
  }, [fetchProductTypes]);

  useEffect(() => {
    if (productTypes)
      dispatch(
        setProductTypes(
          productTypes?.map((type) => ({
            value: type.value,
            label: type.label,
          }))
        )
      );
  }, [dispatch, productTypes]);

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
          options={
            productTypes?.map((type) => ({
              label: type?.label,
              value: type?.value,
            })) || []
          }
        />
        <Button className="w-fit m-auto" leftIcon={<IoIosAdd size={20} />}>
          Create now
        </Button>
      </form>
    </div>
  );
}
