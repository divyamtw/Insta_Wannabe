import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const useZodForm = (schema, defaultValues = {}) => {
  return useForm({ resolver: zodResolver(schema), defaultValues });
};

export default useZodForm;