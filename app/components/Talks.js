import Talk from "./Talk";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

const getTalks = async () => {
  try {
    const res = await fetch("/api/Talks", {
      method: "GET",
      cache: "no-store",
    });

    if (res.ok) {
      return res.json();
    }
  } catch (error) {
    console.log(error);
  }
};

export default async function Talks() {
  const { data: session, status } = getServerSession(options);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const { talks } = await getTalks();

  return (
    <>
      {talks.map((talk) => (
        <div key={talk.id} className="">
          <Talk
            talk={talk}
            owner={talk.owner}
            likes={talk.likes}
            dislikes={talk.dislikes}
            retalks={talk.retalkedBy}
            backtalks={talk.backTalks}
            likeCount={talk._count.likes}
            dislikeCount={talk._count.dislikes}
            retalkCount={talk._count.retalkedBy}
            backtalkCount={talk._count.backTalks}
          />
        </div>
      ))}
    </>
  );
}

export const dynamic = "force-dynamic";