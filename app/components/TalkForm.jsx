"use client";

import { useEffect, useRef, useState } from "react";
import { GrImage } from "react-icons/gr";
import { TbPhotoVideo } from "react-icons/tb";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

function TalkForm() {
  const textAreaRef = useRef(null);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [text]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const user_id = session?.user?.id;

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/s3-upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   setUploading(true);

  //   if (!text && !file) {
  //     alert(
  //       "Content is required to post. Try uploading an image or typing what you wanna tell [the world | your community | your friends]"
  //     );
  //   }

  //   try {
  //     console.log("FILE2>>>>", file);
  //     const res = await fetch("/api/Talks", {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         file: file ? file : "",
  //         text: text ? text : "",
  //         id: user_id,
  //       }),
  //     });

  //     if (res.ok) {
  //       setUploading(false);
  //       setText("");
  //       setFile(null);
  //       router.push("/members", undefined, { unstable_skipClientCache: true });
  //     } else {
  //       throw new Error("Failed to create talk.");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setUploading(false);
  //   }
  // };

  function triggerImageInput(e) {
    document.getElementById("imageToUpload").click();
  }

  function triggerVideoInput(e) {
    document.getElementById("videoToUpload").click();
  }

  return (
    <div className="md:p-4 border border-b-transparent border-l-transparent border-r-transparent md:border-none md:my-6 text-white border-gray-600 md:rounded-lg bg-[rgb(24,25,26)] w-full">
      <form>
        <label htmlFor="talk" className="sr-only">
          What do you want to say?
        </label>
        <textarea
          contenteditable
          spellCheck="true"
          id="talk"
          className="w-full p-1 rounded bg-neutral-700 active:outline-none focus:outline-none"
          placeholder="What do you want to say?"
          value={text}
          onChange={handleTextChange}
          rows="1"
          ref={textAreaRef}
          type="text"
        ></textarea>
        <div className="flex items-center justify-between pt-4 pl-4 pr-4">
          <div className="flex gap-4">
            <label htmlFor="imageToUpload">
              <input
                onChange={handleImageChange}
                type="file"
                name="imageToUpload"
                id="imageToUpload"
                className="hidden"
                accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
              />
              <button type="button" onClick={triggerImageInput}>
                <GrImage className="text-xl text-orange-400" />
              </button>
            </label>
            <label htmlFor="videoToUpload">
              <input
                onChange={handleVideoChange}
                type="file"
                name="videoToUpload"
                id="videoToUpload"
                className="hidden"
                accept="video/mp4, video/avi, video/mov"
              />
              <button type="button" onClick={triggerVideoInput}>
                <TbPhotoVideo className="text-xl text-orange-400" />
              </button>
            </label>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className={
              "p-1 px-6 font-extrabold text-black bg-orange-500 rounded-2xl"
            }
          >
            {uploading ? "talking..." : "Talk"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TalkForm;
