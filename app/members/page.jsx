import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import TalkForm3 from "../components/TalkForm3";
import Talks from "../components/Talks";

function Members() {
  const session = getServerSession(options);

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <div></div>
      <div className="max-w-2xl mx-auto">
        {/* <TalkForm /> */}
        <TalkForm3 />
        <Talks />
      </div>
    </div>
  );
}

export default Members;
