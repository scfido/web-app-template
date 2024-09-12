import React from 'react';
import { Control, Controller, useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormField } from '@/components/ui/form';
import { register } from 'module';

const MAX_FILE_SIZE = 5000000; // 5MB
const ALLOWED_FILE_TYPES = ['pdf', 'docx'];

const fileSchema = z
  .any()
  .transform((val) => {
    console.log("val:", val)
    return (val instanceof FileList ? val[0] : val)
  })
  .refine((file) => file && file instanceof File, {
    message: '上传的文件无效',
  })
  .refine((file) => file?.size <= MAX_FILE_SIZE, {
    message: '文件大小不能超过5MB',
  }).refine((file) => {
    const fileType = file?.name?.split('.').pop() ?? '';
    return ALLOWED_FILE_TYPES.includes(fileType);
  }, {
    message: `只支持 ${ALLOWED_FILE_TYPES.join(', ')} 格式的文件`,
  })

const formSchema = z.object({
  file: fileSchema.optional(),
  file2: fileSchema.optional(),
})
type FormData = z.infer<typeof formSchema>;


const FileInput = ({ control, name }: { control: Control, name: string }) => {
  const { field } = useController({
    control,
    name,
    rules: {
      required: '请上传文件'
    },
  })
  return (
    <input type="file"
      onBlur={field.onBlur}
      onChange={(e) => {
        field.onChange(e.target.files[0])
        console.log("e:", e)
      }} />
  )
}

const FileUploadForm: React.FC = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: "",
      file2: "",
    }
  });

  const onSubmit = (data: FormData) => {
    console.log('文件上传成功:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <div>
          <Label htmlFor="file">上传文件:</Label>
          <input type="file" {...register("file")} />
          {errors.file && <span className="text-red-500">{errors.file.message as string}</span>}
        </div>
        <div>
          <Label htmlFor="file2">上传文件2:</Label>
          <FileInput control={control} name="file2" />
          {errors.file2 && <span className="text-red-500">{errors.file2.message as string}</span>}
        </div>
      </div>
      <Button type="submit">提交</Button>
    </form>
  );
};

export default FileUploadForm;
