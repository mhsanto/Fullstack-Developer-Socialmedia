"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { AnswerSchema } from "@/types/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { useTheme } from "@/context/theme-provider";

const AnswerForm = () => {
  const editorRef = useRef(null);
  const { mode } = useTheme();
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });
  const handleCreateAnswer = () => {};
  return (
    <Form {...form}>
      <form
        className="mt-6 flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(handleCreateAnswer)}
      >
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
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
                    skin: mode === "dark" ? "oxide-dark" : "oxide",
                    content_css: mode === "dark" ? "dark" : "default",
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
      </form>
    </Form>
  );
};

export default AnswerForm;
