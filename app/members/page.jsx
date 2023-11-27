import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import TalkForm from "../components/TalkForm";
import TalkFeed from "../components/TalkFeed";

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
        <TalkForm />
        <TalkFeed />
      </div>
    </div>
  );
}

export default Members;

export const dynamic = "force-dynamic";