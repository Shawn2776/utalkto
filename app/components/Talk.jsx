"use client";

import Link from "next/link";
import User from "./User";
import Image from "next/image";
import { BiDotsHorizontal } from "react-icons/bi";
import EmbedPlayer from "./EmbedPlayer";
import TalkInteractRow from "./TalkInteractRow";

function Talk({
  talk: { id, text, image, video },
  owner,
  likes,
  dislikes,
  retalks,
  backtalks,
  likeCount,
  dislikeCount,
  retalkCount,
  backtalkCount,
}) {
  const inImage = image ? image : null;
  const inVideo = video ? video : null;
  const tempSource =
    "https://utalkto.s3.us-west-2.amazonaws.com/defaultProfilePic.png";
  return (
    <div className="md:p-4 border border-b-transparent border-l-transparent border-r-transparent md:border-none md:my-6 text-white border-gray-600 md:rounded-lg bg-[rgb(24,25,26)] ">
      <div
        id="talkTopRow"
        className="flex justify-between w-full pt-4 pr-4 md:p-0"
      >
        <div className="flex gap-4">
          <div className="pl-2 md:p-0">
            {owner.profilePic ? (
              <Image
                src={owner.profilePic}
                height={40}
                width={40}
                alt=""
                className="rounded-full"
              />
            ) : (
              <Image
                src={tempSource}
                height={40}
                width={40}
                alt=""
                className="rounded-full"
              />
            )}
          </div>
          <div className="leading-4">
            <p className="text-md">{owner.name}</p>
            <p className="text-sm text-gray-600">@{owner.username}</p>
          </div>
        </div>
        <div>
          <BiDotsHorizontal className="text-2xl text-gray-400" />
        </div>
      </div>

      <div id="talkContent" className="pt-4 pr-4">
        <div
          id="talkText"
          className="pb-4 pl-16 md:p-0 whitespace-break-spaces"
        >
          <p className="pb-4">{text}</p>
        </div>
        <div
          id="talkImage"
          className={`${inImage ? "max-w-2xl h-64 relative ml-14" : "hidden"}`}
        >
          {inImage ? (
            <Image
              objectFit="cover"
              src={image}
              fill={true}
              alt=""
              className="rounded-2xl"
            />
          ) : (
            <></>
          )}
        </div>
        <div id="talkVideo" className={`${inVideo ? "default" : "pt-4"}`}>
          {inVideo ? <EmbedPlayer src={inVideo} /> : <></>}
        </div>
        <div id="talkInteractBar" className="px-6 pb-4 mt-4 md:pb-0 md:px-2">
          <TalkInteractRow
            likes={likes}
            dislikes={dislikes}
            retalks={retalks}
            backtalks={backtalks}
            likeCount={likeCount}
            dislikeCount={dislikeCount}
            retalkCount={retalkCount}
            backtalkCount={backtalkCount}
          />
        </div>
      </div>
    </div>
    // <div id="temp_div" className="max-w-2xl mx-auto">
    //   <article className="md:p-4 border border-b-transparent border-l-transparent border-r-transparent md:border-none md:my-6 text-white border-gray-600 md:rounded-lg bg-[rgb(24,25,26)] ">
    //     <div
    //       id="talkTopRow"
    //       className="flex justify-between w-full pt-4 pr-4 md:p-0"
    //     >
    //       <div className="flex gap-4">
    //         <div className="pl-2 md:p-0">
    //           {/* <Image
    //             src={
    //               "https://utalkto.s3.us-west-2.amazonaws.com/defaultProfilePic.png"
    //             }
    //             height={40}
    //             width={40}
    //             className="rounded-full"
    //             alt={owner.username}
    //           /> */}
    //         </div>
    //         <div className="leading-4">
    //           <p className="text-md">{owner.name}</p>
    //           <p className="text-sm text-gray-600">@{owner.username}</p>
    //         </div>
    //       </div>
    //       <div>
    //         <BiDotsHorizontal className="text-2xl text-gray-400" />
    //       </div>
    //     </div>
    //     <div id="talkContent" className="pt-4 md:pl-14">
    //       <div id="talkText" className="pl-16 pr-4 md:p-0">
    //         {text}
    //       </div>
    //       <div
    //         id="talkImage"
    //         className={`${image === null ? "hidden" : "pt-4"}`}
    //       >
    //         <Image
    //           src={image}
    //           height={1600}
    //           width={1460}
    //           alt=""
    //           className="md:rounded-2xl"
    //         />
    //       </div>
    //       <div
    //         id="talkVideo"
    //         className={`${video === null ? "hidden" : "pt-4"}`}
    //       >
    //         <EmbedPlayer src={video} />
    //       </div>
    //       <div id="talkInteractBar" className="px-6 pb-4 mt-4 md:pb-0 md:px-2">
    //         <TalkInteractRow />
    //       </div>
    //     </div>
    //   </article>
    // </div>
  );
}

export default Talk;
