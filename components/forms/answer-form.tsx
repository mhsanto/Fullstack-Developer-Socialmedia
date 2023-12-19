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
import { useRef, useState } from "react";
import { useTheme } from "@/context/theme-provider";
import { Button } from "../ui/button";
import { createAnswer } from "@/lib/actions/answer.action";
import { usePathname } from "next/navigation";
type AnswerFormProps = {
  authorId: string;
  question: string;
  questionId: string;
};
const AnswerForm: React.FC<AnswerFormProps> = ({
  authorId,
  question,
  questionId,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const path = usePathname();
  const editorRef = useRef(null);
  const { mode } = useTheme();
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });
  const handleCreateAnswer = async (values: z.infer<typeof AnswerSchema>) => {
    try {
      setSubmitting(true);
      await createAnswer({
        content: values.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path,
      });
      form.reset();
      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent("")
      }
    } catch (error) {
      console.log(`answer-form.tsx: ${error}`)
      
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <div className="paragraph dark:text-light-900"></div>
        <Button className="btn light-border-2 gap-1.5 rounded-md px-4 py-2 shadow-none dark:text-light-900  font-semibold">
          Generate Using AI
        </Button>
      </div>

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
                <FormLabel className="dark:text-light-900 text-lg" htmlFor="answer">Your Answer</FormLabel>
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

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-primary-500/80 dark:text-light-900"

            >
              {submitting ? "Posting Your Answer..." : "Post Your Answer"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AnswerForm;
