import {Editor} from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import config from "../../configuration/config";
import { useId } from "react";
function RTE({name,control,label,defaultValue}){
  const id = useId();
    return(
    <div className="w-full">
    {label && (<label htmlFor={id} className="inline-block mb-1 pl-1">{label}</label>)}
    <Controller 
    name = {name||"content"}
    control = {control}
    render={({field})=>{
        return(
            <>
            <Editor 
             id={id}
            apiKey = {config.tinymceEditor}
            initialValue={defaultValue}   
            init={{
                height:500,
                menubar: false,
                 directionality: "ltr", 
                 content_style: "body { direction: ltr; text-align: left; }",
                plugins: [
                
                "advlist",
                "autolink",
                "lists",
                "link",
                
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                
              ],
              toolbar: "undo redo | blocks | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",

            }
            }
            onEditorChange={field.onChange}
            />
            </>
        )
    }}
    />
  </div>
    )
}

export default RTE;