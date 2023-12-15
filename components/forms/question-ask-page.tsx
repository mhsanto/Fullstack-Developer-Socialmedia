"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/types/validations";

// tinymce editor component
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
// end

import { Badge } from "../ui/badge";
import { X } from "lucide-react";
import { createQuestion } from "@/lib/actions/question.action";
import { usePathname, useRouter } from "next/navigation";
const type: any = "create";
export default function QuestionAskSection({
  mongoUserId,
}: {
  mongoUserId?: string | undefined;
}) {
  const router = useRouter();
  const pathName = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editorRef = useRef(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      await createQuestion({
        title: values.title,
        content: values.explanation,
        tags: values.tags,
        author: JSON.parse(mongoUserId!),
        path:pathName
      });
      router.push("/");
    } catch (error:any) {
      console.log("AskQuestionPage -> error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  }
  // add tags to ui
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, field: any) {
    // Extracting key and target from the event for easier access
    const { key, target } = e;
    // Casting target to HTMLInputElement for type safety
    const tagInput = target as HTMLInputElement;
    // Extracting and trimming the tag value
    const tagValue = tagInput.value.trim();

    // Checking if the Enter key is pressed and the field name is "tags"
    if (key === "Enter" && field.name === "tags") {
      // Preventing the default Enter key behavior
      e.preventDefault();

      // Ensuring the tag value is not empty
      if (tagValue === "") {
        return;
      }

      // Checking if the tag value exceeds the maximum length
      if (tagValue.length > 15) {
        // Setting an error if the tag length is too long
        return form.setError("tags", {
          type: "required",
          message: "Tags must be less than 15 characters",
        });
      }

      // Checking if the tag value is not already in the list
      if (!field.value.includes(tagValue as never)) {
        // Adding the tag value to the list and clearing input
        form.setValue("tags", [...field.value, tagValue]);
        tagInput.value = "";
        form.clearErrors("tags");
      } else {
        // Triggering form validation if the tag is already present
        form.trigger();
      }
    }
  }

  // remove tags from the list
  const handleRemove = (tag: any, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-400">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border "
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be specific and imagine you &apos;re asking a question to
                another person
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detailed explanation of your problem
                <span className="text-primary-400">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                {/* todo add an editor component */}
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
                  onInit={(evt, editor) =>
                    // @ts-ignore
                    (editorRef.current = editor)
                  }
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue=""
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                    ],
                    toolbar:
                      "undo redo | formatselect | " +
                      "codesample | bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Inter,sans-serif; font-size:16px }",
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Introduce the problem and expand on what you put in the
                title,Minimum 20 characters
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-primary-400">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <>
                  <Input
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border "
                    placeholder="add tags..."
                    onKeyDown={(e) => handleKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex gap-2 mt-2.5 flex-wrap">
                      {field.value.map((tag) => (
                        <Badge
                          key={tag}
                          className="text-dark300_light700 bg-primary-500/80 flex items-center text-white gap-1 py-1 text-sm capitalize justify-center"
                        >
                          {tag}
                          <X
                            size={16}
                            onClick={() => handleRemove(tag, field)}
                            cursor="pointer"
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be specific and imagine you &apos;re asking a question to
                another person
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button className="bg-primary-500 w-fit !text-light-900 " type="submit">
          {isSubmitting ? (
            <>{type === "edit" ? "Editing..." : "Posting"}</>
          ) : (
            <>{type === "edit" ? "Edit a Question" : "Ask a Question"}</>
          )}
        </Button>
      </form>
    </Form>
  );
}
