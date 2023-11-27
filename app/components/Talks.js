import { useSession } from "next-auth/react";
import Talk from "./Talk";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

const getTalks = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Talks", {
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
// import { useState, useEffect } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
// import Talk from "../components/Talk";
// import { signIn, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function Talks() {
//   const { data: session, status } = useSession();
//   const [talks, setTalks] = useState([]);
//   const [hasMore, setHasMore] = useState(true);
//   const [page, setPage] = useState(0);

//   const router = useRouter();

//   const fetchTalks = async () => {
//     const response = await fetch(`/api/Talks?skip=${page * 10}&take=10`);
//     if (response.ok) {
//       const newTalks = await response.json();
//       setTalks((talks) => [...talks, ...newTalks]);
//       setHasMore(newTalks.length === 10);
//       setPage((page) => page + 1);
//     }
//   };

//   return (
//     <>
//       {status === "loading" ? (
//         <div>You need to be signed in to view this page.</div>
//       ) : (
//         <InfiniteScroll
//           dataLength={talks.length}
//           next={fetchTalks}
//           hasMore={hasMore}
//           loader={<h4>Loading...</h4>}
//           endMessage={
//             <p style={{ textAlign: "center" }}>
//               <b>You have seen all talks</b>
//             </p>
//           }
//         >
//           {talks.map((talk) => (
//             <Talk key={talk.id} talk={talk} owner={talk.owner} />
//           ))}
//         </InfiniteScroll>
//       )}
//     </>
//   );
// }

// import { getServerSession } from "next-auth";
// import Talk from "./Talk3";
// import { options } from "../api/auth/[...nextauth]/options";

// const getTalks = async () => {
//   const { data: session, status } = getServerSession(options);

//   if (!session) {
//     return <div>Loading...</div>;
//   }

//   try {
//     const res = await fetch("http://localhost:3000/api/Talks", {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch talks.");
//     }

//     return res.json();
//   } catch (error) {
//     console.log("Error loading talks.", error);
//   }
// };

// export default async function Talks() {
//   const { talks } = await getTalks();
//   return (
//     <>
//       {talks.map((talk) => (
//         <div key={talk.id} className="">
//           <Talk talk={talk} />
//         </div>
//       ))}
//     </>
//   );
// }
