import Talk from "./Talk";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

const getTalks = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/Talks", {
      method: "GET",
      cache: "no-store",
    });

    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.log(error);
  }
};

export default async function TalkFeed() {
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
