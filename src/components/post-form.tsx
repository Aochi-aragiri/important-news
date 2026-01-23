import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { Link } from 'react-router';
import type { PostFormData } from './post-form.config';

interface PostFormProps {
  backHref: string;
  pending: boolean;
}

export default function PostForm({ backHref, pending }: PostFormProps) {
  const form = useFormContext<PostFormData>();

  const imageUrl = form.watch('imageUrl');

  return (
    <div className="max-w-5xl mx-auto px-2 py-4">
      <div className="flex justify-between mb-2">
        <div className="w-full mr-4">
          <Button
            asChild
            variant={'outline'}
            className="mb-4 rounded-2 bg-[#D9D9D9]"
          >
            <Link to={backHref}>
              <ChevronLeft /> Back
            </Link>
          </Button>
          <FieldGroup className="gap-2">
            <Field className="gap-0">
              <FieldLabel className="text-2xl font-bold">
                Edit Title:
              </FieldLabel>
              <Input
                disabled={pending}
                placeholder="Your Important New"
                className="bg-[#D9D9D9] rounded-2"
                {...form.register('title')}
              />
            </Field>
            <Field className="gap-0">
              <FieldLabel className="text-2xl font-bold">Edit Text:</FieldLabel>
              <Textarea
                disabled={pending}
                placeholder="Description of your Important new"
                className="h-100 bg-[#D9D9D9] rounded-2"
                {...form.register('body')}
              />
            </Field>
          </FieldGroup>
        </div>
        <Field className="w-full">
          <FieldLabel>Image</FieldLabel>
          <Input
            disabled={pending}
            type="url"
            placeholder="https://images.com/image.jpg"
            {...form.register('imageUrl')}
          />
          {imageUrl ? (
            <img
              className="mb-2 w-auto h-110 object-cover rounded-lg"
              src={imageUrl}
              alt="new`s image"
            />
          ) : (
            <div className="mb-2 h-110 bg-[#D9D9D9] rounded-lg" />
          )}
          <FieldGroup>
            <Field className="gap-0">
              <FieldLabel className="text-2xl font-bold">Edit Tags:</FieldLabel>
              <Input
                disabled={pending}
                placeholder="Tags of your Important New"
                className="bg-[#D9D9D9] rounded-2"
                {...form.register('tags')}
              />
            </Field>
          </FieldGroup>
        </Field>
      </div>
      <div className="flex justify-between ">
        <Button
          type="submit"
          className="text-lg font-bold py-6 px-10 bg-[#AA9A4E] text-white rounded-xl"
        >
          Confirm
        </Button>
        <Button
          type="button"
          className="text-lg font-bold py-6 px-10 bg-[#AA9A4E] text-white rounded-xl"
        >
          Preview
        </Button>
      </div>
    </div>
  );
}
