import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoIosAdd } from "react-icons/io";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import Button from "../../components/Button";
import Input from "../../components/Input";
import useProductApi from "../../hooks/useProductApi";
import useProductTypesApi from "../../hooks/useProductTypesApi";
import useTagsApi from "../../hooks/useTagsApi";
import {
  setFetchUpdate,
  setProductTypes,
  setTags,
} from "../../stores/reducers/product.reducer";
import { TCreateProduct } from "../../types/form.type";
import { TProduct } from "../../types/product.type";

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

export default function ActionProduct({
  btnText,
  dfValue,
  onClose,
}: {
  btnText: string;
  dfValue?: TProduct;
  onClose?: () => void;
}) {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCreateProduct>({
    resolver: yupResolver(schema),
  });
  const { createProduct, error, updateProduct } = useProductApi();
  const { productTypes, fetchProductTypes } = useProductTypesApi();
  const { tags, fetchTags } = useTagsApi();

  const onSubmit = async (data: TCreateProduct) => {
    const dataConvert = {
      ...data,
      tags: data?.tags?.map((tag) => tag.value),
      productType: data?.productType?.value,
    };
    if (dfValue) {
      updateProduct(dfValue.id, dataConvert);
      if (!error) {
        toast.success("Edit successfully!");
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onClose && onClose();
        dispatch(setFetchUpdate());
      }
    } else {
      createProduct(dataConvert);
      if (!error) toast.success("Create successfully!");
    }
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

  useEffect(() => {
    if (dfValue) {
      reset({
        id: dfValue.id,
        description: dfValue.description,
        price: dfValue.price,
        productType: productTypes.find(
          (item) => item.value === dfValue?.productType
        ),
        title: dfValue.title,
        tags: dfValue?.tags?.map((item) =>
          tags.find((tag) => tag.value === item)
        ),
      });
    } else reset({});
  }, [dfValue]);

  return (
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
        {btnText}
      </Button>
    </form>
  );
}
