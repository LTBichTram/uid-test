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
import {
  setProductTypes,
  setTags,
} from "../../stores/reducers/product.reducer";
import useTagsApi from "../../hooks/useTagsApi";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  title: yup.string().trim().required("Title is required!"),
  description: yup.string().required("Description is required!"),
  price: yup
    .string()
    .trim()
    .required("Price is required!")
    .matches(/^\d*\.?\d*$/, "Please enter correct price format!"),
  tags: yup.array(),
});

export default function CreateProduct() {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCreateProduct>({
    resolver: yupResolver(schema),
  });
  const { createProduct, error } = useProductApi();
  const { productTypes, fetchProductTypes } = useProductTypesApi();
  const { tags, fetchTags } = useTagsApi();

  const onSubmit = async (data: TCreateProduct) => {
    const dataConvert = {
      ...data,
      tags: data?.tags?.map((tag) => tag.value),
      productType: data?.productType?.value,
    };
    createProduct(dataConvert);
    if (!error) toast.success("Create successfully!");
    reset();
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

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  useEffect(() => {
    if (tags)
      dispatch(
        setTags(
          tags?.map((type) => ({
            value: type.value,
            label: type.label,
          }))
        )
      );
  }, [dispatch, tags]);

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
        <Input
          control={control}
          name="tags"
          type="multi-select"
          label="Tags"
          options={
            tags?.map((type) => ({
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
