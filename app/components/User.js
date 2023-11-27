import { Suspense } from "react";

const getUser = async (_id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/${_id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user.");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading user.", error);
  }
};

async function User(_id) {
  const user = await getUser(_id);
  return (
    <div>
      <div>{`Username: ${user?.name}`}</div>
    </div>
  );
}

export default User;
