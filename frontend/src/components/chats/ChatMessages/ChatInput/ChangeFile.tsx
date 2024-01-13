import { chatsApi } from "@/lib/chatsApi";
import { Paperclip } from "lucide-react";
import React, { useRef, type Dispatch, type SetStateAction } from "react";

interface ChangeFileProps {
  chatId: string;
  imagesUrl: string[];
  setImagesUrl: Dispatch<SetStateAction<string[]>>;
  inputFileRef: any;
}

export const ChangeFile = ({
  chatId,
  imagesUrl,
  setImagesUrl,
  inputFileRef,
}: ChangeFileProps) => {
  const handleChangeFile = async (
    e: React.FormEvent<HTMLInputElement>
  ): Promise<void> => {
    try {
      const formData = new FormData();
      if (e.currentTarget.files) {
        console.log(e.currentTarget.files);

        // for (let i = 0; i < e.currentTarget.files.length; i++) {
        //   formData.append(`files[]`, e.currentTarget.files[i]);
        // }

        formData.append(`file`, e.currentTarget.files[0]);
      }

      const { data } = await chatsApi.uploadImage(chatId, formData, {
        type: "message",
      });

      setImagesUrl((prev) => [...prev, data.filePath]);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickRemoveAllImage = (): void => {
    setImagesUrl([]);
  };

  const onClickRemoveImage = (id: string): void => {
    setImagesUrl(imagesUrl.filter((i) => i !== id));
  };

  return (
    <>
      <Paperclip
        onClick={() => inputFileRef.current?.click()}
        width={22}
        height={22}
        color="#7b7b7b"
        className="absolute top-3 left-2"
      />

      <input
        ref={inputFileRef}
        onChange={handleChangeFile}
        type="file"
        accept=".jpg,.jpeg,.png,.gif"
        hidden
        // multiple
      />
    </>
  );
};
