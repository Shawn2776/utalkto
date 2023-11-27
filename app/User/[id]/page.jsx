import User from "@/app/models/User";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function getUser(_id) {
  const id = new ObjectId(_id);
  try {
    const user = await User.findById(id);

    if (!user) {
      return NextResponse({ message: "Error" });
    }

    return user.json();
  } catch (error) {
    console.log(error);
  }
}

export default async function UserPage({ params: { user_id } }) {
  return <>{user_id}</>;
}
