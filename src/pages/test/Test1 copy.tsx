import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormField } from '@/components/ui/form';

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
})
type FormData = z.infer<typeof formSchema>;

const FileUploadForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log('文件上传成功:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="file">上传文件:</Label>
        <FormField control={control} name="file" render={({ field }) => (
          <input type="file" {...field}  value={field.value}/>
        )} />
        {errors.file && <span>{errors.file.message}</span>}
      </div>
      <Button type="submit">提交</Button>
    </form>
  );
};

export default FileUploadForm;
